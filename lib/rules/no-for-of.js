module.exports = {
    create(context) {
        return {
            ForOfStatement(node) {
                context.report(node, 'Unexpected use of "for...of".');
            }
        };
    },
    meta: {
        docs: {
            category: 'Stylistic Issues',
            description: 'Disallow "for...of"',
            recommended: false
        },
        schema: []
    }
};