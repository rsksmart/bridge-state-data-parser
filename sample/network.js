const NETWORKS = {
    mainnet: {
        host: 'https://public-node.rsk.co/',
        rskToBtcRequiredConfirmations: 4000
    },
    testnet: {
        host: 'https://public-node.testnet.rsk.co/',
        rskToBtcRequiredConfirmations: 10
    }
};

module.exports = network => {
    if (NETWORKS[network]) {
        return NETWORKS[network];
    }
    if (network.startsWith('http')) {
        return {
            host: network,
            rskToBtcRequiredConfirmations: 0
        };
    }
    throw new Error(
        `${network} is not a valid value for the host to connect to. Accepted values: ${Object.keys(
            NETWORKS
        )} or an http url`
    );
};
