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
};

const printPegoutRequestsInformation = pegoutRequests => {
    const totalValueInSatoshis = pegoutRequests.reduce((acc, request) => acc + Number(request.amountInSatoshis), 0);
    const totalValueInBtc = btcEthUnitConverter.satoshisToBtc(totalValueInSatoshis);
    console.log(`Peg-out requests (${pegoutRequests.length})`);
    console.log(pegoutRequests);
    console.log(`Total: ${totalValueInBtc} BTC\n`);
};

const printPegoutsWaitingForConfirmations = pegouts => {
    console.log(`Peg-outs waiting for confirmations  (${pegouts.length})`);
    console.log(JSON.stringify(pegouts, null, 2));
};

const printPegoutsWaitingForSignatures = pegouts => {
    console.log(`Peg-outs waiting for signatures (${pegouts.length})`);
    console.log(JSON.stringify(pegouts, null, 2));
};

(async () => {
    try {
        const network = process.argv[2];
        const host = networkParser(network);
        const bridgeStateResult = await getBridgeState(host);
        /* eslint no-console: "off" */
        console.log(`Bridge state in ${network}`);
        console.log('-----------------------');
        printUtxosInformation(bridgeStateResult.activeFederationUtxos);
        printPegoutRequestsInformation(bridgeStateResult.pegoutRequests);
        printPegoutsWaitingForConfirmations(bridgeStateResult.pegoutsWaitingForConfirmations);
        printPegoutsWaitingForSignatures(bridgeStateResult.pegoutsWaitingForSignatures);
        console.log(`Next Pegout Creation Block Number: ${bridgeStateResult.nextPegoutCreationBlockNumber}`);
    } catch (e) {
        console.log(e);
    }
})();
