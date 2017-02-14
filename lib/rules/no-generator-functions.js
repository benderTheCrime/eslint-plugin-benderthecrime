module.exports = {
    create(context) {
        return {
            FunctionDeclaration(node) {
                if (node.generator === true) {
                    context.report(node, 'Unexpected use of generator functions.');
                }
            },
        };
    },
    meta: {
        docs: {
            category: 'Best Practices',
            description: 'Disallow generator functions',
            recommended: false,
        },
        schema: [],
    },
};