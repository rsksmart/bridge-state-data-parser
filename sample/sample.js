const networkParser = require('./network');
const { getBridgeState } = require('../index');

(async () => {
    try {
        const network = process.argv[2];
        const host = networkParser(network);
        const bridgeStateResult = await getBridgeState(host);
        /* eslint no-console: "off" */
        console.log(`Bridge state in ${network}`);
        console.log('-----------------------');
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
