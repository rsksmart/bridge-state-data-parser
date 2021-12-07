const rewire = require("rewire");
const { bridgeStateBytes, mockedBridgeStatus} = require('./resources/bridgeStateBytes');
const bridgeStatus = rewire('../index');
const { expect } = require('chai');

bridgeStatus.__set__({
    Bridge: {
        build() {
            return {
                methods: {
                    getStateForDebugging() {
                        return {
                            call: () => bridgeStateBytes
                        }
                    }
                }
            }
        }
    }
});

describe("bridgeStatus", () => {

    it("should return the bridge status", async () => {
        const bridgeStatusResult = await bridgeStatus(null);
        expect(bridgeStatusResult).to.deep.equal(mockedBridgeStatus);
    });

});