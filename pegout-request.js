const ethUtils = require('ethereumjs-util');

const RLP = ethUtils.rlp;
const { BN } = ethUtils;
const { bufferToRskTxHashHex } = require('./hash-utils');

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

    if (rlpPegoutRequests.length % 3 !== 0) return pegoutRequests;

    for (let i = 0; i < rlpPegoutRequests.length / 3; i++) {
        const destinationAddressHash160Buffer = rlpPegoutRequests[i * 3];
        const amountInSatoshisBuffer = rlpPegoutRequests[i * 3 + 1];
        const rskTxHashBuffer = rlpPegoutRequests[i * 3 + 2];

        if (destinationAddressHash160Buffer.length !== 20) {
            throw new Error(`Destination address hash160 buffer must be exactly 20 bytes, got ${destinationAddressHash160Buffer.length} bytes`);
        }

        const destinationAddressHash160 = Buffer.from(destinationAddressHash160Buffer, 'hex').toString('hex');
        const amountInSatoshis = new BN(amountInSatoshisBuffer).toString();
        const rskTxHash = bufferToRskTxHashHex(rskTxHashBuffer);

        pegoutRequests.push(new PegoutRequest(destinationAddressHash160, amountInSatoshis, rskTxHash));
    }

    return pegoutRequests;
};

exports.parseRLPToPegoutRequests = parseRLPToPegoutRequests;
