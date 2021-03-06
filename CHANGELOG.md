## Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

### [2.3.0] - 2017-17-10
#### Add/Update
- Add "multiline-comment-style" rule configuration
- Update ESLint to 4.9.0

#### [2.2.1] - 2017-06-09
#### Fix
- Fix configuration for rule "comma-dangle"

### [2.2.0] - 2017-02-09
#### Add/Remove/Update
- Add "function-paren-newline" rule configuration
- Update ESLint to 4.6.0

### [2.1.0] - 2017-09-08
#### Add/Remove/Update
- Add "getter-return" rule configuration
- Remove "ForInStatement" from "no-restricted-syntax" rule configuration
- Update ESLint to 4.4.1

#### [2.0.1] - 2017-16-06
#### Remove
- Remove configuration for "array-bracket-newline" until such a time where it becomes more configurable for "ArrayPattern" types versus "ArrayExpression" types.

### [2.0.0] - 2017-13-06
#### Add/Update
- Add configuration for new ESLint rules:
    - "array-element-newline"
    - "semi-style"
    - "padding-line-between-statements"
    - "for-direction"
    - "switch-colon-spacing"
    - "array-bracket-newline"
    - "no-buffer-constructor"
- Add "consistent" flag to the configuration options for "object-curly-newline"
- Add ESLint fix npm script:
    `npm run lint:fix`
- Update to ESLint to "eslint@^4.0.0

#### [1.12.1] - 2017-14-04
#### Update
- Update to ESLint to "eslint@^3.19.0"

### [1.12.0] - 2017-08-03
#### Add/Update
- Add configuration for the following rules:
    - "no-compare-neg-zero"
    - "nonblock-statement-body-position"
- Update "no-magic-numbers" to ignore -1

### [1.11.0] - 2017-27-02
#### Update
- Change "limit-object-expression-prop-count" "max" default to 20

### [1.10.0] - 2017-21-02
#### Update
- Disable "capitalized-comments" for "plugin:benderthecrime/all"

### [1.9.0] - 2017-18-02
#### Add/Update/Remove
- Update "no-comment" "ignorePattern" property to be less specific about ESLint comment types

### [1.8.0] - 2017-14-02
#### Add/Update/Remove
- Add "no-generator-functions" rule
- Add "limit-object-expression-props" rule
- Add "import-occurrence-order" rule
- Change "quote-props" "keywords" option to false
- Deprecated the following custom rules in favor of native alternatives:
    - "no-break"
    - "no-for-each"
    - "no-for-in"
    - "no-for-of"
    - "no-switch-statement"
    - "no-while-loop"
- Update "comma-dangle" rule configuation
- Update "benderthecrime/sort-keys" to also check for sorting of named imports/exports
- Remove "eslint-plugin-react"

### [1.7.0] - 2017-08-02
#### Update
- Enable "eol-last" and set string option to "never"

### [1.6.0] - 2017-25-01
#### Add
- Add "ImportExpression" to "no-restricted-syntax"

### [1.5.0] - 2017-23-01
#### Add
- Add rule for "prefer-promise-reject-errors"
- Update "object-curly-newline" and "object-property-newline" to allow for only newline properties on "ObjectExpression"

### [1.4.0] - 2017-13-01
#### Add
- Add rule for "no-unnecessary-arrow-function". This rule checks to see if there exists a "ThisExpression" in the checked "ArrowFunctionExpression" and fails if one does not exist.

#### [1.3.1] - 2017-11-01
#### Update
- "cache-for-loop-length" should respect only "BinaryExpression" types
- "no-for-each" updated to accept parent expressions of either "CallExpression" or "MemberExpression"

### [1.3.0] - 2017-11-01
#### Add
- Add definition for rule "prefer-destructuring"

### [1.2.0] - 2016-28-12
#### Change
- Update "no-magic-numbers" ignored numbers. The list now is limited to:
  - 0
  - 1
  - 10
  - 100

#### [1.1.2] - 2016-23-12
#### Remove
- Remove "MethodDefinition" from "max-func-body-len" rule.

#### [1.1.1] - 2016-21-12
#### Update
- Update prefer const to prefer all destructured variables be declared with const.

### [1.1.0] - 2016-15-12
#### Add
- Add rule for "sort-keys" extended from ESLint.
