const fetchMock = require('fetch-mock');
const { expect } = require('chai');

const bridgeStateModule = require('../index');

const { encodedBridgeState, decodedBridgeState } = require('./resources/bridge-state-test-data');

describe('bridgeState', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it('should return the bridge state', async () => {
        fetchMock.mock('*', {
            body: { jsonrpc: '2.0', id: 1, result: encodedBridgeState },
            headers: { 'content-type': 'application/json' }
        });
        const bridgeStateResult = await bridgeStateModule.getBridgeState('*');
        expect(bridgeStateResult).to.deep.equal(decodedBridgeState);
        expect(fetchMock.called()).to.equal(true);
    });

    it('Uses "latest" by default as the Block to search', async () => {
        fetchMock.mock('*', {
            body: { jsonrpc: '2.0', id: 1, result: encodedBridgeState },
            headers: { 'content-type': 'text/plain' }
        });
        const bridgeStateResult = await bridgeStateModule.getBridgeState('*');
        expect(bridgeStateResult).to.deep.equal(decodedBridgeState);

        const lastCallArgs = fetchMock.lastCall();
        const args = JSON.parse(lastCallArgs[1].body);
        expect(args).to.haveOwnProperty('params');
        expect(args.params[args.params.length - 1]).to.be.equal('latest');
    });

    it('Uses 123 as the Block to search', async () => {
        fetchMock.mock('*', {
            body: { jsonrpc: '2.0', id: 1, result: encodedBridgeState },
            headers: { 'content-type': 'text/plain' }
        });
        const bridgeStateResult = await bridgeStateModule.getBridgeState('*', 123);
        expect(bridgeStateResult).to.deep.equal(decodedBridgeState);

        const lastCallArgs = fetchMock.lastCall();
        const args = JSON.parse(lastCallArgs[1].body);
        expect(args).to.haveOwnProperty('params');
        expect(args.params[args.params.length - 1]).to.be.equal(123);
    });

    it('Invalid data yields empty state', async () => {
        fetchMock.mock('*', {
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

        const lastCallArgs = fetchMock.lastCall();
        const args = JSON.parse(lastCallArgs[1].body);
        expect(args).to.haveOwnProperty('params');
        expect(args.params[args.params.length - 1]).to.be.equal('latest');
    });

    it('Failed request yields empty state', async () => {
        fetchMock.mock('*', {
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

        const lastCallArgs = fetchMock.lastCall();
        const args = JSON.parse(lastCallArgs[1].body);
        expect(args).to.haveOwnProperty('params');
        expect(args.params[args.params.length - 1]).to.be.equal('latest');
    });
});
