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

const defaultParamsValues = {
    rskNetworkOrHost: 'mainnet',
    atBlock: 'latest',
    btcNetworkName: ''
};

const getCommandLineParsedParams = () => {
    const params = process.argv
        .filter(param => param.startsWith('--'))
        .reduce((paramsAccumulator, param) => {
            const [key, value] = param.split('=');
            return { ...paramsAccumulator, [key.slice(2)]: value };
        }, defaultParamsValues);
    return params;
};

(async () => {
    try {
        const { rskNetworkOrHost, atBlock, btcNetworkName } = getCommandLineParsedParams();
        const host = networkParser(rskNetworkOrHost);
        const bridgeStateResult = await getBridgeState(host, atBlock, btcNetworkName);
        /* eslint no-console: "off" */
        console.log(`Bridge state in ${rskNetworkOrHost}`);
        console.log('-----------------------');
        printUtxosInformation(bridgeStateResult.activeFederationUtxos);
        printPegoutRequestsInformation(bridgeStateResult.pegoutRequests);
        console.log(`Peg-outs waiting for confirmations  (${bridgeStateResult.pegoutsWaitingForConfirmations.length})`);
        console.log(bridgeStateResult.pegoutsWaitingForConfirmations);
        console.log(`Peg-outs waiting for signatures (${bridgeStateResult.pegoutsWaitingForSignatures.length})`);
        console.log(bridgeStateResult.pegoutsWaitingForSignatures);
        console.log(`Next Pegout Creation Block Number: ${bridgeStateResult.nextPegoutCreationBlockNumber}`);
    } catch (e) {
        console.log(e);
    }
})();
