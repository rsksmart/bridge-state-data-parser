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

    // bitcoinj UTXO serialization:
    // value (8) | script length (4, LE) | script (variable) | tx hash (32) | index (4, LE) | height (4, LE) | coinbase (1)
    const scriptLengthByteOffset = 8;
    const scriptByteOffset = 12;
    const btcTxHashByteLength = 32;
    const btcTxOutputIndexByteLength = 4;

    rlpActiveFederationUtxosList.forEach(utxo => {
        const utxoBuffer = Buffer.from(utxo);
        const utxoHex = toHex(utxo);
        const valueBuffer = Buffer.from(
            utxoHex.slice(utxoValueHexStartIndex, utxoValueHexStartIndex + utxoValueHexLength),
            'hex'
        );
        valueBuffer.reverse();
        const valueInSatoshis = parseInt(valueBuffer.toString('hex'), 16);

        const scriptLength = utxoBuffer.readUInt32LE(scriptLengthByteOffset);
        const btcTxHashByteOffset = scriptByteOffset + scriptLength;
        const btcTxOutputIndexByteOffset = btcTxHashByteOffset + btcTxHashByteLength;
        const heightByteOffset = btcTxOutputIndexByteOffset + btcTxOutputIndexByteLength;

        const btcTxHash = utxoBuffer
            .subarray(btcTxHashByteOffset, btcTxHashByteOffset + btcTxHashByteLength)
            .toString('hex');

        const btcTxOutputIndex = utxoBuffer.readUInt32LE(btcTxOutputIndexByteOffset);

        const height = utxoBuffer.readUInt32LE(heightByteOffset);

        activeFederationUtxos.push(new Utxo(btcTxHash, btcTxOutputIndex, valueInSatoshis, height));
    });

    return activeFederationUtxos;
};

exports.parseRLPToActiveFederationUtxos = parseRLPToActiveFederationUtxos;
