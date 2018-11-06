import {expectThrow, waitNDays, getEvents, BigNumber, increaseTimeTo} from './helpers/tools';
import {logger as log} from "./helpers/logger";

const RKRToken = artifacts.require('./RKRToken.sol');
const ReservedVault = artifacts.require('./ReservedVault.sol');

const should = require('chai') // eslint-disable-line
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

contract('RKRReservedVault',(accounts) => {
    let reservedWallet = accounts[1];
    let owner = accounts[0];

    const reservedVault_balance = new BigNumber(44e6 * 1e18);

    // Provide gotTokenInstance for every test case
    let rkrTokenInstance;
    let reservedVaultInstance;


    beforeEach(async () => {
        rkrTokenInstance = await RKRToken.deployed();
        reservedVaultInstance = await ReservedVault.deployed();
    });

    it('should check balance vault is correct', async () => {
        let balance = await rkrTokenInstance.balanceOf(reservedVaultInstance.address);
        balance.should.be.bignumber.equal(reservedVault_balance);
    });

    it('should not release any token', async () => {
        let balanceBefore = await rkrTokenInstance.balanceOf(reservedWallet);
        await expectThrow(reservedVaultInstance.release());
        let balanceAfter = await rkrTokenInstance.balanceOf(reservedWallet);
        balanceBefore.should.be.bignumber.equal(balanceAfter);
    });

    it('should increase time to first unlock period', async () => {
        let expectedBalance = new BigNumber(8.8e6 * 1e18);
        let balanceBefore = await rkrTokenInstance.balanceOf(reservedWallet);
        log.info('[ balanceBefore ]' + balanceBefore);
        await waitNDays(91);
        await reservedVaultInstance.release();
        let balanceAfter = await rkrTokenInstance.balanceOf(reservedWallet);
        log.info('[ balanceAfter ]' + balanceAfter);
        balanceAfter.should.be.bignumber.equal(expectedBalance);
    });

    it('should increase time to second unlock period', async () => {
        let expectedBalance = new BigNumber(17.6e6 * 1e18);
        let balanceBefore = await rkrTokenInstance.balanceOf(reservedWallet);
        log.info('[ balanceBefore ]' + balanceBefore);
        await waitNDays(90);
        await reservedVaultInstance.release();
        let balanceAfter = await rkrTokenInstance.balanceOf(reservedWallet);
        log.info('[ balanceAfter ]' + balanceAfter);
        balanceAfter.should.be.bignumber.equal(expectedBalance);
    });

    it('should increase time to third unlock period', async () => {
        let expectedBalance = new BigNumber(26.4e6 * 1e18);
        let balanceBefore = await rkrTokenInstance.balanceOf(reservedWallet);
        log.info('[ balanceBefore ]' + balanceBefore);
        await waitNDays(90);
        await reservedVaultInstance.release();
        let balanceAfter = await rkrTokenInstance.balanceOf(reservedWallet);
        log.info('[ balanceAfter ]' + balanceAfter);
        balanceAfter.should.be.bignumber.equal(expectedBalance);
    });

    it('should increase time to fourh unlock period', async () => {
        let expectedBalance = new BigNumber(35.2e6 * 1e18);
        let balanceBefore = await rkrTokenInstance.balanceOf(reservedWallet);
        log.info('[ balanceBefore ]' + balanceBefore);
        await waitNDays(90);
        await reservedVaultInstance.release();
        //should call 2 times without problem
        //await reservedVaultInstance.release();
        let balanceAfter = await rkrTokenInstance.balanceOf(reservedWallet);
        log.info('[ balanceAfter ]' + balanceAfter);
        balanceAfter.should.be.bignumber.equal(expectedBalance);
    });

    it('should throw if there are not token to releae', async () => {
        await expectThrow(reservedVaultInstance.release());
    });

    it('should increase time to fifth unlock period', async () => {
        let expectedBalance = new BigNumber(44e6 * 1e18);
        let balanceBefore = await rkrTokenInstance.balanceOf(reservedWallet);
        log.info('[ balanceBefore ]' + balanceBefore);
        await waitNDays(90);
        await reservedVaultInstance.release();
        let balanceAfter = await rkrTokenInstance.balanceOf(reservedWallet);
        log.info('[ balanceAfter ]' + balanceAfter);
        balanceAfter.should.be.bignumber.equal(expectedBalance);

        let balanceContract = await rkrTokenInstance.balanceOf(reservedVaultInstance.address);
        balanceContract.should.be.bignumber.equal(new BigNumber(0));
    });
  
});
