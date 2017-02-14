module.exports = {
    create(context) {
        return {
            Identifier(node) {
                if (
                    node.name === 'forEach' &&
                    ['CallExpression', 'MemberExpression'].includes(node.parent.type)
                ) {
                    context.report(node, 'Unexpected use of "forEach".');
                }
            },
        };
    },
    meta: {
        deprecated: true,
        docs: {
            category: 'Stylistic Issues',
            description: 'Disallow "forEach"',
            recommended: false,
        },
        schema: [],
    },
};