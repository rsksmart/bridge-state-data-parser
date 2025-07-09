const ethUtils = require('ethereumjs-util');

const RLP = ethUtils.rlp;
const { BN } = ethUtils;

class PegoutRequest {
    constructor(destinationAddressHash160, amountInSatoshis, rskTxHash) {
        this.destinationAddressHash160 = destinationAddressHash160;
        this.amountInSatoshis = amountInSatoshis;
        this.rskTxHash = rskTxHash;
    }
}

function validatePegoutRequestBufferFields(destinationAddressHash160Buffer, amountInSatoshisBuffer, rskTxHashBuffer) {
    return destinationAddressHash160Buffer.length === 20 && rskTxHashBuffer.length === 32;
}

const parseRLPToPegoutRequests = rlp => {
    const rlpPegoutRequests = RLP.decode(rlp);
    const pegoutRequests = [];

    if (rlpPegoutRequests.length % 3 !== 0) return pegoutRequests;

    for (let i = 0; i < rlpPegoutRequests.length / 3; i++) {
        const destinationAddressHash160Buffer = rlpPegoutRequests[i * 3];
        const amountInSatoshisBuffer = rlpPegoutRequests[i * 3 + 1];
        const rskTxHashBuffer = rlpPegoutRequests[i * 3 + 2];

        if (
            !validatePegoutRequestBufferFields(destinationAddressHash160Buffer, amountInSatoshisBuffer, rskTxHashBuffer)
        ) {
            return pegoutRequests;
        }

        const destinationAddressHash160 = Buffer.from(destinationAddressHash160Buffer, 'hex').toString('hex');
        const amountInSatoshis = new BN(amountInSatoshisBuffer).toString();
        const rskTxHash = Buffer.from(rskTxHashBuffer, 'hex').toString('hex');

        pegoutRequests.push(new PegoutRequest(destinationAddressHash160, amountInSatoshis, rskTxHash));
    }

    return pegoutRequests;
};

exports.parseRLPToPegoutRequests = parseRLPToPegoutRequests;
