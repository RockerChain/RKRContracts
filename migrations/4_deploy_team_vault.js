const TeamVault = artifacts.require("./TeamVault.sol");

const RKRTokenInstance = artifacts.require("./RKRToken.sol");

module.exports = function(deployer) {
    deployer.deploy(TeamVault, RKRTokenInstance.address).then(() => {
        return TeamVault.deployed().then(function(TeamVaultInstance){
            let TeamVaultAddress = TeamVaultInstance.address;
            console.log('[ TeamVaultInstance.address ]: ' + TeamVaultAddress);
        });
    });
};
