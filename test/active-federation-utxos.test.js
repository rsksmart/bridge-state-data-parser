const activeFederationUtxosParser = require('../active-federation-utxos').parseRLPToActiveFederationUtxos;
const { expect } = require('chai');
const utxoBytes = require('./resources/utsoBytes');

describe("active federation utxos parser", () => {

    it("should return an empty array when provided null", () => {
        const result = activeFederationUtxosParser(null);
        expect(Array.isArray(result)).to.be.true;
        expect(result.length).to.equal(0);
    });

    it("should return an empty array when provided an empty Buffer", () => {
        const result = activeFederationUtxosParser(Buffer.from(""));
        expect(Array.isArray(result)).to.be.true;
        expect(result.length).to.equal(0);
    });

    it("should throw an error when an invalid input is provided", () => {
        expect(() => activeFederationUtxosParser("invalid")).to.throw(Error, "invalid remainder");
    });

    it("should return utxos", () => {
        const result = activeFederationUtxosParser(Buffer.from(utxoBytes, 'hex'));
        expect(Array.isArray(result)).to.be.true;
        expect(result.length).to.equal(35);
        const hasExpectedProperties = utxo => {
            return utxo.hasOwnProperty('btcTxHash') && utxo.hasOwnProperty('btcTxOutputIndex') && utxo.hasOwnProperty('valueInSatoshis');
        };
        expect(result.every(hasExpectedProperties)).to.be.true;
    });

});