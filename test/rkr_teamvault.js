import {expectThrow, waitNDays, getEvents, BigNumber, increaseTimeTo} from './helpers/tools';
import {logger as log} from "./helpers/logger";

const RKRToken = artifacts.require('./RKRToken.sol');
const TeamVault = artifacts.require('./TeamVault.sol');

const should = require('chai') // eslint-disable-line
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

contract('RKRTeamVault',(accounts) => {
    let simoneAddress = '0x365c571424a3Fe44799179d38bc38979f35ec7Bc';
    let teamAddress = '0xe105679D4Ad6FB5B50252e532c2D265281486C05';
    let loreaddress = '0x97F52761320F55d7a6b6030a211948de616FDc10';
    let aleaddress = '0x22676C0d8Fa7242C5AFbA6d66060ef4A9113Fa41';
    
    let owner = accounts[0];

    const teamVault_balance = new BigNumber(10e6 * 1e18);

    // Provide gotTokenInstance for every test case
    let rkrTokenInstance;
    let teamVaultInstance;


    beforeEach(async () => {
        rkrTokenInstance = await RKRToken.deployed();
        teamVaultInstance = await TeamVault.deployed();
    });

    it('should check balance vault is correct', async () => {
        let balance = await rkrTokenInstance.balanceOf(teamVaultInstance.address);
        balance.should.be.bignumber.equal(teamVault_balance);
    });

    it('should not release any token', async () => {
        let balanceBefore = await rkrTokenInstance.balanceOf(simoneAddress);
        await expectThrow(teamVaultInstance.release(simoneAddress,{from:owner}));
        let balanceAfter = await rkrTokenInstance.balanceOf(simoneAddress);
        balanceBefore.should.be.bignumber.equal(balanceAfter);
        balanceBefore.should.be.bignumber.equal(new BigNumber(0));
    });

    it('should not release any token because no balance', async () => {
        let balanceBefore = await rkrTokenInstance.balanceOf(accounts[9]);
        await expectThrow(teamVaultInstance.release(accounts[9],{from:owner}));
        let balanceAfter = await rkrTokenInstance.balanceOf(accounts[9]);
        balanceBefore.should.be.bignumber.equal(balanceAfter);
        balanceBefore.should.be.bignumber.equal(new BigNumber(0));
    });

    it('should increase time to first unlock period', async () => {
        let expectedBalanceSimone = new BigNumber(1.5e6 * 1e18);
        let expectedBalanceLore = new BigNumber(1.5e6 * 1e18);
        let expectedBalanceAle = new BigNumber(1.5e6 * 1e18);
        let expectedBalanceTeam = new BigNumber(5.5e6 * 1e18);
        let balanceBeforeSimone = await rkrTokenInstance.balanceOf(simoneAddress);
        let balanceBeforeTeam = await rkrTokenInstance.balanceOf(teamAddress);
        let balanceBeforelore = await rkrTokenInstance.balanceOf(loreaddress);
        let balanceBeforeale = await rkrTokenInstance.balanceOf(aleaddress);
        log.info('[ balanceBeforeSimone ]' + balanceBeforeSimone);
        log.info('[ balanceBeforeLore ]' + balanceBeforelore);
        log.info('[ balanceBeforeAle ]' + balanceBeforeale);
        log.info('[ balanceBeforeTeam ]' + balanceBeforeTeam);
        await waitNDays(365);
        await teamVaultInstance.release(simoneAddress,{from:owner});
        await teamVaultInstance.release(teamAddress,{from:owner});
        await teamVaultInstance.release(loreaddress,{from:owner});
        await teamVaultInstance.release(aleaddress,{from:owner});
        let balanceAfterSimone = await rkrTokenInstance.balanceOf(simoneAddress);
        let balanceAfterTeam = await rkrTokenInstance.balanceOf(teamAddress);
        let balanceAfterAle = await rkrTokenInstance.balanceOf(aleaddress);
        let balanceAfterLore = await rkrTokenInstance.balanceOf(loreaddress);
        log.info('[ balanceAfterSimone ]' + balanceAfterSimone);
        log.info('[ balanceAfterLore ]' + balanceAfterLore);
        log.info('[ balanceAfterAle ]' + balanceAfterAle);
        log.info('[ balanceAfterTeam ]' + balanceAfterTeam);
        balanceAfterSimone.should.be.bignumber.equal(expectedBalanceSimone);
        balanceAfterTeam.should.be.bignumber.equal(expectedBalanceTeam);
        balanceAfterAle.should.be.bignumber.equal(expectedBalanceAle);
        balanceAfterLore.should.be.bignumber.equal(expectedBalanceLore);
    });

 

  
});
