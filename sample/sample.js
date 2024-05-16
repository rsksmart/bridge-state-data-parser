// eslint-disable-next-line import/no-extraneous-dependencies
const btcEthUnitConverter = require('@rsksmart/btc-eth-unit-converter');
const networkParser = require('./network');
const { getBridgeState } = require('../index');

const printUtxosInformation = utxos => {
    const totalValueInSatoshis = utxos.reduce((acc, utxo) => acc + utxo.valueInSatoshis, 0);
    const totalValueInBtc = btcEthUnitConverter.satoshisToBtc(totalValueInSatoshis);
    console.log(`Active federation UTXOs (${utxos.length})`);
    console.log(utxos.sort((a, b) => a.btcTxHash.localeCompare(b.btcTxHash)));
    console.log(`Total: ${totalValueInBtc} BTC\n`);
}

(async () => {
    try {
        const network = process.argv[2];
        const host = networkParser(network);
        const bridgeStateResult = await getBridgeState(host);
        /* eslint no-console: "off" */
        console.log(`Bridge state in ${network}`);
        console.log('-----------------------');
        printUtxosInformation(bridgeStateResult.activeFederationUtxos);
        console.log(`Peg-out requests (${bridgeStateResult.pegoutRequests.length})`);
        console.log(bridgeStateResult.pegoutRequests);
        console.log(`Peg-outs waiting for confirmations  (${bridgeStateResult.pegoutsWaitingForConfirmations.length})`);
        console.log(bridgeStateResult.pegoutsWaitingForConfirmations);
        console.log(`Peg-outs waiting for signatures (${bridgeStateResult.pegoutsWaitingForSignatures.length})`);
        console.log(bridgeStateResult.pegoutsWaitingForSignatures);
        console.log(`Next Pegout Creation Block Number: ${bridgeStateResult.nextPegoutCreationBlockNumber}`);
    } catch (e) {
        console.log(e);
    }
})();
