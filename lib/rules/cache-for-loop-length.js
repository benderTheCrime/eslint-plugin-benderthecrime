module.exports = {
    meta: {
        docs: {
            description: 'Always cache for loop length',
            category: 'Stylistic Issues',
            recommended: false
        },
        schema: []
    },
    create(context) {
        function validateNodeLeft(node) {
            if (node.left) {
                return validateNodeLeft(node);
            }

            return validateMemberExpressionPropertyName(node);
        }

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
            ForStatement(node) {
                if (validateNodeLeft(node) || validateNodeRight(node)) {
                    report(node);
                }
            }
        };
    }
};