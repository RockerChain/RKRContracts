/**
 * @title RKR token
 *
 * @version 1.0
 * @author Rockerchain
 */
pragma solidity ^0.4.21;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";


contract RKRToken is ERC20, Ownable {
    using SafeMath for uint256;
    
    string public constant name = "RKRToken";
    string public constant symbol = "RKR";
    uint8 public constant decimals = 18;
    uint256 public constant UNLOCKED_SUPPLY = 36e6 * 1e18;
    uint256 public constant TEAM_SUPPLY = 10e6 * 1e18;
    uint256 public constant ADVISOR_SUPPLY = 10e6 * 1e18;
    uint256 public constant RESERVED_SUPPLY = 44e6 * 1e18;
    bool public ADVISOR_SUPPLY_INITIALIZED;
    bool public TEAM_SUPPLY_INITIALIZED;
    bool public RESERVED_SUPPLY_INITIALIZED;

     /**
     * @dev Constructor of RKRToken 
     */
    constructor() public {
        _mint(msg.sender, UNLOCKED_SUPPLY);
        ADVISOR_SUPPLY_INITIALIZED = false;
        TEAM_SUPPLY_INITIALIZED = false;
        RESERVED_SUPPLY_INITIALIZED = false;
    }

     /**
     * @dev Mints and initialize Advisor reserve 
     */
    function initializeAdvisorVault(address advisorVault) public onlyOwner {
        require(ADVISOR_SUPPLY_INITIALIZED == false);
        ADVISOR_SUPPLY_INITIALIZED = true;
        _mint(advisorVault, ADVISOR_SUPPLY);
    }

     /**
     * @dev Mints and initialize Team reserve 
     */
    function initializeTeamVault(address teamVault) public onlyOwner {
        require(TEAM_SUPPLY_INITIALIZED == false);
        TEAM_SUPPLY_INITIALIZED = true;
        _mint(teamVault, TEAM_SUPPLY);
    }

     /**
     * @dev Mints and initialize Reserved reserve 
     */
    function initializeReservedVault(address reservedVault) public onlyOwner {
        require(RESERVED_SUPPLY_INITIALIZED == false);
        RESERVED_SUPPLY_INITIALIZED = true;
        _mint(reservedVault, RESERVED_SUPPLY);
    }

}



