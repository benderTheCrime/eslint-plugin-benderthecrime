const DEFAULT_MAX_PROPS = 20;

module.exports = {
    create(context) {
        let max = DEFAULT_MAX_PROPS;

        if (!isNaN(context.options[0])) {
            max = context.options[0];
        }

        return {
            ObjectExpression(node) {
                if (node.properties.length > max) {
                    context.report(node, `Object literal defined with more than ${max} properties.`);
                }
            },
        };
    },
    meta: {
        docs: {
            category: 'Best Practices',
            description: 'Limit the number of properties defined in Object literal definitions.',
            recommended: false,
        },
        schema: [
            {
                type: 'number',
            },
        ],
    },
};
