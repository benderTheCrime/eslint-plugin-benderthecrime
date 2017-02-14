module.exports = {
    create(context) {
        const options = context.options[0] || {};
        const ignorePattern = options.ignorePattern ? new RegExp(options.ignorePattern) : /^\\(\*|\\)/;

        function report(node) {
            context.report(node, 'Unexpected comment.');
        }

        return {
            Program() {
                const sourceCode = context.getSourceCode();
                const comments = sourceCode.getAllComments();
                const len = comments.length;

                for (let i = 0; i < len; i++) {
                    const comment = comments[i];
                    const commentText = sourceCode.getText(comment);

                    if (!ignorePattern.test(commentText)) {
                        report(comment);
                    }
                }
            },
        };
    },
    meta: {
        docs: {
            category: 'Stylistic Issues',
            description: 'Disallow comments',
            recommended: false,
        },
        schema: [
            {
                additionalProperties: false,
                properties: {
                    ignorePattern: {
                        additionalProperties: false,
                        type: 'string',
                    },
                },
                type: 'object',
            },
        ],
    },
};