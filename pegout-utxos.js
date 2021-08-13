const ethUtils = require('ethereumjs-util');
const RLP = ethUtils.rlp;

class PegoutUtxo {
    constructor(btcTxHash, btcTxOutputIndex, valueInSatoshis) {
        this.btcTxHash = btcTxHash;
        this.btcTxOutputIndex = btcTxOutputIndex;
        this.valueInSatoshis = valueInSatoshis;
    }
}

const parseRLPToPegoutUtxos = (rlp) => {
    const rlpPegoutUtxosList = RLP.decode(rlp[1]);

    let pegoutUtxos = [];

    rlpPegoutUtxosList.forEach(utxo => {
        let valueBuffer = Buffer.from(utxo.toString('hex').substr(0, 15), 'hex');
        valueBuffer.reverse();
        let valueInSatoshis = parseInt(valueBuffer.toString('hex'), 16);

        let btcTxHash = Buffer.from(utxo.toString('hex').substr(70, 64), 'hex').toString('hex');
        let btcTxOutputIndex = parseInt(utxo.toString('hex').substr(134, 2), 16);

        pegoutUtxos.push(new PegoutUtxo(btcTxHash, btcTxOutputIndex, valueInSatoshis));
    })

    return pegoutUtxos;
};

exports.parseRLPToPegoutUtxos = parseRLPToPegoutUtxos;
   