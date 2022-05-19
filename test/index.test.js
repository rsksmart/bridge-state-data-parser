const rewire = require('rewire');

const bridgeStateModule = rewire('../index');
const { expect } = require('chai');

const { encodedBridgeState, decodedBridgeState } = require('./resources/bridge-state-test-data');

bridgeStateModule.__set__({
    Bridge: {
        build() {
            return {
                methods: {
                    getStateForDebugging() {
                        return {
                            call: () => encodedBridgeState
                        };
                    }
                }
            };
        }
    }
});

describe('bridgeState', () => {
    it('should return the bridge state', async () => {
        const bridgeStateResult = await bridgeStateModule.getBridgeState(null);
        expect(bridgeStateResult).to.deep.equal(decodedBridgeState);
    });
});
