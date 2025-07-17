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

module.exports = BridgeState;
