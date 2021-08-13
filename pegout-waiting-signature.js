const ethUtils = require('ethereumjs-util');
const RLP = ethUtils.rlp;

class PegoutWaitingSignature {
    constructor(rskTxHash, btcTransaction) {
        this.rskTxHash = rskTxHash;
        this.btcTransaction = btcTransaction;
    }
}

const parseRLPToPegoutWaitingSignatures = (rlpData) => {
    const rlpRskTxsWaitingForSignatures = RLP.decode(rlpData[2]);
    let rskTxsWaitingForSignatures = [];
    for (let i = 0; i < rlpRskTxsWaitingForSignatures.length / 2; i++) {
        let rskTxHash = rlpRskTxsWaitingForSignatures[i * 2].toString('hex');
        let btcTransactionSerialized = rlpRskTxsWaitingForSignatures[i * 2 + 1].toString('hex');
        rskTxsWaitingForSignatures.push(new PegoutWaitingSignature(rskTxHash, btcTransactionSerialized));
    }
    return rskTxsWaitingForSignatures;
};

exports.parseRLPToPegoutWaitingSignatures = parseRLPToPegoutWaitingSignatures;
