const Web3 = require('web3');
const networkParser = require('./network');
const bridgeStatus = require('../index');

(async () => {
    try {
        const network = networkParser(process.argv[2]);
        const web3 = new Web3(network);
        const bridgeStatusResult = await bridgeStatus(web3);
        /* eslint no-console: "off" */
        console.log(bridgeStatusResult);
    } catch (e) {
        console.log(e);
    }
})();
