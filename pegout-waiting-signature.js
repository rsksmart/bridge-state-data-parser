const ethUtils = require("ethereumjs-util");
const RLP = ethUtils.rlp;

class PegoutWaitingSignature {
  constructor(rskTxHash, btcRawTx) {
    this.rskTxHash = rskTxHash;
    this.btcRawTx = btcRawTx;
  }
}

const parseRLPToPegoutWaitingSignatures = (rlpData) => {
  const rlpRskTxsWaitingForSignatures = RLP.decode(rlpData);
  const rskTxsWaitingForSignatures = [];
  for (let i = 0; i < rlpRskTxsWaitingForSignatures.length / 2; i++) {
    const rskTxHash = rlpRskTxsWaitingForSignatures[i * 2].toString("hex");
    const btcTransactionSerialized =
      rlpRskTxsWaitingForSignatures[i * 2 + 1].toString("hex");
    rskTxsWaitingForSignatures.push(
      new PegoutWaitingSignature(rskTxHash, btcTransactionSerialized)
    );
  }
  return rskTxsWaitingForSignatures;
};

exports.parseRLPToPegoutWaitingSignatures = parseRLPToPegoutWaitingSignatures;
