const encodedPegoutRequest = `f9012294cab5925c59a9a413f8d443000abcc5640bdf06758307a120a0f4651c78ab4377713abd54a39b6e34a038cf4b6c4b77698b8a7153776aeecb7d94563ef74768a2840eb7069f0cc1d6e3070433459b8307a121a03b40e9bbe71e1958480ff1604d8053c88c18d183b4647964b65e5ec3e9ba63b094563ef74768a2840eb7069f0cc1d6e3070433459b8307a122a0b23218c6f8a393c92eef671714217bfebd9f6b30fffd937e277f28b0021e7f87942cad228a9f1e038897d435f3583e741bde3fe8c68307a123a0ef4ea868b27f385e00406484da54c1c74f4d2179cf36e6b99b3c3a92118aabfe94dc6254d5b5c545732e2a65cf0ff075e4070d044f8307a124a0d4211d935a971d432f337c797b45ca1eeb24957814c2a0fa0b2ae9433dc77b68`;

const decodedPegoutRequest = [
    {
      destinationAddressHash160: 'cab5925c59a9a413f8d443000abcc5640bdf0675',
      amountInSatoshis: '500000',
      rskTxHash: 'f4651c78ab4377713abd54a39b6e34a038cf4b6c4b77698b8a7153776aeecb7d'
    },
    {
      destinationAddressHash160: '563ef74768a2840eb7069f0cc1d6e3070433459b',
      amountInSatoshis: '500001',
      rskTxHash: '3b40e9bbe71e1958480ff1604d8053c88c18d183b4647964b65e5ec3e9ba63b0'
    },
    {
      destinationAddressHash160: '563ef74768a2840eb7069f0cc1d6e3070433459b',
      amountInSatoshis: '500002',
      rskTxHash: 'b23218c6f8a393c92eef671714217bfebd9f6b30fffd937e277f28b0021e7f87'
    },
    {
      destinationAddressHash160: '2cad228a9f1e038897d435f3583e741bde3fe8c6',
      amountInSatoshis: '500003',
      rskTxHash: 'ef4ea868b27f385e00406484da54c1c74f4d2179cf36e6b99b3c3a92118aabfe'
    },
    {
      destinationAddressHash160: 'dc6254d5b5c545732e2a65cf0ff075e4070d044f',
      amountInSatoshis: '500004',
      rskTxHash: 'd4211d935a971d432f337c797b45ca1eeb24957814c2a0fa0b2ae9433dc77b68'
    }
];

module.exports = {
    encodedPegoutRequest,
    decodedPegoutRequest
};
