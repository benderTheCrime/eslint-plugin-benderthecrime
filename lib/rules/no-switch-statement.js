module.exports = {
    create(context) {
        return {
            SwitchStatement(node) {
                context.report(node, 'Unexpected use of switch statement.');
            },
        };
    },
    meta: {
        docs: {
            category: 'Stylistic Issues',
            description: 'Disallow switch statements',
            recommended: false,
        },
        schema: [],
    },
};