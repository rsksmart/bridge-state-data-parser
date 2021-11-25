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

> npm test test/pegout-waiting-confirmation.test.js

Example:

> npm test test/pegout-waiting-confirmation.test.js
