/**
 * @fileoverview Rule to require object keys to be sorted
 * @author Toru Nagashima
 */

const isValidOrders = {
    asc(firstProp, secondProp) {
        return firstProp <= secondProp;
    },
    ascI(firstProp, secondProp) {
        return isValidOrders.asc(firstProp.toLowerCase(), secondProp.toLowerCase());
    },
    desc(firstProp, secondProp) {
        return isValidOrders.asc(secondProp, firstProp);
    },
    descI(firstProp, secondProp) {
        return isValidOrders.ascI(secondProp, firstProp);
    },
};

module.exports = {
    create(context) {
        const order = context.options[0] || 'asc';
        const options = context.options[1] || {};
        const isValidOrder = isValidOrders[
            `${order}${options.caseSensitive ? 'I' : ''}`
        ];
        const stackNames = [];
        let stack = null;

        function setStack() {
            stack = {
                prevName: null,
                upper: stack,
            };
        }

        function exitStack() {
            stack = stack.upper;
            stackNames.length = 0;
        }

        function hasAssignmentToStackName(node) {
            if (!(node.value && node.value.right && node.value.right.type === 'Identifier')) {
                return false;
            }

            return stackNames.includes(node.value.right.name);
        }

        function validateKeyOrder(node, name) {
            const { prevName } = stack;

            stack.prevName = name || prevName;
            stackNames.push(prevName);

            if (
                !isValidSortProperty(prevName, name) ||
                hasAssignmentToStackName(node)
            ) {
                return;
            }

            if (!isValidOrder(prevName, name)) {
                context.report(node, `Expected object keys to be in ${order}ending order.`);
            }
        }

        return {
            ExportNamedDeclaration: setStack,
            'ExportNamedDeclaration:exit': exitStack,
            ExportSpecifier(node) {
                return validateKeyOrder(node, node.exported.name);
            },
            ImportDeclaration: setStack,
            'ImportDeclaration:exit': exitStack,
            ImportSpecifier(node) {
                return validateKeyOrder(node, node.imported.name);
            },
            ObjectExpression: setStack,
            'ObjectExpression:exit': exitStack,
            ObjectPattern: setStack,
            'ObjectPattern:exit': exitStack,
            Property(node) {
                return validateKeyOrder(node, node.key.name);
            },
        };
    },
    meta: {
        docs: {
            category: 'Stylistic Issues',
            description: 'require object keys to be sorted',
            recommended: false,
        },
        schema: [
            {
                enum: [
                    'asc',
                    'desc',
                ],
            },
            {
                additionalProperties: false,
                properties: {
                    caseSensitive: {
                        type: 'boolean',
                    },
                },
                type: 'object',
            },
        ],
    },
};

function isValidSortProperty(prevName, thisName) {
    return prevName && thisName;
}
