const bitcoinJsLib = require('bitcoinjs-lib');

const getBitcoinNetwork = networkName => {
    switch (networkName) {
        case 'mainnet':
            return bitcoinJsLib.networks.bitcoin;
        case 'testnet':
            return bitcoinJsLib.networks.testnet;
        case 'regtest':
            return bitcoinJsLib.networks.regtest;
        default:
            return bitcoinJsLib.networks.testnet;
    }
};

module.exports = {
    getBitcoinNetwork
};
