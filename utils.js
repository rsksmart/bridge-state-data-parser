/**
 * Converts an RSK transaction hash buffer to a hex string.
 * This ensures that leading zeros are preserved in the final hash string.
 *
 * @param {Buffer} rskTxHashBuffer - The RSK transaction hash buffer to convert to hex string (must be exactly 32 bytes)
 * @returns {string} - A hex string of 64 characters (32 bytes)
 * @throws {Error} If the buffer is not exactly 32 bytes
 */
function bufferToRskTxHashHex(rskTxHashBuffer) {
    const buf = Buffer.from(rskTxHashBuffer);
    if (buf.length !== 32) {
        throw new Error(`RSK transaction hash buffer must be exactly 32 bytes, got ${buf.length} bytes`);
    }
    return buf.toString('hex');
}

function bytesToDecimalString(bytes) {
    const buf = Buffer.from(bytes);
    if (buf.length === 0) return '0';
    return BigInt(`0x${buf.toString('hex')}`).toString();
}

function numberToRlpBytes(n) {
    let hex = BigInt(n).toString(16);
    if (hex.length % 2) hex = `0${hex}`;
    return Buffer.from(hex || '0', 'hex');
}

function toHex(bytes) {
    return Buffer.from(bytes).toString('hex');
}

module.exports = {
    bufferToRskTxHashHex,
    bytesToDecimalString,
    numberToRlpBytes,
    toHex
};
