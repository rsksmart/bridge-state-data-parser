const pegoutWaitingSignaturesParser = require('../pegout-waiting-signature').parseRLPToPegoutWaitingSignatures;
const { expect } = require('chai');

const { encodedPegoutsWaitingSignatures, decodedPegoutsWaitingSignatures } = require('./resources/pegout-waiting-signature-test-data');

describe("Pegout waiting signatures parser", () => {

    it("should return an empty array when provided null", () => {
        const result = pegoutWaitingSignaturesParser(null);
        expect(Array.isArray(result)).to.be.true;
        expect(result.length).to.equal(0);
    });

    it("should return an empty array when provided an empty Buffer", () => {
        const result = pegoutWaitingSignaturesParser(Buffer.from(""));
        expect(Array.isArray(result)).to.be.true;
        expect(result.length).to.equal(0);
    });

    it("should throw an error when an invalid input is provided", () => {
        expect(() => pegoutWaitingSignaturesParser("invalid")).to.throw(Error, "invalid remainder");
    });

    it("should return pegouts waiting signatures", () => {
        const result = pegoutWaitingSignaturesParser(Buffer.from(encodedPegoutsWaitingSignatures, 'hex'));
        expect(Array.isArray(result)).to.be.true;
        expect(result.length).to.equal(2);
        expect(result).to.deep.equal(decodedPegoutsWaitingSignatures);
    });

});
