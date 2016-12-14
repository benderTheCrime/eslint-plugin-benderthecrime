const requireIndex = require('requireindex');

const recommended = require('../.eslintrc');

module.exports.rules = requireIndex(`${__dirname}/rules`);
module.exports.configs = { recommended };