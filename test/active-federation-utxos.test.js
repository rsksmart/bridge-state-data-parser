const activeFederationUtxosParser = require('../active-federation-utxos').parseRLPToActiveFederationUtxos;
const {
    encodedActiveFederationUtxos,
    decodedActiveFederationUtxos
} = require('./resources/active-federation-utxo-test-data');

describe('active federation utxos parser', () => {
    it('should return an empty array when provided null', () => {
        const result = activeFederationUtxosParser(null);
        expect(Array.isArray(result)).to.be.true;
        expect(result.length).to.equal(0);
    });

    it('should return an empty array when provided an empty Buffer', () => {
        const result = activeFederationUtxosParser(Buffer.from(''));
        expect(Array.isArray(result)).to.be.true;
        expect(result.length).to.equal(0);
    });

    it('should throw an error when an invalid input is provided', () => {
        expect(() => activeFederationUtxosParser('invalid')).to.throw(Error, 'invalid RLP: remainder must be zero');
    });

    it('should return utxos', () => {
        const result = activeFederationUtxosParser(Buffer.from(encodedActiveFederationUtxos, 'hex'));
        expect(result).to.deep.equal(decodedActiveFederationUtxos);
    });

    it('should decode the utxo height', () => {
        const { RLP } = require('@ethereumjs/rlp');
        const btcTxHash = '9a19349598860fc3a815499ef857367a77f85720bf942c22f61904de9d1f3aa4';
        const height = 4294967;
        const heightLE = Buffer.alloc(4);
        heightLE.writeUInt32LE(height);
        const serializedUtxo = Buffer.concat([
            Buffer.from('40420f0000000000', 'hex'), // value (1_000_000 sats, LE)
            Buffer.from('17000000', 'hex'), // script length (23, LE)
            Buffer.from('a9142a313b9167a8f5afb92c1eca2d97e730326977ac87', 'hex'), // P2SH script
            Buffer.from(btcTxHash, 'hex'),
            Buffer.from('02000000', 'hex'), // output index (LE)
            heightLE,
            Buffer.from('00', 'hex') // coinbase flag
        ]);

        const result = activeFederationUtxosParser(RLP.encode([serializedUtxo]));
        expect(result).to.deep.equal([{ btcTxHash, btcTxOutputIndex: 2, valueInSatoshis: 1000000, height }]);
    });
});
