const pegoutRequestsParser = require('../pegout-request').parseRLPToPegoutRequests;
const { expect } = require('chai');

const pegoutRequestBytes = require('./resources/pegoutRequestBytes');
 
describe("Pegout request parser", () => {

    it("should return an empty array when provided null", () => {
        const result = pegoutRequestsParser(null);
        expect(Array.isArray(result)).to.be.true;
        expect(result.length).to.equal(0);
    });

    it("should return an empty array when provided an empty Buffer", () => {
        const result = pegoutRequestsParser(Buffer.from(""));
        expect(Array.isArray(result)).to.be.true;
        expect(result.length).to.equal(0);
    });

    it("should throw an error when an invalid input is provided", () => {
        expect(() => pegoutRequestsParser("invalid")).to.throw(Error, "invalid remainder");
    });

    it("should return utxos", () => {
        const expectedResult = [
            {
              destinationAddressHash160: 'cab5925c59a9a413f8d443000abcc5640bdf0675',
              amountInSatoshis: '500000',
              rskTxHash: 'f4651c78ab4377713abd54a39b6e34a038cf4b6c4b77698b8a7153776aeecb7d'
            },
            {
              destinationAddressHash160: '563ef74768a2840eb7069f0cc1d6e3070433459b',
              amountInSatoshis: '500001',
              rskTxHash: '3b40e9bbe71e1958480ff1604d8053c88c18d183b4647964b65e5ec3e9ba63b0'
            },
            {
              destinationAddressHash160: '563ef74768a2840eb7069f0cc1d6e3070433459b',
              amountInSatoshis: '500002',
              rskTxHash: 'b23218c6f8a393c92eef671714217bfebd9f6b30fffd937e277f28b0021e7f87'
            },
            {
              destinationAddressHash160: '2cad228a9f1e038897d435f3583e741bde3fe8c6',
              amountInSatoshis: '500003',
              rskTxHash: 'ef4ea868b27f385e00406484da54c1c74f4d2179cf36e6b99b3c3a92118aabfe'
            },
            {
              destinationAddressHash160: 'dc6254d5b5c545732e2a65cf0ff075e4070d044f',
              amountInSatoshis: '500004',
              rskTxHash: 'd4211d935a971d432f337c797b45ca1eeb24957814c2a0fa0b2ae9433dc77b68'
            }
        ];
        const result = pegoutRequestsParser(Buffer.from(pegoutRequestBytes, 'hex'));
        expect(Array.isArray(result)).to.be.true;
        expect(result.length).to.equal(5);
        expect(result).to.deep.equal(expectedResult);
    });
 
});
