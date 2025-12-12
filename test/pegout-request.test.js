const { expect } = require('chai');

const ethUtils = require('ethereumjs-util');

const RLP = ethUtils.rlp;
const pegoutRequestsParser = require('../pegout-request').parseRLPToPegoutRequests;

const {
    encodedPegoutRequest,
    decodedPegoutRequest,
    encodedInvalidPegoutRequestDataLength,
    encodedInvalidPegoutRequestFieldsLength
} = require('./resources/pegout-request-test-data');

describe('Pegout request parser', () => {
    it('should return an empty array when provided null', () => {
        const result = pegoutRequestsParser(null);
        expect(Array.isArray(result)).to.be.true;
        expect(result.length).to.equal(0);
    });

    it('should return an empty array when provided an empty Buffer', () => {
        const result = pegoutRequestsParser(Buffer.from(''));
        expect(Array.isArray(result)).to.be.true;
        expect(result.length).to.equal(0);
    });

    it('should return an empty array when an invalid input is provided (wrong fields length)', () => {
        const result = pegoutRequestsParser(Buffer.from(encodedInvalidPegoutRequestFieldsLength, 'hex'));
        expect(Array.isArray(result)).to.be.true;
        expect(result.length).to.equal(0);
    });

    it('should throw an error when an invalid input is provided (wrong data length)', () => {
        expect(() => pegoutRequestsParser(Buffer.from(encodedInvalidPegoutRequestDataLength, 'hex'))).to.throw(
            Error,
            'Destination address hash160 buffer must be exactly 20 bytes, got 4 bytes'
        );
    });

    it('should throw an error when an invalid input is provided', () => {
        expect(() => pegoutRequestsParser('invalid')).to.throw(Error, 'invalid remainder');
    });

    it('should return utxos', () => {
        const result = pegoutRequestsParser(Buffer.from(encodedPegoutRequest, 'hex'));
        expect(result).to.deep.equal(decodedPegoutRequest);
    });

    it('should throw an error when rskTxHash buffer is not exactly 32 bytes', () => {
        // Create test data with a 31-byte rskTxHash buffer (invalid)
        const destinationAddressHash160 = Buffer.from('cab5925c59a9a413f8d443000abcc5640bdf0675', 'hex');
        const amountInSatoshis = Buffer.from([0x07, 0xa1, 0x20]); // 500000 in hex
        // Create a 31-byte hash buffer (invalid - should be 32 bytes)
        const invalidRskTxHash = Buffer.from('1c78ab4377713abd54a39b6e34a038cf4b6c4b77698b8a7153776aeecb7d00', 'hex');

        const rlpEncoded = RLP.encode([
            destinationAddressHash160,
            amountInSatoshis,
            invalidRskTxHash
        ]);

        expect(() => pegoutRequestsParser(rlpEncoded)).to.throw(
            Error,
            'RSK transaction hash buffer must be exactly 32 bytes, got 31 bytes'
        );
    });

    it('should correctly parse rskTxHash with valid 32-byte buffer', () => {
        // Create test data with a valid 32-byte rskTxHash buffer
        const destinationAddressHash160 = Buffer.from('cab5925c59a9a413f8d443000abcc5640bdf0675', 'hex');
        const amountInSatoshis = Buffer.from([0x07, 0xa1, 0x20]); // 500000 in hex
        // Create a 32-byte hash buffer
        const rskTxHashBuffer = Buffer.concat([
            Buffer.from([0x0a]),
            Buffer.from('1c78ab4377713abd54a39b6e34a038cf4b6c4b77698b8a7153776aeecb7d00', 'hex')
        ]);

        const rlpEncoded = RLP.encode([
            destinationAddressHash160,
            amountInSatoshis,
            rskTxHashBuffer
        ]);

        expect(() => pegoutRequestsParser(rlpEncoded)).to.not.throw();
        const result = pegoutRequestsParser(rlpEncoded);
        expect(Array.isArray(result)).to.be.true;
        const { rskTxHash } = result[0];
        expect(rskTxHash).to.have.length(64);
        expect(rskTxHash).to.equal('0a1c78ab4377713abd54a39b6e34a038cf4b6c4b77698b8a7153776aeecb7d00');
    });

});
