const Bridge = require('@rsksmart/rsk-precompiled-abis').bridge;
const ethUtils = require('ethereumjs-util');
const RLP = ethUtils.rlp;

const pegoutWaitingSignaturesParser = require('./pegout-waiting-signature').parseRLPToPegoutWaitingSignatures;
const pegoutWaitingConfirmationsParser = require('./pegout-waiting-confirmation').parseRLPToPegoutWaitingConfirmations;
const pegoutUtxosParser = require('./pegout-utxos').parseRLPToPegoutUtxos;
const pegoutRequestsParser = require('./pegout-request').parseRLPToPegoutRequests;

class BridgeStatus {
    constructor(waitingSignatures, waitingConfirmations, pegoutUtxos, pegoutRequests) {
        this.waitingSignatures = waitingSignatures;
        this.waitingConfirmations = waitingConfirmations;
        this.utxos = pegoutUtxos;
        this.pegoutRequests = pegoutRequests;
    }
}

module.exports = async (web3) => {
    const bridge = Bridge.build(web3);
    const bridgeStateEncoded = await bridge.methods.getStateForDebugging().call();
    const decodedListOfStates = RLP.decode(bridgeStateEncoded);

    const pegoutWaitingSignatures = pegoutWaitingSignaturesParser(decodedListOfStates[2]);
    const pegoutWaitingConfirmations = pegoutWaitingConfirmationsParser(decodedListOfStates[4]);
    const pegoutUtxos = pegoutUtxosParser(decodedListOfStates[1]);
    const pegoutRequests = pegoutRequestsParser(decodedListOfStates[3]);

    return new BridgeStatus(pegoutWaitingSignatures, pegoutWaitingConfirmations, pegoutUtxos, pegoutRequests)
};
