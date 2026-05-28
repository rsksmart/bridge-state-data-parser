const { bufferToRskTxHashHex, bytesToDecimalString, numberToRlpBytes, toHex } = require('../utils');

describe('utils', () => {
    describe('bufferToRskTxHashHex', () => {
        it('should preserve leading zeros in a 32-byte hash', () => {
            // Create a 32-byte hash that starts with 0x00
            const hashWithLeadingZero = Buffer.concat([
                Buffer.from([0x00]),
                Buffer.from('1c78ab4377713abd54a39b6e34a038cf4b6c4b77698b8a7153776aeecb7d00', 'hex')
            ]);

            const result = bufferToRskTxHashHex(hashWithLeadingZero);

            expect(result).to.have.length(64);
            expect(result).to.equal('001c78ab4377713abd54a39b6e34a038cf4b6c4b77698b8a7153776aeecb7d00');
            expect(result.startsWith('00')).to.be.true;
        });

        it('should convert a 32-byte hash without leading zeros', () => {
            // Create a 32-byte hash (64 hex chars) without leading zeros
            const fullHash = Buffer.from('f4651c78ab4377713abd54a39b6e34a038cf4b6c4b77698b8a7153776aeecb7d', 'hex');

            const result = bufferToRskTxHashHex(fullHash);

            expect(result).to.have.length(64);
            expect(result).to.equal('f4651c78ab4377713abd54a39b6e34a038cf4b6c4b77698b8a7153776aeecb7d');
        });

        it('should throw an error if the buffer is shorter than 32 bytes', () => {
            // Create a 20-byte buffer (shorter than 32 bytes)
            const shortBuffer = Buffer.from('cab5925c59a9a413f8d443000abcc5640bdf0675', 'hex');

            expect(() => bufferToRskTxHashHex(shortBuffer)).to.throw(
                Error,
                'RSK transaction hash buffer must be exactly 32 bytes, got 20 bytes'
            );
        });

        it('should throw an error if the buffer is longer than 32 bytes', () => {
            // Create a 33-byte buffer (longer than 32 bytes)
            const longBuffer = Buffer.alloc(33, 0xff);

            expect(() => bufferToRskTxHashHex(longBuffer)).to.throw(
                Error,
                'RSK transaction hash buffer must be exactly 32 bytes, got 33 bytes'
            );
        });
    });

    describe('bytesToDecimalString', () => {
        it('should convert a single-byte value', () => {
            expect(bytesToDecimalString(Buffer.from([0x00]))).to.equal('0');
        });

        it('should convert a multi-byte amount', () => {
            expect(bytesToDecimalString(Buffer.from([0x07, 0xa1, 0x20]))).to.equal('500000');
        });

        it('should convert a multi-Uint8Array amount', () => {
            expect(bytesToDecimalString(new Uint8Array([0x07, 0xa1, 0x20]))).to.equal('500000');
        });
    });

    describe('numberToRlpBytes', () => {
        it('should encode zero as a single zero byte', () => {
            expect(numberToRlpBytes(0)).to.deep.equal(Buffer.from([0x00]));
        });

        it('should encode big number', () => {
            const n = 3873302;
            expect(numberToRlpBytes(n)).to.deep.equal(Buffer.from('3b1a16', 'hex'));
        });

        it('should pad odd-length hex with a leading zero', () => {
            expect(numberToRlpBytes(10)).to.deep.equal(Buffer.from([0x0a]));
        });
    });

    describe('toHex', () => {
        it('should convert a Buffer to hex', () => {
            expect(toHex(Buffer.from('deadbeef', 'hex'))).to.equal('deadbeef');
        });

        it('should convert a Uint8Array to hex', () => {
            expect(toHex(new Uint8Array([0xde, 0xad, 0xbe, 0xef]))).to.equal('deadbeef');
        });

        it('should return an empty string for empty input', () => {
            expect(toHex(Buffer.alloc(0))).to.equal('');
        });
    });
});
