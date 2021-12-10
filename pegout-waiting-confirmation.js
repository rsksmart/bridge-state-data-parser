const ethUtils = require("ethereumjs-util");

const RLP = ethUtils.rlp;
const { BN } = ethUtils;

class PegoutWaitingConfirmation {
  constructor(btcRawTx, pegoutCreationBlockNumber, rskTxHash) {
    this.btcRawTx = btcRawTx;
    this.pegoutCreationBlockNumber = pegoutCreationBlockNumber;
    this.rskTxHash = rskTxHash;
  }
}

const parseRLPToPegoutWaitingConfirmations = (rlp) => {
  const rlpReleaseTransactionSet = RLP.decode(rlp);
  const releaseTransactionSet = [];
  for (let i = 0; i < rlpReleaseTransactionSet.length / 3; i++) {
    const btcRawTx = rlpReleaseTransactionSet[i * 3].toString("hex");
    const rskBlockNumber = new BN(
      rlpReleaseTransactionSet[i * 3 + 1]
    ).toString();
    const rskTxHash = new BN(rlpReleaseTransactionSet[i * 3 + 2]).toString(
      "hex"
    );
    releaseTransactionSet.push(
      new PegoutWaitingConfirmation(btcRawTx, rskBlockNumber, rskTxHash)
    );
  }
  return releaseTransactionSet;
};

exports.parseRLPToPegoutWaitingConfirmations =
  parseRLPToPegoutWaitingConfirmations;
