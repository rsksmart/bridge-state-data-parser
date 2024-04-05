const bitcoin = require('bitcoinjs-lib');
const networkParser = require('./network');
const { getBridgeState } = require('../index');

const getNetwork = network => (network === 'mainnet' ? bitcoin.networks.bitcoin : bitcoin.networks.testnet);

const stripHexPrefix = str => (typeof str === 'string' && str.startsWith('0x') ? str.slice(2) : str);

const btcAddressFromPublicKeyHash = (pubKeyHash, network) =>
    bitcoin.payments.p2pkh({
        hash: Buffer.from(stripHexPrefix(pubKeyHash), 'hex'),
        network: getNetwork(network)
    }).address;

/* eslint no-param-reassign: "off" */
const formatBtcDestinationAddressToBase58 = (pegoutRequests, network) =>
    pegoutRequests.map(pegout => {
        pegout.destinationAddressBase58 = btcAddressFromPublicKeyHash(pegout.destinationAddressHash160, network);
        return pegout;
    });

(async () => {
    try {
        const host = networkParser(process.argv[2]);
        const bridgeStateResult = await getBridgeState(host);
        /* eslint no-console: "off" */
        console.log('Bridge state');
        console.log('-------------');
        console.log(`Active federation UTXOs (${bridgeStateResult.activeFederationUtxos.length})`);
        console.log(bridgeStateResult.activeFederationUtxos);
        console.log(`Peg-out requests (${bridgeStateResult.pegoutRequests.length})`);
        console.log(formatBtcDestinationAddressToBase58(bridgeStateResult.pegoutRequests, process.argv[2]));
        console.log(`Peg-outs waiting for confirmations  (${bridgeStateResult.pegoutsWaitingForConfirmations.length})`);
        console.log(bridgeStateResult.pegoutsWaitingForConfirmations);
        console.log(`Peg-outs waiting for signatures (${bridgeStateResult.pegoutsWaitingForSignatures.length})`);
        console.log(bridgeStateResult.pegoutsWaitingForSignatures);
        console.log(`Next Pegout Creation Block Number: ${bridgeStateResult.nextPegoutCreationBlockNumber}`);
    } catch (e) {
        console.log(e);
    }
})();
