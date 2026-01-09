/**
 * Converts an RSK transaction hash buffer to a hex string.
 * This ensures that leading zeros are preserved in the final hash string.
 *
 * @param {Buffer} rskTxHashBuffer - The RSK transaction hash buffer to convert to hex string (must be exactly 32 bytes)
 * @returns {string} - A hex string of 64 characters (32 bytes)
 * @throws {Error} If the buffer is not exactly 32 bytes
 */
function bufferToRskTxHashHex(rskTxHashBuffer) {
    if (rskTxHashBuffer.length !== 32) {
        throw new Error(`RSK transaction hash buffer must be exactly 32 bytes, got ${rskTxHashBuffer.length} bytes`);
    }
    return rskTxHashBuffer.toString('hex');
}

module.exports = {
    bufferToRskTxHashHex
};
