module.exports = {
    meta: {
        docs: {
            description: 'Disallow "break" statements',
            category: 'Stylistic Issues',
            recommended: false
        },
        schema: []
    },
    create(context) {
        return {
            BreakStatement(node) {
                context.report(node, 'Unexpected use of break statement.');
            }
        };
    }
};