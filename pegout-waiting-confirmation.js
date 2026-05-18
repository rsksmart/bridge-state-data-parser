const { RLP } = require('@ethereumjs/rlp');
const { bytesToDecimalString, bufferToRskTxHashHex, toHex } = require('./utils');

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
        const btcRawTx = toHex(rlpReleaseTransactionSet[i * 3]);
        const rskBlockNumber = bytesToDecimalString(rlpReleaseTransactionSet[i * 3 + 1]);
        const rskTxHashBuffer = rlpReleaseTransactionSet[i * 3 + 2];
        const rskTxHash = bufferToRskTxHashHex(rskTxHashBuffer);
        releaseTransactionSet.push(new PegoutWaitingConfirmation(btcRawTx, rskBlockNumber, rskTxHash));
    }
    return releaseTransactionSet;
};

exports.parseRLPToPegoutWaitingConfirmations = parseRLPToPegoutWaitingConfirmations;
