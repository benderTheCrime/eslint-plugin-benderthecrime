module.exports = {
    create(context) {
        return {
            ArrowFunctionExpression(node) {
                if (
                    node.parent.type === 'CallExpression' &&
                    !context.getSourceCode().getText(node)
                        .includes('this.')
                ) {
                    context.report(node, 'Unexpected use of arrow callbacks.');
                }
            }
        };
    },
    meta: {
        docs: {
            category: 'Stylistic Issues',
            description: 'Disallow arrow function callbacks',
            recommended: false
        },
        schema: []
    }
};