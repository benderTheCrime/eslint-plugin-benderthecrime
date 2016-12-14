const requireIndex = require('requireindex');

const recommended = require('../.eslintrc');

module.exports = {
    configs: {
        recommended
    },
    rules: requireIndex(`${__dirname}/rules`)
};