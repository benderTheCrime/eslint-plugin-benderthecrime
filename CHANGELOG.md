# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

### [1.18.0] - 2016-13-12
- Added rule for "no-break"

### [1.17.0] - 2016-10-12
- Added rule for "no-arrow-callback"

### [1.16.0] - 2016-09-12
#### Added/Changed
- Added rule for "no-require"
- Added the following rules:
  - "no-await-in-loop"
  - "require-await"

### [1.15.0] - 2016-07-12
#### Changed
- Enabled "newline-per-chained-call"
- Updated README to reflect code sample types

### [1.14.0] - 2016-05-12
#### Added/Changed/Removed
- Added the following rules:
  - "cache-for-loop-length"
  - "no-for-each"
- Disable rule "require-jsdoc"
- Removed JSDocs

### [1.13.0] - 2016-05-12
#### Added
- Added the following rules:
  - "no-for-of"
  - "no-switch-statement"
  - "no-while-loop"

### [1.12.0] - 2016-29-11
#### Add
- Add rule for "exports-always-on-top"

### [1.11.0] - 2016-29-11
#### Changed
- Be more specific about "consistent-return"
- Changed "max-params" from 8 to 3

### [1.10.0] - 2016-23-11
#### Changed
- Update "eqeqeq": smart is not so smart

### [1.9.0] - 2016-23-11
#### Added/Changed
- Added rule for "no-for-in"
- Updated "max-nested-callbacks"

### [1.8.0] - 2016-22-11
#### Changed
- Update rule for "one-var"

### [1.7.0] - 2016-22-11
#### Changed
- Enabled the following rules:
  - "complexity"
  - "func-style"
  - "id-length"
  - "max-statements"
  - "no-continue"
  - "no-empty-function"
  - "no-implicit-coercion"
  - "no-invalid-this"
  - "no-lone-blocks"
  - "no-magic-numbers"
  - "no-sync"
  - "no-underscore-dangle"
  - "padded-blocks"
  - "prefer-rest-params"

### [1.6.0] - 2016-20-11
#### Added/Changed
- Added the "require-jsdoc-on-export" rule
- Changed the "no-warning-comments" terms to all caps

### [1.5.0] - 2016-11-06
#### Added/Changed/Removed
- Added the "max-func-body-len" rule
- Added `eslintrc.json` to which `index.js` now points
- Upgraded versions of eslint depenednencies
- Removed the "new-cap-alt" rule

### [1.4.0] - 2016-06-16
#### Added/Changed/Removed
- Upgraded to eslint "2.12.0" and modified rules to reflect the upgrade
- Added ES6 specific rules to the configuration
- Removed extension dependencies

#### [1.3.1] - 2016-05-24
##### Changed
- Changed the RegExp ignore pattern for `max-len` to accept "const/require"
statements

### [1.3.0] - 2016-02-29
#### Added
- Added new 2.0 rules for `array-callback-return`

### [1.2.0] - 2016-02-22
#### Added
- Added new 2.0 rules for `consistent-return`, `no-return-assign`,
`keyword-spacing`, and `no-labels`

### [1.1.0] - 2016-02-22
#### Added
- Added a RegExp ignore clause for `max-len` to not fault on import statements

#### [1.0.2] - 2016-01-30
##### Changed
- Added more clarity to the README