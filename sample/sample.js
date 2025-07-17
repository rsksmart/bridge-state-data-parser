// eslint-disable-next-line import/no-extraneous-dependencies
const btcEthUnitConverter = require('@rsksmart/btc-eth-unit-converter');
const networkParser = require('./network');
const { getBridgeState, getLatestBlockNumber } = require('../index');

const printUtxosInformation = utxos => {
    const totalValueInSatoshis = utxos.reduce((acc, utxo) => acc + utxo.valueInSatoshis, 0);
    const totalValueInBtc = btcEthUnitConverter.satoshisToBtc(totalValueInSatoshis);
    console.log(`Active federation UTXOs (${utxos.length})`);
    console.log(utxos.sort((a, b) => a.btcTxHash.localeCompare(b.btcTxHash)));
    console.log(`Total: ${totalValueInBtc} BTC\n`);
};

const printPegoutRequestsInformation = (pegoutRequests, nextPegoutCreationBlockNumber) => {
    const totalValueInSatoshis = pegoutRequests.reduce((acc, request) => acc + Number(request.amountInSatoshis), 0);
    const totalValueInBtc = btcEthUnitConverter.satoshisToBtc(totalValueInSatoshis);
    console.log(`Peg-out requests (${pegoutRequests.length})`);
    console.log(pegoutRequests);
    console.log(`Total: ${totalValueInBtc} BTC`);
    console.log(`Next peg-out creation block number: ${nextPegoutCreationBlockNumber}\n`);
};

const printPegoutsWaitingForConfirmations = (pegouts, latestBlockNumber, rskToBtcRequiredConfirmations) => {
    console.log(`Peg-outs waiting for confirmations  (${pegouts.length})`);
    pegouts.forEach(pegout => {
        const confirmations = latestBlockNumber - pegout.pegoutCreationBlockNumber;
        const missingConfirmations = rskToBtcRequiredConfirmations - confirmations;
        pegout.pegoutCreationBlockNumber += ` (${confirmations} confirmations, ${missingConfirmations} pending)`;
    });
    console.log(`${JSON.stringify(pegouts, null, 2)}\n`);
};

const printPegoutsWaitingForSignatures = pegouts => {
    console.log(`Peg-outs waiting for signatures (${pegouts.length})`);
    console.log(`${JSON.stringify(pegouts, null, 2)}\n`);
};

(async () => {
    try {
        const network = process.argv[2];
        const networkInfo = networkParser(network);
        const host = networkInfo.host;
        const rskToBtcRequiredConfirmations = networkInfo.rskToBtcRequiredConfirmations;
        const bridgeStateResult = await getBridgeState(host);
        const latestBlockNumber = await getLatestBlockNumber(host);
        /* eslint no-console: "off" */
        console.log(`Bridge state in ${network}`);
        console.log('-----------------------');
        printUtxosInformation(
            bridgeStateResult.activeFederationUtxos
        );
        printPegoutRequestsInformation(
            bridgeStateResult.pegoutRequests, 
            bridgeStateResult.nextPegoutCreationBlockNumber
        );
        printPegoutsWaitingForConfirmations(
            bridgeStateResult.pegoutsWaitingForConfirmations, 
            latestBlockNumber,
            rskToBtcRequiredConfirmations
        );
        printPegoutsWaitingForSignatures(
            bridgeStateResult.pegoutsWaitingForSignatures
        );

        console.log(`Latest block number: ${latestBlockNumber}\n`);
    } catch (e) {
        console.log(e);
    }
})();
