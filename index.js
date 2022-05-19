const Bridge = require('@rsksmart/rsk-precompiled-abis').bridge;
const ethUtils = require('ethereumjs-util');

const RLP = ethUtils.rlp;

const activeFederationUtxosParser = require('./active-federation-utxos').parseRLPToActiveFederationUtxos;
const pegoutWaitingSignaturesParser = require('./pegout-waiting-signature').parseRLPToPegoutWaitingSignatures;
const pegoutRequestsParser = require('./pegout-request').parseRLPToPegoutRequests;
const pegoutWaitingConfirmationsParser = require('./pegout-waiting-confirmation').parseRLPToPegoutWaitingConfirmations;
const nextPegoutCreationBlockNumberParser =
    require('./next-pegout-creation-block-number').parseRLPToNextPegoutCreationBlockNumber;

class BridgeState {
    constructor(
        activeFederationUtxos,
        pegoutRequests,
        waitingConfirmations,
        waitingSignatures,
        nextPegoutCreationBlockNumber
    ) {
        this.activeFederationUtxos = activeFederationUtxos;
        this.pegoutRequests = pegoutRequests;
        this.pegoutsWaitingForConfirmations = waitingConfirmations;
        this.pegoutsWaitingForSignatures = waitingSignatures;
        this.nextPegoutCreationBlockNumber = nextPegoutCreationBlockNumber;
    }
}

module.exports.getBridgeState = async web3 => {
    const bridge = Bridge.build(web3);
    const bridgeStateEncoded = await bridge.methods.getStateForDebugging().call();
    const decodedListOfStates = RLP.decode(bridgeStateEncoded);

    const activeFederationUtxos = activeFederationUtxosParser(decodedListOfStates[1]);
    const pegoutWaitingSignatures = pegoutWaitingSignaturesParser(decodedListOfStates[2]);
    const pegoutRequests = pegoutRequestsParser(decodedListOfStates[3]);
    const pegoutWaitingConfirmations = pegoutWaitingConfirmationsParser(decodedListOfStates[4]);
    const nextPegoutCreationBlockNumber = nextPegoutCreationBlockNumberParser(decodedListOfStates[5]);

    return new BridgeState(
        activeFederationUtxos,
        pegoutRequests,
        pegoutWaitingConfirmations,
        pegoutWaitingSignatures,
        nextPegoutCreationBlockNumber
    );
};
