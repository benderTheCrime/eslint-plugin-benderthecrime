/* eslint-disable no-restricted-syntax */

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

        function getNextTokenOccurence({ name }, end) {
            let index = end;

            while (index > 0) {
                index = code.indexOf(name, index + 1);

                const nextNode = source.getNodeByRangeIndex(index);

                if (nextNode && nextNode.name === name) {
                    return index;
                }
            }

            return index;
        }

        return {
            ImportDeclaration(node) {
                const previousToken = getPreviousToken();
                const previous = getPrevious();

                if (
                    previousToken &&
                    !isFlowType(source.getText(node)) &&
                    isImportDeclaration(previous) &&
                    !isFlowType(source.getText(previous))
                ) {
                    validateImportOrder(previous, node);
                }

                function getPreviousToken() {
                    return context.getTokenBefore(node);
                }

                function getPrevious() {
                    return context.getNodeByRangeIndex(getPreviousToken().range[0]);
                }

                function isImportDeclaration() {
                    return previous && previous.type === 'ImportDeclaration';
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