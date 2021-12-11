const rewire = require('rewire');

const bridgeStatus = rewire('../index');
const { expect } = require('chai');

const { encodedBridgeState, decodedBridgeState } = require('./resources/bridge-state-test-data');

bridgeStatus.__set__({
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

describe('bridgeStatus', () => {
    it('should return the bridge status', async () => {
        const bridgeStatusResult = await bridgeStatus(null);
        expect(bridgeStatusResult).to.deep.equal(decodedBridgeState);
    });
});
