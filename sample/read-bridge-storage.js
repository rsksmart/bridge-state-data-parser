const { JsonRpcProvider } = require('ethers');
const networkParser = require('./network');

const BRIDGE_ADDRESS = '0x0000000000000000000000000000000001000006';

// Bridge storage keys can be found in https://github.com/rsksmart/rskj/blob/master/rskj-core/src/main/java/co/rsk/peg/BridgeStorageIndexKey.java
(async () => {
    try {
        const network = networkParser(process.argv[2]);
        const storageKey = process.argv[3];
        const provider = new JsonRpcProvider(network);

        const storagePosition = Buffer.from(storageKey)
            .toString('hex')
            .padStart(64, '0') // Pad left with 0 until 64
            .padStart(66, '0x'); // prepend 0x

        /* eslint no-console: "off" */
        console.log(`Storage position for key '${storageKey}': ${storagePosition}`);
        const storageValue = await provider.getStorage(BRIDGE_ADDRESS, storagePosition);

        console.log(`Storage value for key '${storageKey}' (RLP encoded): ${storageValue}`);
    } catch (e) {
        console.log(e);
    }
})();
