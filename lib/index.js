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
    'benderthecrime/no-comment': [
        ERROR,
        {
            ignorePattern: '\\s(eslint|@flow)',
        },
    ],
    'benderthecrime/no-generator-functions': ERROR,
    'benderthecrime/no-unnecessary-arrow-function': ERROR,
    'benderthecrime/sort-keys': [
        ERROR,
        'asc',
    ],
});
const all = Object.assign({}, recommended, {
    rules: allRules,
});
const rules = requireIndex(`${__dirname}/rules`);

module.exports = {
    configs: {
        all,
        recommended,
    },
    rules,
};