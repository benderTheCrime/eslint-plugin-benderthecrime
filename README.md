# eslint-plugin-benderthecrime
Shareable ESLint plugin

## Installation

You'll first need to install [ESLint](http://eslint.org):
```
npm i eslint --save-dev
```

You will also need the the `babel-eslint` package, which this package uses as
its parser, as well as the `eslint-plugin-react` module:
```bash
npm i --save-dev babel-eslint eslint-plugin-react
```

Next, install `eslint-plugin-benderthecrime`:
```
npm install eslint-plugin-benderthecrime --save-dev
```

**NOTE: If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-benderthecrime` globally.**

## Usage

Add `eslint-plugin-benderthecrime` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:
```json
{
    "plugins": [
        "benderthecrime"
    ]
}
```

Then configure the rules you want to use under the rules section.
```json
{
    "rules": {
        "benderthecrime/no-for-of": 2
    }
}
```

Additionally, this plugin comes with a recommended configuration, which can be inherited from in your `.eslintrc`:

```json
{
    "extends": [
        "plugin:benderthecrime/recommended"
    ],
    "plugins": [
        "benderthecrime"
    ]
}
```

Finally, this plugin comes with an "all" configuration, which will enable all custom rules found in this plugin:

```json
{
    "extends": [
        "plugin:benderthecrime/all"
    ],
    "plugins": [
        "benderthecrime"
    ]
}
```

## Supported Rules
None of the rules that are available with this plugin have additional options where they are not specified.

* `cache-for-loop-length`:

    Requires that the second clause of the for loop condition reference a variable as opposed to directly referencing the length of a collection:

    ```javascript
    // BAD
    for (let i = 0; i < arr.length; ++i) {}

    // GOOD
    const len = arr.length;

    for (let i = 0; i < len; ++i) {}
    ```

* `exports-always-on-top`:

    Requires that only imports and definitions come before export statements. This also implies that imports must be defined at the top of the module.


* `import-occurrence-order`:

    Requires that imports are listed in the order in which they are used. This rule takes an optional second argument which has a property "ignoreImportGroups" which will ignore ordering of import groups separated by a newline:

    ```json
    {
        "rules": {
            "benderthecrime/import-occurrence-order": [
                2,
                {
                    "ignoreImportGroups": false
                }
            ]
        }
    }
    ```


* `limit-object-expression-prop-count`:

    Limits the number of properties allowed in an object literal definition.

    The v8 engine explicitly puts any object with more than 26 properties into slow mode. This is an attempt to hedge the risk of objects being treated as dictionaries in v8. For more information, see the [v8 engine unit tests](https://github.com/v8/v8/blob/d52280b1a7a867ffb350c4f193cf8692861855dd/test/mjsunit/fast-prototype.js "v8 Engine").

    ```json
    {
        "rules": {
            "benderthecrime/limit-object-expression-prop-count": [ 2, 15 ]
        }
    }
    ```

* `max-function-body-length`:

    Allows the user to define a max length in characters no function can exceed. This rule takes a second argument which indicates the max length which no function can exceed. The default is 300:

    ```json
    {
        "rules": {
            "benderthecrime/max-function-body-length": [ 2, 300 ]
        }
    }
    ```

* `no-arrow-callback`:

    **DEPRECATED**: Use a combination of the "max-nested-callbacks" and "no-unnecessary-arrow-function" rules

    Disallows arrow functions as callbacks:

    ```javascript
    // BAD
    [1, 2, 3].map(n => n ** 2);

    // GOOD
    [1, 2, 3].map(square);

    function square(n) {
        return n ** 2;
    }
    ```

* `no-break`:

    **DEPRECATED**: Use "no-restricted-syntax"

    Disallows break statements.

* `no-comment`:

    Disallows comments. This rule takes an optional second parameter as an object allowing a comment pattern to ignore:

    ```json
    {
        "rules": {
            "benderthecrime/no-comment": [
                2,
                {
                    "ignorePattern": "eslint-disable|@flow"
                }
            ]
        }
    }
    ```

* `no-for-each`:

    **DEPRECATED**: Use "no-restricted-properties"

    Disallows `forEach`:

    ```javascript
    // BAD
    [1, 2, 3].forEach(console.log);

    // GOOD
    for (let i = 0; i < [1, 2, 3].length; ++i) {
        console.log(i);
    }
    ```

    **NOTE: Currently, this rule prevents the use of ANY `forEach` method**

* `no-for-in`:

    **DEPRECATED**: Use "no-restricted-syntax"

    Disallows "for...in".

* `no-for-of`:

    **DEPRECATED**: Use "no-restricted-syntax"

    Disallows "for...of".

* `no-generator-functions`:

    Disallows generator functions.

    Generator functions are not currently optimizable by the v8 engine because they potentially have indeterminate end conditions. It may not be a wise decision to use generator functions until they become optimizable.

* `no-require`:

    Disallows the use of require to import modules. Instead this rule predicates the use of ES6 style imports.

* `no-switch-statement`:

    **DEPRECATED**: Use "no-restricted-syntax"

    Disallows switch statements.

* `no-unnecessary-arrow-function`:

    Disallows the use of arrow functions without the use of "this" in the function body.

* `no-while-loop`:

    **DEPRECATED**: Use "no-restricted-syntax"

    Disallows all flavors of while loops.

* `require-jsdoc-on-export`:

    Requires JSDoc docstrings only on exports. This rule allows an additional configuration option specifying on which code constructs JSDocs should be required:

    ```json
    {
        "rules": {
            "benderthecrime/require-jsdoc-on-export": [
                2,
                {
                  "ClassDeclaration": false,
                  "FunctionDeclaration": true,
                  "MethodDefinition": false
                }
            ]
        }
    }
    ```

## Changes
For an up to date list of changes, please see the [CHANGELOG.md](https://github.com/benderthecrime/eslint-plugin-benderTheCrime/blob/master/CHANGELOG.md "CHANGELOG")