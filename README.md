![Github CI/CD](https://github.com/rsksmart/bridge-state-data-parser/actions/workflows/workflow.yml/badge.svg)

# Disclaimer

This is a beta version until audited by the security team. Any comments or suggestions feel free to contribute or reach out at our [open slack](https://developers.rsk.co/slack).

# bridge-state-data-parser

Library to get the current bridge state. This include available UTXOs, pegout requests waiting to be processed, pegout transactions waiting for signatures and pegout transactions waiting for block confirmations to be signed and broadcasted.

## Usage

### Install dependencies

```
npm install
```

### Run Project

```
node sample/sample.js mainnet/testnet or pass a network url for regtest... http://localhost:4444
```

to see the current status of pegouts on the provided network.

## Test

To run test with coverage, run:

> npm test

To run tests on a specific file, fun:

> npm test <testfilepath>

Example:

> npm test test/pegout-waiting-confirmation.test.js

We are using nyc code coverage, so when running the tests, nyc will create a code coverage report and print it in the console.

## Eslint and Prettier

To run the eslint check, run:

> npm run eslint

This will check and show if the code complies with our standard.

To get eslint help you make the required changes, you can run:

> npx eslint . --fix
> or
> npm run eslintFix

This command will try to fix the errors, leaving the once it cannot fix to the developer to solve manually.

To run the prettier check, fun:

> npm run prettier

This will check and show if the code complies with our standard.

To get prettier help you make the required changes, you can run:

> npx prettier --write .
> or
> npm run prettierFix

This command will format the code accordingly.

If you need to run both prettier and eslint checks, run:

> npm run formatCheck

If you need to run both prettier and eslint fixes, run:

> npm run formatFix

## Git Pre-commit

When making a commit, pre-commit will run these commands:

> npm run test
> npm run eslint
> npm run prettier

This way, we have a way to make sure that our code complies with our standard before making a commit.

If it's absolutely necessary to make a commit that does not pass the pre-commit check, then you can use the `--no-verify` flag while making the commit:

> git commit --no-verify -m "<the commit message>"
