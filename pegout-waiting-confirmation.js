const ethUtils = require('ethereumjs-util');
const RLP = ethUtils.rlp;
const BN = ethUtils.BN;

class PegoutWaitingConfirmation {
    constructor(btcTxHash, pegoutCreationBlockNumber, rskTxHash) {
        this.btcTxHash = btcTxHash;
        this.pegoutCreationBlockNumber = pegoutCreationBlockNumber;
        this.rskTxHash = rskTxHash;
    }
}

const parseRLPToPegoutWaitingConfirmations = (rlp) => {
    let rlpReleaseTransactionSet = RLP.decode(rlp[4]);
    let releaseTransactionSet = [];
    for (let i = 0; i < rlpReleaseTransactionSet.length / 3; i++) {
        let btcTxHash = rlpReleaseTransactionSet[i * 3].toString('hex');
        let rskBlockNumber = new BN(rlpReleaseTransactionSet[i * 3 + 1]).toString();
        let rskTxHash = new BN(rlpReleaseTransactionSet[i * 3 + 2]).toString();
        releaseTransactionSet.push(new PegoutWaitingConfirmation(btcTxHash, rskBlockNumber, rskTxHash));
    }
    return releaseTransactionSet
};

exports.parseRLPToPegoutWaitingConfirmations = parseRLPToPegoutWaitingConfirmations;
