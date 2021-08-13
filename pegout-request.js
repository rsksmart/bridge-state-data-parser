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
    const rlpPegoutRequests = RLP.decode(rlp[3]);
    let pegoutRequests = [];

    for (let i = 0; i < rlpPegoutRequests.length / 3; i++) {
        let destinationAddressHash160 = new BN(rlpPegoutRequests[i]).toString('hex');
        let valueBuffer = Buffer.from(rlpPegoutRequests[i * 3 + 1].toString('hex'), 'hex');
        valueBuffer.reverse();
        let amountInSatoshis = parseInt(valueBuffer.toString('hex'));
        let rskTxHash = new BN(rlpPegoutRequests[i * 3 + 2]).toString();

        pegoutRequests.push(new PegoutRequest(destinationAddressHash160, amountInSatoshis, rskTxHash));
    }

    return pegoutRequests;
};

exports.parseRLPToPegoutRequests = parseRLPToPegoutRequests;
