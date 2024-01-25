const Bridge = require('@rsksmart/rsk-precompiled-abis').bridge;
const ethUtils = require('ethereumjs-util');
const web3abi = require('web3-eth-abi');

const RLP = ethUtils.rlp;

const activeFederationUtxosParser = require('./active-federation-utxos').parseRLPToActiveFederationUtxos;
const pegoutWaitingSignaturesParser = require('./pegout-waiting-signature').parseRLPToPegoutWaitingSignatures;
const pegoutRequestsParser = require('./pegout-request').parseRLPToPegoutRequests;
const pegoutWaitingConfirmationsParser = require('./pegout-waiting-confirmation').parseRLPToPegoutWaitingConfirmations;
const nextPegoutCreationBlockNumberParser =
    require('./next-pegout-creation-block-number').parseRLPToNextPegoutCreationBlockNumber;

const GET_STATE_FOR_DEBUGGING_METHOD_NAME = 'getStateForDebugging';

let requestId = 0;

async function call(host, rpcMethod, rpcParams = []) {
    const body = {
        jsonrpc: '2.0',
        id: `bridge-state-data-parser-${requestId++}`,
        method: rpcMethod,
        params: rpcParams
    };

    const response = await fetch(host, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    try {
        const data = await response.json();

        if ('error' in data) {
            return null;
        }

        return data.result;
    } catch (e) {
        return null;
    }
}

async function getStateForDebugging(host, blockToSearch) {
    const getMethodABI = Bridge.abi.find(m => m.name === GET_STATE_FOR_DEBUGGING_METHOD_NAME);
    const outputType = getMethodABI.outputs[0].type;
    const getMethodEncodedCall = web3abi.encodeFunctionCall(getMethodABI);
    const callArguments = {
        data: getMethodEncodedCall,
        to: '0x0000000000000000000000000000000001000006',
        from: '0x0000000000000000000000000000000000000000'
    };
    const callToBridge = await call(host, 'eth_call', [callArguments, blockToSearch]);
    if (!callToBridge) {
        return null;
    }
    const decodedCallToBridge = web3abi.decodeParameter(outputType, callToBridge);
    return decodedCallToBridge;
}

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

module.exports.getBridgeState = async (host, blockToSearch = 'latest') => {
    const bridgeStateEncoded = await getStateForDebugging(host, blockToSearch);
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
