import {expectThrow, getEvents, BigNumber} from './helpers/tools';
import {logger} from "./helpers/logger";

const should = require('chai') // eslint-disable-line
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const RKRToken = artifacts.require('./RKRToken.sol');
const AdvisorVault = artifacts.require('./AdvisorVault.sol');

contract('RKRTokenContract',(accounts) => {
    const owner = accounts[0];
    let reservedWallet = accounts[1];
    let advisorWallet = accounts[2];
    let team1Wallet = '0x365c571424a3Fe44799179d38bc38979f35ec7Bc';
    let team2Wallet = '0x278E0eC12017836B7D9BEe5d57BcB8A1E79BF644';
    // Provide RKRTokenInstance for every test case
    let RKRTokenInstance;
    let AdvisorVaultInstance;
    beforeEach(async () => {
        RKRTokenInstance = await RKRToken.deployed();
        AdvisorVaultInstance = await AdvisorVault.deployed();
    });

    it('should instantiate the token correctly', async () => {
        const name = await RKRTokenInstance.name();
        const symbol = await RKRTokenInstance.symbol();
        const decimals = await RKRTokenInstance.decimals();

        name.should.equal('RKRToken');
        symbol.should.equal('RKR');
        decimals.should.be.bignumber.equal(18, 'Decimals does not match');
    });

    it('should fail, init could be called only one time', async () => {
        await expectThrow(RKRTokenInstance.initializeAdvisorVault(AdvisorVaultInstance.address,{from: owner}));
    });
});
