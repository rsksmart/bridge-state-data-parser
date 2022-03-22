const ethUtils = require('ethereumjs-util');

const RLP = ethUtils.rlp;

class PegoutWaitingSignature {
    constructor(rskTxHash, btcRawTx) {
        this.rskTxHash = rskTxHash;
        this.btcRawTx = btcRawTx;
    }
}

function validatePegoutWaitingSignatureBufferFields(rskTxHashBuffer, amountInSatoshisBuffer) {
    return rskTxHashBuffer.length === 32 && amountInSatoshisBuffer !== undefined;
}

const parseRLPToPegoutWaitingSignatures = rlpData => {
    const rlpRskTxsWaitingForSignatures = RLP.decode(rlpData);
    const rskTxsWaitingForSignatures = [];

    if (rlpRskTxsWaitingForSignatures.length % 2 !== 0) return rskTxsWaitingForSignatures;

    for (let i = 0; i < rlpRskTxsWaitingForSignatures.length / 2; i++) {
        const rskTxHashBuffer = rlpRskTxsWaitingForSignatures[i * 2];
        const btcRawTxBuffer = rlpRskTxsWaitingForSignatures[i * 2 + 1];
        if (!validatePegoutWaitingSignatureBufferFields(rskTxHashBuffer, btcRawTxBuffer)) {
            return rskTxsWaitingForSignatures;
        }

        const rskTxHash = rskTxHashBuffer.toString('hex');
        const btcTransactionSerialized = btcRawTxBuffer.toString('hex');

        rskTxsWaitingForSignatures.push(new PegoutWaitingSignature(rskTxHash, btcTransactionSerialized));
    }
    return rskTxsWaitingForSignatures;
};

exports.parseRLPToPegoutWaitingSignatures = parseRLPToPegoutWaitingSignatures;
