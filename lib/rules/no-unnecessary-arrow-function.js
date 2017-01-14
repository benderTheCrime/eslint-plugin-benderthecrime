module.exports = {
    create(context) {
        return {
            ArrowFunctionExpression(node) {
                const tokensByType = context.getTokens(node).map(({ type }) => type);

                if (!tokensByType.includes('ThisExpression')) {
                    context.report(node, 'Unexpected use of arrow functions.');
                }
            }
        };
    },
    meta: {
        docs: {
            category: 'Stylistic Issues',
            description: 'Disallow arrow functions',
            recommended: false
        },
        schema: []
    }
};