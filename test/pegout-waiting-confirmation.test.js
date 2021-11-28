const pegoutWaitingConfirmationsParser = require('../pegout-waiting-confirmation').parseRLPToPegoutWaitingConfirmations;
const { expect } = require('chai');
 
const pegoutWaitingConfirmationBytes = require('./resources/pegoutWaitingConfirmationBytes');

describe("Pegout waiting confirmation parser", () => {

    it("should return an empty array when provided null", () => {
        const result = pegoutWaitingConfirmationsParser(null);
        expect(Array.isArray(result)).to.be.true;
        expect(result.length).to.equal(0);
    });

    it("should return an empty array when provided an empty Buffer", () => {
        const result = pegoutWaitingConfirmationsParser(Buffer.from(""));
        expect(Array.isArray(result)).to.be.true;
        expect(result.length).to.equal(0);
    });

    it("should throw an error when an invalid input is provided", () => {
        expect(() => pegoutWaitingConfirmationsParser("invalid")).to.throw(Error, "invalid remainder");
    });

    it("should return pegouts waiting confirmation", () => {
        const result = pegoutWaitingConfirmationsParser(Buffer.from(pegoutWaitingConfirmationBytes, 'hex'));
        expect(Array.isArray(result)).to.be.true;
        expect(result.length).to.equal(5);
        const hasExpectedProperties = pegout => {
            return pegout.hasOwnProperty('btcRawTx') && pegout.hasOwnProperty('pegoutCreationBlockNumber')
            && pegout.hasOwnProperty('rskTxHash');
        };
        expect(result.every(hasExpectedProperties)).to.be.true;
    });
 
});
