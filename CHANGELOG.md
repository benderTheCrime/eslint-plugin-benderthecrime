# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

### [1.9.0] - 2017-14-02
#### Add/Update/Remove
- Update "no-comment" "ignorePattern" property to be less specific about eslint comment types

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

### [1.3.1] - 2017-11-01
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

### [1.1.2] - 2016-23-12
#### Remove
- Remove "MethodDefinition" from "max-func-body-len" rule.

### [1.1.1] - 2016-21-12
#### Update
- Update prefer const to prefer all destructured variables be declared with const.

### [1.1.0] - 2016-15-12
#### Add
- Add rule for "sort-keys" extended from ESLint.