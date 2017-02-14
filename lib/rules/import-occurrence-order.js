module.exports = {
    create(context) {
        const source = context.getSourceCode();
        const code = source.getText();
        const ignoreImportGroups = context.options[0] !== false;

        function validateImportOrder(previous, current) {
            const specifiers = getNodeSpecifierNames(current);

            if (ignoreImportGroups && countEmptyLinesBetweenImports(previous, current) > 0) {
                return;
            }

            if (!isValidImportOrder(getNodeSpecifierNames(previous), specifiers)) {
                context.report(current, 'Import declaration is used before previous import in module.');
            }
        }

        function countEmptyLinesBetweenImports(prev, current) {
            return source.lines.slice(prev.loc.end.line, current.loc.start.line - 1).length;
        }

        function isValidImportOrder(previous, current) {
            for (const previousSpecifier of previous) {
                for (const currentSpecifier of current) {
                    const end = source.getNodeByRangeIndex(currentSpecifier.end).range[1];
                    const currentIndex = getNextTokenOccurence(currentSpecifier, end);
                    const previousIndex = getNextTokenOccurence(previousSpecifier, end);

                    if (currentIndex > previousIndex) {
                        return true;
                    }
                }
            }

            return false;
        }

        function getNextTokenOccurence(node, end) {
            let index = end;

            while (index > 0) {
                index = code.indexOf(node.name, index + 1);

                if (source.getNodeByRangeIndex(index).name === node.name) {
                    break;
                }
            }

            return index;
        }

        return {
            ImportDeclaration(node) {
                const previousToken = context.getTokenBefore(node);

                if (isFlowType(source.getText(node))) {
                    return;
                }

                if (previousToken) {
                    const previous = context.getNodeByRangeIndex(previousToken.range[0]);

                    if (isFlowType(source.getText(previous))) {
                        return;
                    }

                    if (previous && previous.type === 'ImportDeclaration') {
                        validateImportOrder(previous, node);
                    }
                }
            },
        };
    },
    meta: {
        docs: {
            category: 'Stylistic Issues',
            description: 'Enforce imports are declared in the order in which they are used',
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

function getNodeSpecifierNames(node) {
    return node.specifiers.map(({ local, imported = local }) => imported);
}

function isFlowType(code) {
    return code.includes('type {');
}