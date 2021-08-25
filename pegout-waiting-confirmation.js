const ethUtils = require('ethereumjs-util');
const RLP = ethUtils.rlp;
const BN = ethUtils.BN;

class PegoutWaitingConfirmation {
    constructor(btcRawTx, pegoutCreationBlockNumber, rskTxHash) {
        this.btcRawTx = btcRawTx;
        this.pegoutCreationBlockNumber = pegoutCreationBlockNumber;
        this.rskTxHash = rskTxHash;
    }
}

const parseRLPToPegoutWaitingConfirmations = (rlp) => {
    let rlpReleaseTransactionSet = RLP.decode(rlp);
    let releaseTransactionSet = [];
    for (let i = 0; i < rlpReleaseTransactionSet.length / 3; i++) {
        let btcRawTx = rlpReleaseTransactionSet[i * 3].toString('hex');
        let rskBlockNumber = new BN(rlpReleaseTransactionSet[i * 3 + 1]).toString();
        let rskTxHash = new BN(rlpReleaseTransactionSet[i * 3 + 2]).toString();
        releaseTransactionSet.push(new PegoutWaitingConfirmation(btcRawTx, rskBlockNumber, rskTxHash));
    }
    return releaseTransactionSet
};

exports.parseRLPToPegoutWaitingConfirmations = parseRLPToPegoutWaitingConfirmations;
