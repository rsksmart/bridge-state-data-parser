const { RLP } = require('@ethereumjs/rlp');
const { toHex } = require('./utils');

class Utxo {
    constructor(btcTxHash, btcTxOutputIndex, valueInSatoshis) {
        this.btcTxHash = btcTxHash;
        this.btcTxOutputIndex = btcTxOutputIndex;
        this.valueInSatoshis = valueInSatoshis;
    }
}

const parseRLPToActiveFederationUtxos = rlp => {
    const rlpActiveFederationUtxosList = RLP.decode(rlp);

    const activeFederationUtxos = [];

    const utxoValueHexStartIndex = 0;
    const utxoValueHexLength = 15;

    const btcTxHashStartIndex = 70;
    const btcTxHashLength = 64; // 32 bytes in hex

    const btcTxOutputIndexStartIndex = 134;
    const btcTxOutputIndexLength = 2; // 1 byte in hex

    rlpActiveFederationUtxosList.forEach(utxo => {
        const utxoHex = toHex(utxo);
        const valueBuffer = Buffer.from(
            utxoHex.slice(utxoValueHexStartIndex, utxoValueHexStartIndex + utxoValueHexLength),
            'hex'
        );
        valueBuffer.reverse();
        const valueInSatoshis = parseInt(valueBuffer.toString('hex'), 16);

        const btcTxHash = utxoHex.slice(btcTxHashStartIndex, btcTxHashStartIndex + btcTxHashLength);

        const btcTxOutputIndex = parseInt(
            utxoHex.slice(btcTxOutputIndexStartIndex, btcTxOutputIndexStartIndex + btcTxOutputIndexLength),
            16
        );

        activeFederationUtxos.push(new Utxo(btcTxHash, btcTxOutputIndex, valueInSatoshis));
    });

    return activeFederationUtxos;
};

exports.parseRLPToActiveFederationUtxos = parseRLPToActiveFederationUtxos;
