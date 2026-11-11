const { RLP } = require('@ethereumjs/rlp');
const { toHex } = require('./utils');

class Utxo {
    constructor(btcTxHash, btcTxOutputIndex, valueInSatoshis, height) {
        this.btcTxHash = btcTxHash;
        this.btcTxOutputIndex = btcTxOutputIndex;
        this.valueInSatoshis = valueInSatoshis;
        this.height = height;
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
    const btcTxOutputIndexLength = 8; // 4 bytes in hex, little endian

    // bitcoinj UTXO serialization: value (8) | script length (4) | script (23) | tx hash (32) | index (4) | height (4) | coinbase (1)
    const heightByteOffset = 71;

    rlpActiveFederationUtxosList.forEach(utxo => {
        const utxoHex = toHex(utxo);
        const valueBuffer = Buffer.from(
            utxoHex.slice(utxoValueHexStartIndex, utxoValueHexStartIndex + utxoValueHexLength),
            'hex'
        );
        valueBuffer.reverse();
        const valueInSatoshis = parseInt(valueBuffer.toString('hex'), 16);

        const btcTxHash = utxoHex.slice(btcTxHashStartIndex, btcTxHashStartIndex + btcTxHashLength);

        const btcTxOutputIndex = Buffer.from(
            utxoHex.slice(btcTxOutputIndexStartIndex, btcTxOutputIndexStartIndex + btcTxOutputIndexLength),
            'hex'
        ).readUInt32LE(0);

        const height = Buffer.from(utxo).readUInt32LE(heightByteOffset);

        activeFederationUtxos.push(new Utxo(btcTxHash, btcTxOutputIndex, valueInSatoshis, height));
    });

    return activeFederationUtxos;
};

exports.parseRLPToActiveFederationUtxos = parseRLPToActiveFederationUtxos;
