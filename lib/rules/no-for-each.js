module.exports = {
    create(context) {
        return {
            Identifier(node) {
                if (
                    node.name === 'forEach' &&
                    node.parent.type === 'CallExpression'
                ) {
                    context.report(node, 'Unexpected use of "forEach".');
                }
            }
        };
    },
    meta: {
        docs: {
            category: 'Stylistic Issues',
            description: 'Disallow "forEach"',
            recommended: false
        },
        schema: []
    }
};