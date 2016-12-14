module.exports = {
    create(context) {
        return {
            WhileStatement(node) {
                context.report(node, 'Unexpected use of while statement.');
            }
        };
    },
    meta: {
        docs: {
            category: 'Stylistic Issues',
            description: 'Disallow while loops',
            recommended: false
        },
        schema: []
    }
};