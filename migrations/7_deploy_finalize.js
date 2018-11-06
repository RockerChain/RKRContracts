const Migrations = artifacts.require("./Migrations.sol");
const RKR = artifacts.require("./RKRToken.sol");

module.exports = function(deployer) {
    RKR.at(RKR.address).then(x => {
        RKRInstance = x;
        Console.log("Deploy completed");
    });
};
