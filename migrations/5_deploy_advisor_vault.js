const AdvisorVault = artifacts.require("./AdvisorVault.sol");
const RKRTokenInstance = artifacts.require("./RKRToken.sol");
module.exports = function(deployer, network, accounts) {

    let advisorWallet = ""; 

    if (network == "ropsten" || network =="main") {
        advisorWallet = '0x12C16985992f6A4520A5107DD21017907Cb10B1F';
    }
    else{
        advisorWallet = accounts[2]; 
    }

    
    deployer.deploy(AdvisorVault, advisorWallet, RKRTokenInstance.address).then(() => {
        return AdvisorVault.deployed().then(function(AdvisorVaultInstance){
            let AdvisorVaultAddress = AdvisorVaultInstance.address;
            console.log('[ AdvisorVaultInstance.address ]: ' + AdvisorVaultAddress);
        });
    });
};
