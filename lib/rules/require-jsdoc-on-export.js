module.exports = {
    meta: {
        docs: {
            description: 'Require JSDoc comments on exports',
            category: 'Stylistic Issues',
            recommended: false
        },
        schema: [
            {
                type: 'object',
                properties: {
                    require: {
                        type: 'object',
                        properties: {
                            ClassDeclaration: { type: 'boolean' },
                            MethodDefinition: { type: 'boolean' },
                            FunctionDeclaration: { type: 'boolean' },
                            ArrowFunctionExpression: { type: 'boolean' }
                        },
                        additionalProperties: false
                    }
                },
                additionalProperties: false
            }
        ]
    },
    create(context) {
        const source = context.getSourceCode();
        const DEFAULT_OPTIONS = {
            FunctionDeclaration: true,
            MethodDefinition: false,
            ClassDeclaration: false
        };
        const options = Object.assign(
            DEFAULT_OPTIONS,
            (context.options[ 0 ] && context.options[ 0 ].require) || {}
        );

        function checkClassMethodJsDoc(node) {
            if (node.parent.type === 'MethodDefinition') {
                const jsdocComment = source.getJSDocComment(node);

                if (!jsdocComment && isExportNode(node)) {
                    report(node);
                }
            }
        }

        function checkJsDoc(node) {
            const jsdocComment = source.getJSDocComment(node);

            if (!jsdocComment && isExportNode(node)) {
                report(node);
            }
        }

        function isExportNode(node) {
            const parentType = node.parent && node.parent.type;

            if (parentType) {
                return [
                    'ExportDefaultDeclaration',
                    'ExportNamedDeclaration'
                ].includes(parentType);
            }

            return false;
        }

        function report(node) {
            context.report(node, 'Missing JSDoc comment.');
        }

        return {
            FunctionDeclaration(node) {
                if (options.FunctionDeclaration) {
                    checkJsDoc(node);
                }
            },
            FunctionExpression(node) {
                if (options.MethodDefinition) {
                    checkClassMethodJsDoc(node);
                }
            },
            ClassDeclaration(node) {
                if (options.ClassDeclaration) {
                    checkJsDoc(node);
                }
            },
            ArrowFunctionExpression(node) {
                if (
                    options.ArrowFunctionExpression &&
                    node.parent.type === 'VariableDeclarator'
                ) {
                    checkJsDoc(node);
                }
            }
        };
    }
};