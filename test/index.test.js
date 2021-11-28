const rewire = require("rewire");
const bridgeStateBytes = require('./resources/bridgeStateBytes');
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
        expect(bridgeStatusResult).to.be.an('object');
        expect(bridgeStatusResult.activeFederationUtxos).to.be.an('array');
        expect(bridgeStatusResult.pegoutsWaitingForSignatures).to.be.an('array');
        expect(bridgeStatusResult.pegoutRequests).to.be.an('array');
        expect(bridgeStatusResult.pegoutsWaitingForConfirmations).to.be.an('array');
    });

});