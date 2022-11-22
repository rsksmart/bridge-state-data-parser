const Web3 = require('web3');
const networkParser = require('./network');
const { getBridgeState } = require('../index');

(async () => {
    try {
        const network = networkParser(process.argv[2]);
        const web3 = new Web3(network);
        const bridgeStateResult = await getBridgeState(web3);
        /* eslint no-console: "off" */
        console.log('Bridge state');
        console.log('-------------');
        console.log(`UTXOs count: ${bridgeStateResult.activeFederationUtxos.length}`);
        console.log(`Active federation UTXOs (${bridgeStateResult.activeFederationUtxos.length})`);
        console.log(bridgeStateResult.activeFederationUtxos);
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
