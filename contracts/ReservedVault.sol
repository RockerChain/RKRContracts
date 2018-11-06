/**
 * @title RKR ReservedVault Vault
 *
 * @version 1.0
 * @author Rockerchain
 */
pragma solidity ^0.4.21;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./RKRToken.sol";


contract ReservedVault {
    using SafeMath for uint256;
    using SafeERC20 for RKRToken;

    uint256[5] public vesting_offsets = [
        90 days,
        180 days,
        270 days,
        360 days,
        450 days
    ];

    uint256[5] public vesting_amounts = [
        8.8e6 * 1e18,
        8.8e6 * 1e18,
        8.8e6 * 1e18,
        8.8e6 * 1e18,
        8.8e6 * 1e18
    ];

    address public reservedWallet;
    RKRToken public token;
    uint256 public start;
    uint256 public released;

    /**
     * @dev Constructor.
     * @param _reservedWallet The address that will receive the vested tokens.
     * @param _token The RKR Token, which is being vested.
     */
    constructor(
        address _reservedWallet,
        address _token
    )
        public
    {
        reservedWallet = _reservedWallet;
        token = RKRToken(_token);
        start = block.timestamp;
    }

    /**
     * @dev Transfers vested tokens to Reserved Wallet.
     */
    function release() public {
        uint256 unreleased = releasableAmount();
        require(unreleased > 0);

        released = released.add(unreleased);

        token.safeTransfer(reservedWallet, unreleased);
    }

    /**
     * @dev Calculates the amount that has already vested but hasn't been released yet.
     */
    function releasableAmount() public view returns (uint256) {
        return vestedAmount().sub(released);
    }

    /**
     * @dev Calculates the amount that has already vested.
     */
    function vestedAmount() public view returns (uint256) {
        uint256 vested = 0;
        for (uint256 i = 0; i < vesting_offsets.length; i = i.add(1)) {
            if (block.timestamp > start.add(vesting_offsets[i])) {
                vested = vested.add(vesting_amounts[i]);
            }
        }
        return vested;
    }
    
    /**
     * @dev Calculates the amount that has not yet released.
     */
    function unreleasedAmount() public view returns (uint256) {
        uint256 unreleased = 0;
        for (uint256 i = 0; i < vesting_offsets.length; i = i.add(1)) {
            unreleased = unreleased.add(vesting_amounts[i]);
        }
        return unreleased.sub(released);
    }
}

