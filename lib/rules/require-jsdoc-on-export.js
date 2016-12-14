const DEFAULT_OPTIONS = {
    ClassDeclaration: false,
    FunctionDeclaration: true,
    MethodDefinition: false
};

module.exports = {
    create(context) {
        const source = context.getSourceCode();
        let options = DEFAULT_OPTIONS;

        if (context.options[0] && context.options[0].require) {
            options = Object.assign({}, DEFAULT_OPTIONS, context.options[0].require);
        }

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
            ArrowFunctionExpression(node) {
                if (
                    options.ArrowFunctionExpression &&
                    node.parent.type === 'VariableDeclarator'
                ) {
                    checkJsDoc(node);
                }
            },
            ClassDeclaration(node) {
                if (options.ClassDeclaration) {
                    checkJsDoc(node);
                }
            },
            FunctionDeclaration(node) {
                if (options.FunctionDeclaration) {
                    checkJsDoc(node);
                }
            },
            FunctionExpression(node) {
                if (options.MethodDefinition) {
                    checkClassMethodJsDoc(node);
                }
            }
        };
    },
    meta: {
        docs: {
            category: 'Stylistic Issues',
            description: 'Require JSDoc comments on exports',
            recommended: false
        },
        schema: [
            {
                additionalProperties: false,
                properties: {
                    require: {
                        additionalProperties: false,
                        properties: {
                            ArrowFunctionExpression: { type: 'boolean' },
                            ClassDeclaration: { type: 'boolean' },
                            FunctionDeclaration: { type: 'boolean' },
                            MethodDefinition: { type: 'boolean' }
                        },
                        type: 'object'
                    }
                },
                type: 'object'
            }
        ]
    }
};