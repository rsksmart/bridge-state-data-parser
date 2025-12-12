const ethUtils = require('ethereumjs-util');

const RLP = ethUtils.rlp;
const { BN } = ethUtils;
const { bufferToRskTxHashHex } = require('./hash-utils');

class PegoutWaitingConfirmation {
    constructor(btcRawTx, pegoutCreationBlockNumber, rskTxHash) {
        this.btcRawTx = btcRawTx;
        this.pegoutCreationBlockNumber = pegoutCreationBlockNumber;
        this.rskTxHash = rskTxHash;
    }
}

const parseRLPToPegoutWaitingConfirmations = rlp => {
    const rlpReleaseTransactionSet = RLP.decode(rlp);
    const releaseTransactionSet = [];
    for (let i = 0; i < rlpReleaseTransactionSet.length / 3; i++) {
        const btcRawTx = rlpReleaseTransactionSet[i * 3].toString('hex');
        const rskBlockNumber = new BN(rlpReleaseTransactionSet[i * 3 + 1]).toString();
        const rskTxHashBuffer = rlpReleaseTransactionSet[i * 3 + 2];
        const rskTxHash = bufferToRskTxHashHex(rskTxHashBuffer);
        releaseTransactionSet.push(new PegoutWaitingConfirmation(btcRawTx, rskBlockNumber, rskTxHash));
    }
    return releaseTransactionSet;
};

exports.parseRLPToPegoutWaitingConfirmations = parseRLPToPegoutWaitingConfirmations;
