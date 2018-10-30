module.exports = {
    create(context) {
        return {
            ForInStatement(node) {
                context.report(node, 'Unexpected use of "for...in".');
            },
        };
    },
    meta: {
        deprecated: true,
        docs: {
            category: 'Stylistic Issues',
            description: 'Disallow for...in',
            recommended: false,
        },
        schema: [],
    },
};
