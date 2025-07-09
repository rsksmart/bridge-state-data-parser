const ethUtils = require('ethereumjs-util');

const RLP = ethUtils.rlp;
const { BN } = ethUtils;

class PegoutRequest {
    constructor(btcDestinationAddress, amountInSatoshis, rskTxHash) {
        this.btcDestinationAddress = btcDestinationAddress;
        this.amountInSatoshis = amountInSatoshis;
        this.rskTxHash = rskTxHash;
    }
}

function validatePegoutRequestBufferFields(btcDestinationAddressBuffer, amountInSatoshisBuffer, rskTxHashBuffer) {
    return btcDestinationAddressBuffer.length === 20 && rskTxHashBuffer.length === 32;
}

const parseRLPToPegoutRequests = rlp => {
    const rlpPegoutRequests = RLP.decode(rlp);
    const pegoutRequests = [];

    if (rlpPegoutRequests.length % 3 !== 0) return pegoutRequests;

    for (let i = 0; i < rlpPegoutRequests.length / 3; i++) {
        const btcDestinationAddressBuffer = rlpPegoutRequests[i * 3];
        const amountInSatoshisBuffer = rlpPegoutRequests[i * 3 + 1];
        const rskTxHashBuffer = rlpPegoutRequests[i * 3 + 2];

        if (!validatePegoutRequestBufferFields(btcDestinationAddressBuffer, amountInSatoshisBuffer, rskTxHashBuffer)) {
            return pegoutRequests;
        }

        const btcDestinationAddress = Buffer.from(btcDestinationAddressBuffer, 'hex').toString('hex');
        const amountInSatoshis = new BN(amountInSatoshisBuffer).toString();
        const rskTxHash = Buffer.from(rskTxHashBuffer, 'hex').toString('hex');

        pegoutRequests.push(new PegoutRequest(btcDestinationAddress, amountInSatoshis, rskTxHash));
    }

    return pegoutRequests;
};

exports.parseRLPToPegoutRequests = parseRLPToPegoutRequests;
