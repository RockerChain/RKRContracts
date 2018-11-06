//require('dotenv').config();
require('babel-register')({
  ignore: /node_modules\/(?!openzeppelin-solidity)/
});
require('babel-polyfill');

const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = "";
var NonceTrackerSubprovider = require("web3-provider-engine/subproviders/nonce-tracker")

module.exports = {
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },   
    QA: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "3",
      gas: 2900000
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "http://localhost:8545");
      },
      network_id: 3
    },
    main: {
      // provider: function() {
      //   return new HDWalletProvider(mnemonic, "http://192.168.3.164:8545");
      // },
      provider: function () {
        var wallet = new HDWalletProvider(mnemonic, 'http://192.168.3.164:8545')
        var nonceTracker = new NonceTrackerSubprovider()
        wallet.engine._providers.unshift(nonceTracker)
        nonceTracker.setEngine(wallet.engine)
        return wallet
      },
      network_id: 1
    }
  }
};