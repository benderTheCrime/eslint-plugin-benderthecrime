/* eslint-disable */

module.exports = {
    create(context) {
        const source = context.getSourceCode();
        let topLevelNode = null;

        function isValidImportOrder(previous, current) {
            for (const previousDeclaration of previous) {
                for (const currentDeclaration of current) {
                    const currentEnd = source.getNodeByRangeIndex(currentDeclaration.end).range[1];
                    const previousEnd = source.getNodeByRangeIndex(previousDeclaration.end).range[1];
                    const currentIndex = getNextTokenOccurence(currentDeclaration, currentEnd);
                    const previousIndex = getNextTokenOccurence(previousDeclaration, previousEnd);

                    if (currentIndex > previousIndex) {
                        return true;
                    }
                }
            }

            return false;
        }

        function getNextTokenOccurence(node) {
            const { name } = node;
            const parent = findClosestBlockStatement(node) || topLevelNode;
            const code = source.getText(parent);
            let index = code.indexOf(name);

            while (index > 0) {
                index = code.indexOf(name, index + 1);

                const nextNode = source.getNodeByRangeIndex(parent.range[0] + index);

                // If (nextNode.type === 'Property') {
                //     Console.log(nextNode);
                // }

                if (nextNode && nextNode.name === name && validateNodeType(nextNode)) {

                    // Console.log(nextNode);

                    return index;
                }
            }

            return index;
        }

        return {
            Program(node) {
                topLevelNode = node;
            },
            VariableDeclaration(node) {
                const previousToken = context.getTokenBefore(node);

                if (nodeIsExport(node.parent)) {
                    return;
                }

                if (previousToken) {
                    const previous = context.getNodeByRangeIndex(previousToken.range[0]);

                    if (nodeIsExport(previous.parent)) {
                        return;
                    }

                    if (
                        previous &&
                        previous.type === 'VariableDeclaration' &&
                        !isValidImportOrder(getVariableDeclarationNames(previous), getVariableDeclarationNames(node))
                    ) {
                        context.report(node, 'Variable declaration is used before previous declaration in module.');
                    }
                }
            },
        };
    },
    meta: {
        docs: {
            category: 'Stylistic Issues',
            description: 'Enforce variables are declared in the order in which they are used in the given scope',
            recommended: false,
        },
        schema: [
            {
                additionalProperties: false,
                properties: {
                    ignoreImportGroups: {
                        type: 'boolean',
                    },
                },
                type: 'object',
            },
        ],
    },
};

function nodeIsExport(node) {
    return ['ExportDeclaration', 'ExportNamedDeclaration'].includes(node.type);
}

function getVariableDeclarationNames(node) {
    const { declarations } = node;
    const len = declarations.length;
    const handleObjectPatternAssignmentIdentifiers = createHandleObjectPatternAssignmentIdentifiers(node);
    const declarationNames = [];
    let i = 0;

    for (; i < len; ++i) {
        const { id } = declarations[i];

        if (id.type === 'ObjectPattern') {
            declarationNames.push(...id.properties.map(handleObjectPatternAssignmentIdentifiers));
        } else {
            declarationNames.push(id);
        }
    }

    return declarationNames;
}

function createHandleObjectPatternAssignmentIdentifiers(node) {
    return function handleObjectPatternAssignmentIdentifiers(property) {
        const { value } = property;

        value.parent = node;

        return value;
    };
}

function findClosestBlockStatement(node) {
    if (node && node.type) {
        if (node.type === 'BlockStatement' || node.type === 'Program') {
            return node;
        }

        return findClosestBlockStatement(node.parent);
    }

    return null;
}

function validateNodeType(node) {
    if (node.type === 'Property' && node.shorthand !== true) {
        return false;
    }

    if (node.type === 'MemberExpression') {
        return false;
    }

    return true;
}