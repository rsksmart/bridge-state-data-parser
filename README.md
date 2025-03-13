![Github CI/CD](https://github.com/rsksmart/bridge-state-data-parser/actions/workflows/workflow.yml/badge.svg)
[![CodeQL](https://github.com/rsksmart/bridge-state-data-parser/workflows/CodeQL/badge.svg)](https://github.com/rsksmart/bridge-state-data-parser/actions?query=workflow%3ACodeQL)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/rsksmart/bridge-state-data-parser/badge)](https://scorecard.dev/viewer/?uri=github.com/rsksmart/bridge-state-data-parser)

# bridge-state-data-parser

Library to get the current bridge state. This include available UTXOs, pegout requests waiting to be processed, pegout transactions waiting for signatures, pegout transactions waiting for block confirmations to be signed and broadcasted and also the next pegout creation block number.

## Usage

### Install dependencies

> npm install

### Run Project

To see the current status of pegouts on the provided network, run:

For mainnet:

> node sample/sample.js mainnet

For testnet:

> node sample/sample.js testnet

Or pass a network url for regtest:

> node sample/sample.js http://localhost:4444

## Test

To run test with coverage, run:

> npm test

To run tests on a specific file, fun:

> npm test test/testfilepath

Example:

> npm test test/pegout-waiting-confirmation.test.js

We are using nyc code coverage, so when running the tests, nyc will create a code coverage report and print it in the console.

## Eslint and Prettier

To run the eslint and prettier check, run:

> npm run lint

This will check and show if the code complies with our standard.

To get eslint and prettier help you make the required changes, you can run:

> npm run lint:fix

This command will try to fix the errors, leaving the ones it cannot fix to the developer to solve manually.

For any comments or suggestions, feel free to contribute or reach out at our [Discord server](https://discord.gg/rootstock).
