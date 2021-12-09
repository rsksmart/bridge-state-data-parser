const encodedPegoutsWaitingSignatures =
  "f9027da0288ad23da592ab321852efddd704916d58007b2aaadf71f747c88e79a33bfd21b9010a0200000001325ec7dca63155713d5b862eec1a710f17877a09019413319ab14d306d6c48ab00000000b50047304402207ccfe6a4d1fc93f1e3d5184bd530e5a2cfab14602e134a3e929eabbb0e319b9b022050be4cd4679b141ad77fa9c985f0fdd9bedb80fd48de69115ddb1956467780b101004c69522102cd53fc53a07f211641a677d250f6de99caf620e8e77071e811a28b3bcddf0be1210362634ab57dae9cb373a5d536e66a8c4f67468bbcfb063809bab643072d78a1242103c5946b3fbae03a654237da863c9ed534e0878657175b132b8ca630f245df04db53aeffffffff01305cf505000000001976a914220495d7b1aefd49fc85ec2169712541795fa75f88ac00000000a0a9351cac10d875be588803b520756e48a2d3ccd26953f234be9351170a07417fb9012b0200000001a118470cbd9a05e222fcf925cfdc76c4fc372d9fb12e251fd6b3fca2c2e7cdb700000000b6004830450221009e5a8f9b584af056ae1a1abdfab73d0f7409898e0a66239755f88a4669fc4e9a02204f3f8796027a5ffb1760d461b2fe345872f6a9eecea8b5c77a655c6267b640e201004c69522102cd53fc53a07f211641a677d250f6de99caf620e8e77071e811a28b3bcddf0be1210362634ab57dae9cb373a5d536e66a8c4f67468bbcfb063809bab643072d78a1242103c5946b3fbae03a654237da863c9ed534e0878657175b132b8ca630f245df04db53aeffffffff02f0b94b00000000001976a914f7ee9ab7297134a0ccc76f3d50e94def17488f2c88acc095a9050000000017a914896ed9f3446d51b5510f7f0b6ef81b2bde55140e8700000000";

const decodedPegoutsWaitingSignatures = [
  {
    rskTxHash:
      "288ad23da592ab321852efddd704916d58007b2aaadf71f747c88e79a33bfd21",
    btcRawTx:
      "0200000001325ec7dca63155713d5b862eec1a710f17877a09019413319ab14d306d6c48ab00000000b50047304402207ccfe6a4d1fc93f1e3d5184bd530e5a2cfab14602e134a3e929eabbb0e319b9b022050be4cd4679b141ad77fa9c985f0fdd9bedb80fd48de69115ddb1956467780b101004c69522102cd53fc53a07f211641a677d250f6de99caf620e8e77071e811a28b3bcddf0be1210362634ab57dae9cb373a5d536e66a8c4f67468bbcfb063809bab643072d78a1242103c5946b3fbae03a654237da863c9ed534e0878657175b132b8ca630f245df04db53aeffffffff01305cf505000000001976a914220495d7b1aefd49fc85ec2169712541795fa75f88ac00000000",
  },
  {
    rskTxHash:
      "a9351cac10d875be588803b520756e48a2d3ccd26953f234be9351170a07417f",
    btcRawTx:
      "0200000001a118470cbd9a05e222fcf925cfdc76c4fc372d9fb12e251fd6b3fca2c2e7cdb700000000b6004830450221009e5a8f9b584af056ae1a1abdfab73d0f7409898e0a66239755f88a4669fc4e9a02204f3f8796027a5ffb1760d461b2fe345872f6a9eecea8b5c77a655c6267b640e201004c69522102cd53fc53a07f211641a677d250f6de99caf620e8e77071e811a28b3bcddf0be1210362634ab57dae9cb373a5d536e66a8c4f67468bbcfb063809bab643072d78a1242103c5946b3fbae03a654237da863c9ed534e0878657175b132b8ca630f245df04db53aeffffffff02f0b94b00000000001976a914f7ee9ab7297134a0ccc76f3d50e94def17488f2c88acc095a9050000000017a914896ed9f3446d51b5510f7f0b6ef81b2bde55140e8700000000",
  },
];

module.exports = {
  encodedPegoutsWaitingSignatures,
  decodedPegoutsWaitingSignatures,
};