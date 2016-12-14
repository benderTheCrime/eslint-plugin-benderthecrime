module.exports = {
    meta: {
        docs: {
            description: 'Disallow "for...of"',
            category: 'Stylistic Issues',
            recommended: false
        },
        schema: []
    },
    create(context) {
        return {
            ForOfStatement(node) {
                context.report(node, 'Unexpected use of "for...of".');
            }
        };
    }
};