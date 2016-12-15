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
    }
};

module.exports = {
    create(context) {
        const order = context.options[0] || 'asc';
        const options = context.options[1] || {};
        const isValidOrder = isValidOrders[`${order}${options.caseSensitive ? 'I' : ''}`];
        const stackNames = [];
        let stack = null;

        function setStack() {
            stack = { prevName: null, upper: stack };
        }

        function exitStack() {
            stack = stack.upper;
            stackNames.length = 0;
        }

        function isValidSortProperty(prevName, thisName) {
            return prevName && thisName;
        }

        function hasAssignmentToStackName(node) {
            if (!(node.value && node.value.right && node.value.right.type === 'Identifier')) {
                return false;
            }

            return stackNames.includes(node.value.right.name);
        }

        return {
            ObjectExpression: setStack,
            'ObjectExpression:exit': exitStack,
            ObjectPattern: setStack,
            'ObjectPattern:exit': exitStack,
            Property(node) {
                const prevName = stack.prevName;
                const thisName = node.key.name;

                stack.prevName = thisName || prevName;
                stackNames.push(prevName);

                if (!isValidSortProperty(prevName, thisName)) {
                    return;
                }

                if (hasAssignmentToStackName(node)) {
                    return;
                }

                if (!isValidOrder(prevName, thisName)) {
                    context.report({
                        data: {
                            order,
                            prevName,
                            thisName
                        },
                        loc: node.key.loc,
                        message: `Expected object keys to be in {{order}}ending order.`,
                        node
                    });
                }
            }
        };
    },
    meta: {
        docs: {
            category: 'Stylistic Issues',
            description: 'require object keys to be sorted',
            recommended: false
        },
        schema: [
            {
                'enum': ['asc', 'desc']
            },
            {
                additionalProperties: false,
                properties: {
                    caseSensitive: {
                        type: 'boolean'
                    }
                },
                type: 'object'
            }
        ]
    }
};