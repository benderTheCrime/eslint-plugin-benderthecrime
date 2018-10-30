module.exports = {
    create(context) {
        return {
            BreakStatement(node) {
                context.report(node, 'Unexpected use of break statement.');
            },
        };
    },
    meta: {
        deprecated: true,
        docs: {
            category: 'Stylistic Issues',
            description: 'Disallow "break" statements',
            recommended: false,
        },
        schema: [],
    },
};
