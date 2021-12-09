const networkParser = require("./network");
const Web3 = require("web3");
const bridgeStatus = require("../index");

(async () => {
  try {
    const network = networkParser(process.argv[2]);
    const web3 = new Web3(network);
    const bridgeStatusResult = await bridgeStatus(web3);
    console.log(bridgeStatusResult);
  } catch (e) {
    console.log(e);
  }
})();
