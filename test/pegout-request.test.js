const { expect } = require('chai');
const pegoutRequestsParser = require('../pegout-request').parseRLPToPegoutRequests;

const {
    decodedPegoutRequestWithBtcDestinationAddressAsHash160,
    decodedPegoutRequestWithBtcDestinationAddressAsBase58Testnet,
    decodedPegoutRequestWithBtcDestinationAddressAsBase58Mainnet,
    encodedPegoutRequest,
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

    it('should return an empty array when an invalid input is provided (wrong data length)', () => {
        const result = pegoutRequestsParser(Buffer.from(encodedInvalidPegoutRequestDataLength, 'hex'));
        expect(Array.isArray(result)).to.be.true;
        expect(result.length).to.equal(0);
    });

    it('should throw an error when an invalid input is provided', () => {
        expect(() => pegoutRequestsParser('invalid')).to.throw(Error, 'invalid remainder');
    });

    it('should return pegout requests with btcDestinationAddress as HASH160', () => {
        const result = pegoutRequestsParser(Buffer.from(encodedPegoutRequest, 'hex'));
        expect(result).to.deep.equal(decodedPegoutRequestWithBtcDestinationAddressAsHash160);
    });

    it('should return pegout requests with btcDestinationAddress as base58 testnet', () => {
        const result = pegoutRequestsParser(Buffer.from(encodedPegoutRequest, 'hex'), 'testnet');
        expect(result).to.deep.equal(decodedPegoutRequestWithBtcDestinationAddressAsBase58Testnet);
    });

    it('should return pegout requests with btcDestinationAddress as base58 mainnet', () => {
        const result = pegoutRequestsParser(Buffer.from(encodedPegoutRequest, 'hex'), 'mainnet');
        expect(result).to.deep.equal(decodedPegoutRequestWithBtcDestinationAddressAsBase58Mainnet);
    });
});
