const RKR = artifacts.require("./RKRToken.sol");

module.exports = function(deployer) {
    deployer.deploy(RKR).then(() => {
        return RKR.deployed().then(function(RKRTokenInstance){
            let RKRTokenAddress = RKRTokenInstance.address;
            console.log('[ RKRTokenInstance.address ]: ' + RKRTokenAddress);
        });
    });
};
