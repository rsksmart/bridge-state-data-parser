const ethUtils = require('ethereumjs-util');
const RLP = ethUtils.rlp;

class Utxo {
    constructor(btcTxHash, btcTxOutputIndex, valueInSatoshis) {
        this.btcTxHash = btcTxHash;
        this.btcTxOutputIndex = btcTxOutputIndex;
        this.valueInSatoshis = valueInSatoshis;
    }
}

const parseRLPToActiveFederationUtxos = (rlp) => {
    const rlpActiveFederationUtxosList = RLP.decode(rlp);

    let activeFederationUtxos = [];

    rlpActiveFederationUtxosList.forEach(utxo => {
        let valueBuffer = Buffer.from(utxo.toString('hex').substr(0, 15), 'hex');
        valueBuffer.reverse();
        let valueInSatoshis = parseInt(valueBuffer.toString('hex'), 16);

        let btcTxHash = Buffer.from(utxo.toString('hex').substr(70, 64), 'hex').toString('hex');
        let btcTxOutputIndex = parseInt(utxo.toString('hex').substr(134, 2), 16);

        activeFederationUtxos.push(new Utxo(btcTxHash, btcTxOutputIndex, valueInSatoshis));
    })

    return activeFederationUtxos;
};

exports.parseRLPToActiveFederationUtxos = parseRLPToActiveFederationUtxos;
   