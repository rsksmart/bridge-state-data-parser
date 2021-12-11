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

const parseRLPToPegoutRequests = rlp => {
    const rlpPegoutRequests = RLP.decode(rlp);
    const pegoutRequests = [];

    for (let i = 0; i < rlpPegoutRequests.length / 3; i++) {
        const destinationAddressHash160 = Buffer.from(rlpPegoutRequests[i * 3], 'hex').toString('hex');
        const amountInSatoshis = new BN(rlpPegoutRequests[i * 3 + 1]).toString();
        const rskTxHash = Buffer.from(rlpPegoutRequests[i * 3 + 2], 'hex').toString('hex');

        pegoutRequests.push(new PegoutRequest(destinationAddressHash160, amountInSatoshis, rskTxHash));
    }

    return pegoutRequests;
};

exports.parseRLPToPegoutRequests = parseRLPToPegoutRequests;
