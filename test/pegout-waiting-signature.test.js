const { expect } = require('chai');
const pegoutWaitingSignaturesParser = require('../pegout-waiting-signature').parseRLPToPegoutWaitingSignatures;

const {
    encodedPegoutsWaitingSignatures,
    decodedPegoutsWaitingSignatures,
    encodedPegoutsWaitingSignaturesInvalidFieldsLength,
    encodedPegoutsWaitingSignaturesInvalidDataLength,
} = require('./resources/pegout-waiting-signature-test-data');

describe('Pegout waiting signatures parser', () => {
    it('should return an empty array when provided null', () => {
        const result = pegoutWaitingSignaturesParser(null);
        expect(Array.isArray(result)).to.be.true;
        expect(result.length).to.equal(0);
    });

    it('should return an empty array when provided an empty Buffer', () => {
        const result = pegoutWaitingSignaturesParser(Buffer.from(''));
        expect(Array.isArray(result)).to.be.true;
        expect(result.length).to.equal(0);
    });

    it('should return an empty array when an invalid input is provided (wrong fields length)', () => {
        const result = pegoutWaitingSignaturesParser(Buffer.from(encodedPegoutsWaitingSignaturesInvalidFieldsLength, 'hex'));
        expect(Array.isArray(result)).to.be.true;
        expect(result.length).to.equal(0);
    });

    it('should return an empty array when an invalid input is provided (wrong data length)', () => {
        const result = pegoutWaitingSignaturesParser(Buffer.from(encodedPegoutsWaitingSignaturesInvalidDataLength, 'hex'));
        expect(Array.isArray(result)).to.be.true;
        expect(result.length).to.equal(0);
    });


    it('should throw an error when an invalid input is provided', () => {
        expect(() => pegoutWaitingSignaturesParser('invalid')).to.throw(Error, 'invalid remainder');
    });

    it('should return pegouts waiting signatures', () => {
        const result = pegoutWaitingSignaturesParser(Buffer.from(encodedPegoutsWaitingSignatures, 'hex'));
        expect(result).to.deep.equal(decodedPegoutsWaitingSignatures);
    });
});
