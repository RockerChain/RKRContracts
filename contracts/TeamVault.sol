/**
 * @title RKR TeamVault Vault
 *
 * @version 1.0
 * @author Rockerchain
 */
pragma solidity ^0.4.21;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./RKRToken.sol";


contract TeamVault {
    using SafeMath for uint256;
    using SafeERC20 for RKRToken;

    // key: team member wallet address; value: amount of token .
    mapping(address => uint256) public team_amounts_unreleased;
    mapping(address => uint256) public team_amounts_released;

    RKRToken public token;
    uint256 public start;
    uint256 public offset = 360 days;
    uint256 public released;
    /**
     * @dev Constructor.
     * @param _token The RKR Token, which is being vested.
     */
    constructor(
        address _token
    )
        public
    {
        token = RKRToken(_token);
        start = block.timestamp;
        team_amounts_unreleased[address(0x365c571424a3Fe44799179d38bc38979f35ec7Bc)] = 1.5e6 * 1e18;
        team_amounts_unreleased[address(0x97F52761320F55d7a6b6030a211948de616FDc10)] = 1.5e6 * 1e18;
        team_amounts_unreleased[address(0x22676C0d8Fa7242C5AFbA6d66060ef4A9113Fa41)] = 1.5e6 * 1e18;
        team_amounts_unreleased[address(0xe105679D4Ad6FB5B50252e532c2D265281486C05)] = 5.5e6 * 1e18;
    }

    /**
     * @dev Transfers vested tokens to Reserved Wallet.
     */
    function release() public {
        release(msg.sender);
    }

        /**
     * @dev Transfers vested tokens to Reserved Wallet.
     * @param receiver address to send the token to.
     */
    function release(address receiver) public {
        require(block.timestamp > start.add(offset));
        uint256 unreleased = availableAmount(receiver);
        require(unreleased > 0);
        team_amounts_released[receiver] = unreleased;
        token.safeTransfer(receiver, unreleased);
    }

    /**
     * @dev Calculates the amount that has not yet released.
      * @param receiver address to send the token to.
     */
    function availableAmount(address receiver) public view returns (uint256) {
        uint256 vestedAmount = team_amounts_unreleased[receiver];
        uint256 releasedAmount = team_amounts_released[receiver];
        return vestedAmount.sub(releasedAmount);
    }

    
}

