const Web3 = require('web3');
const networkParser = require('./network');
const bridgeStatus = require('../index');

(async () => {
    try {
        const network = networkParser(process.argv[2]);
        const web3 = new Web3(network);
        const bridgeStatusResult = await bridgeStatus(web3);
        /* eslint no-console: "off" */
        console.log("Bridge status");
        console.log("-------------");
        console.log(`Active federation UTXOs (${bridgeStatusResult.activeFederationUtxos.length})`);
        console.log(bridgeStatusResult.activeFederationUtxos);
        console.log(`Peg-out requests (${bridgeStatusResult.pegoutRequests.length})`);
        console.log(bridgeStatusResult.pegoutRequests);
        console.log(`Peg-outs waiting for confirmations  (${bridgeStatusResult.pegoutsWaitingForConfirmations.length})`);
        console.log(bridgeStatusResult.pegoutsWaitingForConfirmations);
        console.log(`Peg-outs waiting for signatures (${bridgeStatusResult.pegoutsWaitingForSignatures.length})`);
        console.log(bridgeStatusResult.pegoutsWaitingForSignatures);
    } catch (e) {
        console.log(e);
    }
})();
