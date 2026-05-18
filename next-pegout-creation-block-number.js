const { RLP } = require('@ethereumjs/rlp');
const { bytesToDecimalString } = require('./utils');

const parseRLPToNextPegoutCreationBlockNumber = rlp => {
    const rlpNextPegoutCreationBlockNumber = RLP.decode(rlp);
    return Number(bytesToDecimalString(rlpNextPegoutCreationBlockNumber));
};

exports.parseRLPToNextPegoutCreationBlockNumber = parseRLPToNextPegoutCreationBlockNumber;
