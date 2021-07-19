let networkParser = require('./network');
const Web3 = require('web3');
const bridgeStatus = require('./bridge-status');

(async () => {
    try {
        let network = networkParser(process.argv[2]);
        let web3 = new Web3(network);
        let bridgeStatusResult = await bridgeStatus(web3);
        console.log(bridgeStatusResult);
    } catch (e) {
        console.log(e);
    }
})();
