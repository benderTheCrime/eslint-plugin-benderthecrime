module.exports = {
    create(context) {
        const { options } = context;
        const exclude = [...options[0] && Array.isArray(options[0].exclude) ? options[0].exclude : []];
        const source = context.getSourceCode();

        function checkJSDoc(node) {
            if (!source.getJSDocComment(node)) {
                context.report(node, 'Missing JSDoc comment.');
            }
        }

        function isExcludedNodeType(node) {
            return exclude.indexOf(node.type) > -1;
        }

        function isModuleExportsExpression(node) {
            return node.object && node.object.name === 'module' && node.property && node.property.name === 'exports';
        }

        return {
            ExportDefaultDeclaration(node) {
                if (!isExcludedNodeType(node.declaration)) {
                    checkJSDoc(node);
                }
            },
            ExportNamedDeclaration(node) {
                if (!isExcludedNodeType(node.declaration)) {
                    checkJSDoc(node);
                }
            },
            MemberExpression(node) {
                if (isModuleExportsExpression(node) && !isExcludedNodeType(node.parent.right)) {
                    checkJSDoc(node.parent);
                }
            },
        };
    },
    meta: {
        docs: {
            category: 'Stylistic Issues',
            description: 'Require JSDoc comments on exports.',
            recommended: false,
        },
        schema: [
            {
                additionalProperties: false,
                properties: {
                    exclude: {
                        additionalProperties: false,
                        type: 'Array',
                    },
                },
                type: 'object',
            },
        ],
    },
};
