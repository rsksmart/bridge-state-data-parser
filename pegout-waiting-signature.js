const ethUtils = require('ethereumjs-util');
const RLP = ethUtils.rlp;

class PegoutWaitingSignature {
    constructor(rskTxHash, btcRawTx) {
        this.rskTxHash = rskTxHash;
        this.btcRawTx = btcRawTx;
    }
}

const parseRLPToPegoutWaitingSignatures = (rlpData) => {
    const rlpRskTxsWaitingForSignatures = RLP.decode(rlpData);
    let rskTxsWaitingForSignatures = [];
    for (let i = 0; i < rlpRskTxsWaitingForSignatures.length / 2; i++) {
        let rskTxHash = rlpRskTxsWaitingForSignatures[i * 2].toString('hex');
        let btcTransactionSerialized = rlpRskTxsWaitingForSignatures[i * 2 + 1].toString('hex');
        rskTxsWaitingForSignatures.push(new PegoutWaitingSignature(rskTxHash, btcTransactionSerialized));
    }
    return rskTxsWaitingForSignatures;
};

exports.parseRLPToPegoutWaitingSignatures = parseRLPToPegoutWaitingSignatures;
