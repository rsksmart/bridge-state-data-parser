const ethUtils = require('ethereumjs-util');
const bitcoinJsLib = require('bitcoinjs-lib');
const { getBitcoinNetwork } = require('./utils');

const RLP = ethUtils.rlp;
const { BN } = ethUtils;

class PegoutRequest {
    constructor(btcDestinationAddress, amountInSatoshis, rskTxHash) {
        this.btcDestinationAddress = btcDestinationAddress;
        this.amountInSatoshis = amountInSatoshis;
        this.rskTxHash = rskTxHash;
    }
}

function validatePegoutRequestBufferFields(btcDestinationAddressBuffer, rskTxHashBuffer) {
    return btcDestinationAddressBuffer.length === 20 && rskTxHashBuffer.length === 32;
}

const getBtcDestinationAddress = (btcDestinationAddressHash160Buffer, btcNetworkName) => {
    if (btcNetworkName) {
        const { address: btcDestinationAddress } = bitcoinJsLib.payments.p2pkh({
            hash: btcDestinationAddressHash160Buffer,
            network: getBitcoinNetwork(btcNetworkName)
        });
        return btcDestinationAddress;
    }
    return btcDestinationAddressHash160Buffer.toString('hex');
};

const parseRLPToPegoutRequests = (rlp, btcNetworkName) => {
    const rlpPegoutRequests = RLP.decode(rlp);
    const pegoutRequests = [];

    if (rlpPegoutRequests.length % 3 !== 0) return pegoutRequests;

    for (let i = 0; i < rlpPegoutRequests.length / 3; i++) {
        const btcDestinationAddressHash160Buffer = rlpPegoutRequests[i * 3];
        const amountInSatoshisBuffer = rlpPegoutRequests[i * 3 + 1];
        const rskTxHashBuffer = rlpPegoutRequests[i * 3 + 2];

        if (!validatePegoutRequestBufferFields(btcDestinationAddressHash160Buffer, rskTxHashBuffer)) {
            return pegoutRequests;
        }

        const btcDestinationAddress = getBtcDestinationAddress(btcDestinationAddressHash160Buffer, btcNetworkName);
        const amountInSatoshis = new BN(amountInSatoshisBuffer).toString();
        const rskTxHash = Buffer.from(rskTxHashBuffer, 'hex').toString('hex');

        pegoutRequests.push(new PegoutRequest(btcDestinationAddress, amountInSatoshis, rskTxHash));
    }

    return pegoutRequests;
};

exports.parseRLPToPegoutRequests = parseRLPToPegoutRequests;
