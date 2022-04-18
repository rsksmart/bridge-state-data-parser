const ethUtils = require('ethereumjs-util');

const RLP = ethUtils.rlp;
const { BN } = ethUtils;

const parseRLPToNextPegoutCreationBlockNumber = rlp => {
    const rlpNextPegoutCreationBlockNumber = RLP.decode(rlp);
    return Number(new BN(rlpNextPegoutCreationBlockNumber).toString());
};

exports.parseRLPToNextPegoutCreationBlockNumber = parseRLPToNextPegoutCreationBlockNumber;
