module.exports = {
    create(context) {
        const comments = context.getSourceCode().getAllComments();

        function report(node) {
            context.report(node, 'Unexpected comment.');
        }

        return {
            Program() {
                comments.forEach(report);
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