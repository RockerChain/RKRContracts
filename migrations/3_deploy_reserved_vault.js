const ReservedVaulInstance = artifacts.require("./ReservedVault.sol");

const RKRTokenInstance = artifacts.require("./RKRToken.sol");

module.exports = function(deployer, network, accounts) 
{
    let reservedWallet ="";

    if (network == "ropsten" || network =="main") {
        reservedWallet = '0x043339C33D3fa325a8D70fC82b131fa1d5869FD8';
    }
    else{
        reservedWallet = accounts[1]; 
    }

    deployer.deploy(ReservedVaulInstance, reservedWallet, RKRTokenInstance.address).then(() => {
        return ReservedVaulInstance.deployed().then(function(ReservedVaulInstance){
            let ReservedVaulInstanceAddress = ReservedVaulInstance.address;
            console.log('[ ReservedVaulInstance.address ]: ' + ReservedVaulInstanceAddress);
        });
    });
};
