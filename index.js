const Bridge = require('@rsksmart/rsk-precompiled-abis').bridge;
const { RLP } = require('@ethereumjs/rlp');
const { Interface } = require('ethers');

const BridgeState = require('./bridge-state');
const { parseRLPToPegoutRequests } = require('./pegout-request');
const { parseRLPToActiveFederationUtxos } = require('./active-federation-utxos');
const { parseRLPToPegoutWaitingSignatures } = require('./pegout-waiting-signature');
const { parseRLPToPegoutWaitingConfirmations } = require('./pegout-waiting-confirmation');
const { parseRLPToNextPegoutCreationBlockNumber } = require('./next-pegout-creation-block-number');

const GET_STATE_FOR_DEBUGGING_METHOD_NAME = 'getStateForDebugging';
const bridgeInterface = new Interface(Bridge.abi);

let requestId = 0;

const call = async (host, rpcMethod, rpcParams = []) => {
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
};

const getStateForDebugging = async (host, blockToSearch) => {
    const getMethodEncodedCall = bridgeInterface.encodeFunctionData(GET_STATE_FOR_DEBUGGING_METHOD_NAME);
    const callArguments = {
        data: getMethodEncodedCall,
        to: '0x0000000000000000000000000000000001000006',
        from: '0x0000000000000000000000000000000000000000'
    };
    const callToBridge = await call(host, 'eth_call', [callArguments, blockToSearch]);
    if (!callToBridge) {
        return null;
    }
    return bridgeInterface.decodeFunctionResult(GET_STATE_FOR_DEBUGGING_METHOD_NAME, callToBridge)[0];
};

const getLatestBlockNumber = async host => {
    const block = await call(host, 'eth_getBlockByNumber', ['latest', false]);
    return block ? parseInt(block.number, 16) : null;
};

const getBridgeState = async (host, blockToSearch = 'latest') => {
    const bridgeStateEncoded = await getStateForDebugging(host, blockToSearch);
    const decodedListOfStates = RLP.decode(bridgeStateEncoded);

    const activeFederationUtxos = parseRLPToActiveFederationUtxos(decodedListOfStates[1]);
    const pegoutWaitingSignatures = parseRLPToPegoutWaitingSignatures(decodedListOfStates[2]);
    const pegoutRequests = parseRLPToPegoutRequests(decodedListOfStates[3]);
    const pegoutWaitingConfirmations = parseRLPToPegoutWaitingConfirmations(decodedListOfStates[4]);
    const nextPegoutCreationBlockNumber = parseRLPToNextPegoutCreationBlockNumber(decodedListOfStates[5]);

    return new BridgeState(
        activeFederationUtxos,
        pegoutRequests,
        pegoutWaitingConfirmations,
        pegoutWaitingSignatures,
        nextPegoutCreationBlockNumber
    );
};

module.exports = {
    parseRLPToActiveFederationUtxos,
    parseRLPToPegoutWaitingSignatures,
    parseRLPToPegoutRequests,
    parseRLPToPegoutWaitingConfirmations,
    parseRLPToNextPegoutCreationBlockNumber,
    getLatestBlockNumber,
    getBridgeState
};
