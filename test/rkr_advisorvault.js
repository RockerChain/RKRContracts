import {expectThrow, waitNDays, getEvents, BigNumber, increaseTimeTo} from './helpers/tools';
import {logger as log} from "./helpers/logger";

const RKRToken = artifacts.require('./RKRToken.sol');
const AdvisorVault = artifacts.require('./AdvisorVault.sol');

const should = require('chai') // eslint-disable-line
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

contract('RKRAdvisorVault',(accounts) => {
    let reservedWallet = accounts[1];
    let advisorWallet = accounts[2];
    let owner = accounts[0];

    const advisorVault_balance = new BigNumber(10e6 * 1e18);

    // Provide gotTokenInstance for every test case
    let rkrTokenInstance;
    let advisorVaultInstance;


    beforeEach(async () => {
        rkrTokenInstance = await RKRToken.deployed();
        advisorVaultInstance = await AdvisorVault.deployed();
    });

    it('should check balance vault is correct', async () => {
        let balance = await rkrTokenInstance.balanceOf(advisorVaultInstance.address);
        balance.should.be.bignumber.equal(advisorVault_balance);
    });

    it('should not release any token', async () => {
        let balanceBefore = await rkrTokenInstance.balanceOf(advisorWallet);
        await expectThrow(advisorVaultInstance.release());
        let balanceAfter = await rkrTokenInstance.balanceOf(advisorWallet);
        balanceBefore.should.be.bignumber.equal(balanceAfter);
    });

    it('should increase time to first unlock period', async () => {
        let expectedBalance = new BigNumber(5e6 * 1e18);
        let balanceBefore = await rkrTokenInstance.balanceOf(advisorWallet);
        log.info('[ balanceBefore ]' + balanceBefore);
        await waitNDays(365);
        await advisorVaultInstance.release();
        let balanceAfter = await rkrTokenInstance.balanceOf(advisorWallet);
        log.info('[ balanceAfter ]' + balanceAfter);
        balanceAfter.should.be.bignumber.equal(expectedBalance);
    });

    it('should increase time to second unlock period', async () => {
        let expectedBalance = new BigNumber(7.5e6 * 1e18);
        let balanceBefore = await rkrTokenInstance.balanceOf(advisorWallet);
        log.info('[ balanceBefore ]' + balanceBefore);
        await waitNDays(177);
        await advisorVaultInstance.release();
        let balanceAfter = await rkrTokenInstance.balanceOf(advisorWallet);
        log.info('[ balanceAfter ]' + balanceAfter);
        balanceAfter.should.be.bignumber.equal(expectedBalance);
    });

    it('should increase time to third unlock period', async () => {
        let expectedBalance = new BigNumber(10e6 * 1e18);
        let balanceBefore = await rkrTokenInstance.balanceOf(advisorWallet);
        log.info('[ balanceBefore ]' + balanceBefore);
        await waitNDays(179);
        await advisorVaultInstance.release();
        let balanceAfter = await rkrTokenInstance.balanceOf(advisorWallet);
        log.info('[ balanceAfter ]' + balanceAfter);
        balanceAfter.should.be.bignumber.equal(expectedBalance);

        let balanceContract = await rkrTokenInstance.balanceOf(advisorVaultInstance.address);
        balanceContract.should.be.bignumber.equal(new BigNumber(0));
    });

  
});
