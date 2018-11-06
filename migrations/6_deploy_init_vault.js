const BigNumber = web3.BigNumber;

const RKR = artifacts.require("./RKRToken.sol");
const ReservedVault = artifacts.require("./ReservedVault.sol");
const TeamVault = artifacts.require("./TeamVault.sol");
const AdvisorVault = artifacts.require("./AdvisorVault.sol");

module.exports = function(deployer, network, accounts) {
    //let unlockedWallet = accounts[0];
    let RKRInstance;
    //load contract instances
    RKR.at(RKR.address).then(x => {
        RKRInstance = x;
        //console.log('[ SENDER address ] '+ unlockedWallet);
        console.log('[ RV address ] '+ ReservedVault.address);
        console.log('[ TV address ] '+ TeamVault.address);
        console.log('[ AV address ] '+ AdvisorVault.address);
        console.log('[ RKR address ] '+ RKRInstance.address);
        //console.log(RKRInstance.balanceOf(AdvisorVault.address));
        RKRInstance.initializeAdvisorVault(AdvisorVault.address).then(y=>{
            console.log('[ Advisory Vault address setted ] ');
        });
        RKRInstance.initializeTeamVault(TeamVault.address).then(y=>{
            console.log('[ Team Vault address setted ] ');
        });
        RKRInstance.initializeReservedVault(ReservedVault.address).then(y=>{
            console.log('[ Reserved Vault address setted ] ');
        });

        RKRInstance.balanceOf(ReservedVault.address).then(y=>{
            console.log('[ Balance Reserved Vault ] ');
        });
        console.log("waiting for promises....")

    })

   
}
