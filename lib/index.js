const requireIndex = require('requireindex');

const recommendedConfig = require('../.eslintrc');

const ERROR = 2;
const MAX_FUNCTION_BODY_LENGTH = 500;

const plugins = [
    'benderthecrime',
];
const recommended = Object.assign({
    plugins,
}, recommendedConfig);
const allRules = Object.assign({}, recommended.rules, {
    'benderthecrime/cache-for-loop-length': ERROR,
    'benderthecrime/exports-always-on-top': ERROR,
    'benderthecrime/import-occurrence-order': ERROR,
    'benderthecrime/limit-object-expression-prop-count': ERROR,
    'benderthecrime/max-function-body-length': [
        ERROR,
        MAX_FUNCTION_BODY_LENGTH,
    ],
    'benderthecrime/no-arrow-callback': 0,
    'benderthecrime/no-break': ERROR,
    'benderthecrime/no-comment': [
        ERROR,
        {
            ignorePattern: 'eslint-(disable|enable)|@flow',
        },
    ],
    'benderthecrime/no-for-each': ERROR,
    'benderthecrime/no-for-in': ERROR,
    'benderthecrime/no-for-of': ERROR,
    'benderthecrime/no-generator-functions': ERROR,
    'benderthecrime/no-switch-statement': ERROR,
    'benderthecrime/no-unnecessary-arrow-function': ERROR,
    'benderthecrime/no-while-loop': ERROR,
    'benderthecrime/sort-keys': [
        ERROR,
        'asc',
    ],
});
const all = Object.assign({}, recommended, {
    rules: allRules,
});

module.exports = {
    configs: {
        all,
        recommended,
    },
    rules: requireIndex(`${__dirname}/rules`),
};