const ACCEPTED_TYPES = {
    ExportNamedDeclaration: true,
    ImportDeclaration: true,
    VariableDeclaration: true,
};

module.exports = {
    create(context) {
        function validateExport(node) {
            const { body } = node.parent;
            const len = body.length;
            let i = 0;

            for (; i < len; ++i) {
                const childNode = body[i];

                if (node === childNode) {
                    return;
                } else if (!ACCEPTED_TYPES[childNode.type]) {
                    context.report(node, 'Define exports at the top of the module.');
                }
            }
        }

        function validateImport(node) {
            const { body } = node.parent;
            const len = body.length;
            let i = 0;

            for (; i < len; ++i) {
                if (node === body[i]) {
                    return;
                } else if (node.type !== 'ImportDeclaration') {
                    context.report(node, 'Define imports at the top of the module.');
                }
            }
        }

        return {
            ExportDefaultDeclaration: validateExport,
            ExportNamedDeclaration: validateExport,
            ImportDeclaration: validateImport,
        };
    },
    meta: {
        docs: {
            category: 'Best Practices',
            description: 'Require imports/exports to be defined at the top of a module',
            recommended: true,
        },
        schema: [],
    },
};
