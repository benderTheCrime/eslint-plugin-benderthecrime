module.exports = {
    meta: {
        docs: {
            description: 'Disallow "require"',
            category: 'Stylistic Issues',
            recommended: false
        },
        schema: []
    },
    create(context) {
        return {
            Identifier(node) {
                if (
                    node.name === 'require' &&
                    node.parent.type === 'CallExpression'
                ) {
                    context.report(node, 'Do not use "require".');
                }
            }
        };
    }
};