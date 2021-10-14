const ethUtils = require('ethereumjs-util');
const RLP = ethUtils.rlp;
const BN = ethUtils.BN;

class PegoutRequest {
    constructor(destinationAddressHash160, amountInSatoshis, rskTxHash) {
        this.destinationAddressHash160 = destinationAddressHash160;
        this.amountInSatoshis = amountInSatoshis;
        this.rskTxHash = rskTxHash;
    }
}

const parseRLPToPegoutRequests = (rlp) => {
    const rlpPegoutRequests = RLP.decode(rlp);
    let pegoutRequests = [];

    for (let i = 0; i < rlpPegoutRequests.length / 3; i++) {
        let destinationAddressHash160 = Buffer.from(rlpPegoutRequests[i * 3], 'hex').toString('hex');
        let valueBuffer = new BN(rlpPegoutRequests[i * 3 + 1]).toString();
        let amountInSatoshis = valueBuffer;
        let rskTxHash = Buffer.from(rlpPegoutRequests[i * 3 + 2], 'hex').toString('hex');

        pegoutRequests.push(new PegoutRequest(destinationAddressHash160, amountInSatoshis, rskTxHash));
    }

    return pegoutRequests;
};

exports.parseRLPToPegoutRequests = parseRLPToPegoutRequests;
