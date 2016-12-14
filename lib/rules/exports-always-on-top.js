module.exports = {
    create(context) {
        const acceptedTypes = {
            ExportNamedDeclaration: true,
            ImportDeclaration: true,
            VariableDeclaration: true
        };

        function validateExport(node) {
            for (const childNode of node.parent.body) {
                if (node === childNode) {
                    return;
                } else if (!acceptedTypes[childNode.type]) {
                    context.report(node, 'Define exports at the top of the module.');
                }
            }
        }

        return {
            ExportDefaultDeclaration: validateExport,
            ExportNamedDeclaration: validateExport
        };
    },
    meta: {
        docs: {
            category: 'Best Practices',
            description: 'Require exports to be defined at the top of a module',
            recommended: true
        },
        schema: []
    }
};