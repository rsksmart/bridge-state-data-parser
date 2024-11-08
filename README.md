![Github CI/CD](https://github.com/rsksmart/bridge-state-data-parser/actions/workflows/workflow.yml/badge.svg)
[![CodeQL](https://github.com/rsksmart/bridge-state-data-parser/workflows/CodeQL/badge.svg)](https://github.com/rsksmart/bridge-state-data-parser/actions?query=workflow%3ACodeQL)

# bridge-state-data-parser

Library to get the RSK Powpeg Bridge state at any block. It includes available UTXOs, pegout requests waiting to be processed, pegout transactions waiting for block confirmations, pegout transactions waiting to be signed and broadcasted, and the next pegout creation block number.

## Usage

### Install dependencies

> npm install

### Run a sample from the command line

While executing the sample from the command line, there are several parameters that can be passed, in any order, all optional:

-   `--rskNetworkOrHost`. Can be `testnet`, `mainnet`, or an `http` host to an rsk node. Defaults to `mainnet`.
-   `--atBlock`. Can be a number or the string `latest`. Its used to get the Bridge state as it was at that block. Defaults to `latest`.
-   `--btcNetworkName`. Can be `testnet`, `mainnet`, `regtest`. It is used to decode the btc destination address of the pegout requests from `HASH160` to `base58` with the specified btc network format. Defaults to an empty string and it will leave it has `HASH160`.

#### Examples:

**For testnet:**

To get the Bridge state in rsk testnet, as it was at rsk block 5737737 and with the btc destination address of the pegout requests in base58:

> node sample/sample.js --rskNetworkOrHost=testnet --btcNetworkName=testnet --atBlock=5737737

To get the Bridge state in rsk testnet, as it is at the latest block and with the btc destination address of the pegout requests in base58:

> node sample/sample.js --rskNetworkOrHost=testnet --btcNetworkName=testnet

To get the Bridge state in rsk testnet, as it is at the latest block and with the btc destination address as HASH160:

> node sample/sample.js --rskNetworkOrHost=testnet

To get the Bridge state in rsk testnet, as it was at rsk block 5737737 and with the btc destination address as HASH160:

> node sample/sample.js --rskNetworkOrHost=testnet --atBlock=5737737

**For mainnet:**

To get the Bridge state in rsk mainnet, as it was at rsk block 6884264 and with the btc destination address of the pegout requests in base58:

> node sample/sample.js --btcNetworkName=mainnet --atBlock=6884264

To get the Bridge state in rsk mainnet, as it was at rsk block 6884264 and with the btc destination address as HASH160:

> node sample/sample.js --atBlock=6884264

To get the Bridge state in rsk mainnet, as it is at the latest block and with the btc destination address as HASH160:

> node sample/sample.js

**For regtest and specific hosts:**

To get the Bridge state in an rsk node running on a host like `http://localhost:4444`, as it was at rsk block, 100, for example, and with the btc destination address of the pegout requests in base58:

> node sample/sample.js --rskNetworkOrHost=http://localhost:4444 --btcNetworkName=regtest --atBlock=100

To get the Bridge state in an rsk node running on a host like `http://localhost:4444`, as it is at the latest block and with the btc destination address of the pegout requests in base58:

> node sample/sample.js --rskNetworkOrHost=http://localhost:4444 --btcNetworkName=regtest

To get the Bridge state in an rsk node running on a host like `http://localhost:4444`, as it is at the latest block and with the btc destination address as HASH160:

> node sample/sample.js --rskNetworkOrHost=http://localhost:4444

To get the Bridge state in an rsk node running on a host like `http://localhost:4444`, as it was at rsk block, 100, for example, and with the btc destination address as HASH160:

> node sample/sample.js --rskNetworkOrHost=http://localhost:4444 --atBlock=100

## Test

To run test with coverage, run:

> npm test

To run tests on a specific file, fun:

> npm test test/<testfilepath>

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

## Installing and using this library in other nodejs projects

You can also install and use this library in other nodejs projects. To install it, run:

> npm i @rsksmart/bridge-state-data-parser

And use it like this:

```js
const { getBridgeState } = require('@rsksmart/bridge-state-data-parser');

const bridgeState = await getBridgeState(rskWeb3Client);

console.log('bridgeState: ', bridgeState);
```

It will print a js object with the following format:

```js
{
  activeFederationUtxos: [
    {
        btcTxHash: string;
        btcTxOutputIndex: number;
        valueInSatoshis: number;
    },
    // ...
  ],
  pegoutRequests: [
    {
        btcDestinationAddress: string;
        amountInSatoshis: string;
        rskTxHash: string;
    },
    // ...
  ],
  pegoutsWaitingForConfirmations: [
    {
        btcRawTx: string;
        pegoutCreationBlockNumber: string;
        rskTxHash: string;
    },
    // ...
  ],
  pegoutsWaitingForSignatures: [
    {
        rskTxHash: string;
        btcRawTx: string;
    },
    // ...
  ],
  nextPegoutCreationBlockNumber: number
}
```
