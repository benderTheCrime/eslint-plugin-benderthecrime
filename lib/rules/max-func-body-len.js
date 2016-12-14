module.exports = {
    meta: {
        docs: {
            description: 'Limit the length of function bodies',
            category: 'Best Practices',
            recommended: false
        },
        schema: [
            { type: 'number' }
        ]
    },
    create(context) {
        const defaultMaxLength = 300;
        const max = context.options[ 0 ] || defaultMaxLength;

        function validateFuncBodyLength(node) {
            const len = context.getSourceCode().getText(node.body).length;

            if (len > max) {
                context.report(
                    node,
                    node.loc.start,
                    `Function body greater than ${max} characters (${len}).`
                );
            }
        }

        return {
            ArrowFunctionExpression: validateFuncBodyLength,
            FunctionDeclaration: validateFuncBodyLength,
            FunctionExpression: validateFuncBodyLength,
            MethodDefinition: validateFuncBodyLength
        };
    }
};