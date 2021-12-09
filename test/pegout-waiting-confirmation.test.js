const pegoutWaitingConfirmationsParser =
  require("../pegout-waiting-confirmation").parseRLPToPegoutWaitingConfirmations;
const { expect } = require("chai");

const {
  encodedPegoutsWaitingConfirmation,
  decodedPegoutsWaitingConfirmation,
} = require("./resources/pegout-waiting-confirmation-test-data");

describe("Pegout waiting confirmation parser", () => {
  it("should return an empty array when provided null", () => {
    const result = pegoutWaitingConfirmationsParser(null);
    expect(Array.isArray(result)).to.be.true;
    expect(result.length).to.equal(0);
  });

  it("should return an empty array when provided an empty Buffer", () => {
    const result = pegoutWaitingConfirmationsParser(Buffer.from(""));
    expect(Array.isArray(result)).to.be.true;
    expect(result.length).to.equal(0);
  });

  it("should throw an error when an invalid input is provided", () => {
    expect(() => pegoutWaitingConfirmationsParser("invalid")).to.throw(
      Error,
      "invalid remainder"
    );
  });

  it("should return pegouts waiting confirmation", () => {
    const result = pegoutWaitingConfirmationsParser(
      Buffer.from(encodedPegoutsWaitingConfirmation, "hex")
    );
    expect(result).to.deep.equal(decodedPegoutsWaitingConfirmation);
  });
});
