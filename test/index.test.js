const fetchMock = require('fetch-mock').default;

const bridgeStateModule = require('../index');

const { encodedBridgeState, decodedBridgeState } = require('./resources/bridge-state-test-data');
const latestBlock = require('./resources/latest-block.json');

const mockFetchRoute = response => {
    fetchMock.route('*', response);
    fetchMock.mockGlobal();
};

describe('bridgeState', () => {
    afterEach(() => {
        fetchMock.hardReset();
    });

    it('should return the bridge state', async () => {
        mockFetchRoute({
            body: { jsonrpc: '2.0', id: 1, result: encodedBridgeState },
            headers: { 'content-type': 'application/json' }
        });
        const bridgeStateResult = await bridgeStateModule.getBridgeState('*');
        expect(bridgeStateResult).to.deep.equal(decodedBridgeState);
        expect(fetchMock.callHistory.called()).to.equal(true);
    });

    it('Uses "latest" by default as the Block to search', async () => {
        mockFetchRoute({
            body: { jsonrpc: '2.0', id: 1, result: encodedBridgeState },
            headers: { 'content-type': 'text/plain' }
        });
        const bridgeStateResult = await bridgeStateModule.getBridgeState('*');
        expect(bridgeStateResult).to.deep.equal(decodedBridgeState);

        const lastCall = fetchMock.callHistory.lastCall();
        const args = JSON.parse(lastCall.options.body);
        expect(args).to.haveOwnProperty('params');
        expect(args.params[args.params.length - 1]).to.be.equal('latest');
    });

    it('Uses 123 as the Block to search', async () => {
        mockFetchRoute({
            body: { jsonrpc: '2.0', id: 1, result: encodedBridgeState },
            headers: { 'content-type': 'text/plain' }
        });
        const bridgeStateResult = await bridgeStateModule.getBridgeState('*', 123);
        expect(bridgeStateResult).to.deep.equal(decodedBridgeState);

        const lastCall = fetchMock.callHistory.lastCall();
        const args = JSON.parse(lastCall.options.body);
        expect(args).to.haveOwnProperty('params');
        expect(args.params[args.params.length - 1]).to.be.equal(123);
    });

    it('Invalid data yields empty state', async () => {
        mockFetchRoute({
            body: 'No valid data',
            headers: { 'content-type': 'text/plain' }
        });
        const bridgeStateResult = await bridgeStateModule.getBridgeState('*');
        expect(bridgeStateResult).to.deep.equal({
            activeFederationUtxos: [],
            pegoutRequests: [],
            pegoutsWaitingForConfirmations: [],
            pegoutsWaitingForSignatures: [],
            nextPegoutCreationBlockNumber: 0
        });

        const lastCall = fetchMock.callHistory.lastCall();
        const args = JSON.parse(lastCall.options.body);
        expect(args).to.haveOwnProperty('params');
        expect(args.params[args.params.length - 1]).to.be.equal('latest');
    });

    it('Failed request yields empty state', async () => {
        mockFetchRoute({
            body: {
                jsonrpc: '2.0',
                id: 'bridge-state-data-parser-1',
                error: {
                    code: -32601,
                    message: 'Method not found'
                }
            },
            headers: { 'content-type': 'text/plain' }
        });
        const bridgeStateResult = await bridgeStateModule.getBridgeState('*');
        expect(bridgeStateResult).to.deep.equal({
            activeFederationUtxos: [],
            pegoutRequests: [],
            pegoutsWaitingForConfirmations: [],
            pegoutsWaitingForSignatures: [],
            nextPegoutCreationBlockNumber: 0
        });

        const lastCall = fetchMock.callHistory.lastCall();
        const args = JSON.parse(lastCall.options.body);
        expect(args).to.haveOwnProperty('params');
        expect(args.params[args.params.length - 1]).to.be.equal('latest');
    });
});

describe('getLatestBlockNumber', () => {
    afterEach(() => {
        fetchMock.hardReset();
    });

    it('should return the latest block number', async () => {
        mockFetchRoute({
            body: { jsonrpc: '2.0', id: 1, result: latestBlock },
            headers: { 'content-type': 'application/json' }
        });
        const latestBlockNumber = await bridgeStateModule.getLatestBlockNumber('*');
        expect(latestBlockNumber).to.equal(7787551);
        expect(fetchMock.callHistory.called()).to.equal(true);
    });

    it('should return null if the request fails', async () => {
        mockFetchRoute(404);
        const latestBlockNumber = await bridgeStateModule.getLatestBlockNumber('*');
        expect(latestBlockNumber).to.be.null;
    });
});
