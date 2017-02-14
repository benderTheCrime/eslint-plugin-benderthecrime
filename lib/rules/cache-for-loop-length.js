module.exports = {
    create(context) {
        function validateNodeRight(node) {
            if (node.right) {
                return validateNodeRight(node);
            }

            return validateMemberExpressionPropertyName(node);
        }

        function validateMemberExpressionPropertyName(node) {
            return node.type === 'MemberExpression' &&
                node.property &&
                node.property.name === 'length';
        }

        function report(node) {
            context.report(node, 'Always cache for loop length.');
        }

        return {
            BinaryExpression(node) {
                if (node.parent.type === 'ForStatement') {
                    if (
                        validateNodeRight(node.left) ||
                        validateNodeRight(node.right)
                    ) {
                        report(node);
                    }
                }
            },
        };
    },
    meta: {
        docs: {
            category: 'Stylistic Issues',
            description: 'Always cache for loop length',
            recommended: false,
        },
        schema: [],
    },
};