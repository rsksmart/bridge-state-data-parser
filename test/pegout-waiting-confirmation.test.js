const { expect } = require('chai');

const ethUtils = require('ethereumjs-util');

const RLP = ethUtils.rlp;
const { BN } = ethUtils;
const pegoutWaitingConfirmationsParser = require('../pegout-waiting-confirmation').parseRLPToPegoutWaitingConfirmations;

const {
    encodedPegoutsWaitingConfirmation,
    decodedPegoutsWaitingConfirmation
} = require('./resources/pegout-waiting-confirmation-test-data');

describe('Pegout waiting confirmation parser', () => {
    it('should return an empty array when provided null', () => {
        const result = pegoutWaitingConfirmationsParser(null);
        expect(Array.isArray(result)).to.be.true;
        expect(result.length).to.equal(0);
    });

    it('should return an empty array when provided an empty Buffer', () => {
        const result = pegoutWaitingConfirmationsParser(Buffer.from(''));
        expect(Array.isArray(result)).to.be.true;
        expect(result.length).to.equal(0);
    });

    it('should throw an error when an invalid input is provided', () => {
        expect(() => pegoutWaitingConfirmationsParser('invalid')).to.throw(Error, 'invalid remainder');
    });

    it('should return pegouts waiting confirmation', () => {
        const result = pegoutWaitingConfirmationsParser(Buffer.from(encodedPegoutsWaitingConfirmation, 'hex'));
        expect(result).to.deep.equal(decodedPegoutsWaitingConfirmation);
    });

    it('should throw an error when rskTxHash buffer is not exactly 32 bytes', () => {
        // Create test data with a 31-byte rskTxHash buffer (invalid)
        const btcRawTx = Buffer.from('02000000012c5992f67f99b7c95f3c23bcc28084b30a5bb96c7d430f91dc4f0dd11787421c01000000fdc80100000000000000004dbd0157210231a395e332dde8688800a0025cccc5771ea1aa874a633b8ab6e5c89d300c7c3621026b472f7d59d201ff1f540f111b6eb329e071c30a9d23e3d2bcd128fe73dc254c21027319afb15481dbeb3c426bcc37f9a30e7f51ceff586936d85548d9395bcc2344210294c817150f78607566e961b3c71df53a22022a80acbb982f83c0c8baac040adc2103250c11be0561b1d7ae168b1f59e39cbc1fd1ba3cf4d2140c1a365b2723a2bf9321033ada6ef3b1d93a1978b595c7a9e2aa613860b26d4f5a7abb88576aa42b3432ad210357f7ed4c118e581f49cd3b4d9dd1edb4295f4def49d6dcf2faaaaac87a1a0a42210372cd46831f3b6afd4c044d160b7667e8ebf659d6cb51a825a3104df6ee0638c62103ae72827d25030818c4947a800187b1fbcc33ae751e248ae60094cc989fb880f62103b3a7aa25702000c5c1faa300600e8e2bd89cde2be7fb1ec898a39c50d9de90d12103b53899c390573471ba30e5054f78376c5f797fda26dde7a760789f02908cbad22103e05bf6002b62651378b1954820539c36ca405cbb778c225395dd9ebff67802992103ecd8af1e93c57a1b8c7f917bd9980af798adeb0205e9687865673353eb041e8d5daeffffffff024714dc14000000001976a9147e8784d8b1e299d8f55c9977fbfa9c1821eb472188ac7dc9cf8e0000000017a914596cff92a275960df9cb2ab9df0ff69faa2b1d8a8700000000', 'hex');
        const pegoutCreationBlockNumber = new BN('3873302');
        // Create a 31-byte hash buffer (invalid - should be 32 bytes)
        const invalidRskTxHash = Buffer.from('1c78ab4377713abd54a39b6e34a038cf4b6c4b77698b8a7153776aeecb7d00', 'hex');

        const rlpEncoded = RLP.encode([
            btcRawTx,
            pegoutCreationBlockNumber.toBuffer(),
            invalidRskTxHash
        ]);

        expect(() => pegoutWaitingConfirmationsParser(rlpEncoded)).to.throw(
            Error,
            'RSK transaction hash buffer must be exactly 32 bytes, got 31 bytes'
        );
    });

});
