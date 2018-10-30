module.exports = {
    create(context) {
        return {
            Identifier(node) {
                if (
                    node.name === 'require' &&
                    node.parent.type === 'CallExpression'
                ) {
                    context.report(node, 'Do not use "require".');
                }
            },
        };
    },
    meta: {
        docs: {
            category: 'Stylistic Issues',
            description: 'Disallow "require"',
            recommended: false,
        },
        schema: [],
    },
};
