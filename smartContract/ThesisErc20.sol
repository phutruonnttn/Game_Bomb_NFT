// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title TruongThesisERC20
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */


contract ThesisErc20 is ERC20{

    address public owner;

    mapping(address => bool) public whitelistContract;

    //event 
    event AddWhitelistSuccess(address newWallet);
    event RemoveWhitelistSuccess(address oldWallet);
    constructor() ERC20("Thesis ERC20", "Thesis20"){
        owner = msg.sender;
    }

    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        address spender = _msgSender();
        if (!whitelistContract[spender]){
                _spendAllowance(from, spender, amount);
        }
        _transfer(from, to, amount);
        return true;
    }

    modifier isFromOwner(){
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier isFromWhitelist(){
        require(whitelistContract[msg.sender], "Not whitelist");
        _;
    }

    function changeOwner(address newOwner) public isFromOwner {
        owner = newOwner;
    }

    function addWhitelist(address newWhitelist) public isFromOwner(){
        require(!whitelistContract[newWhitelist], "Already on whitelist");
        whitelistContract[newWhitelist] = true;

        emit AddWhitelistSuccess(newWhitelist);
    }

    function removeWhitelist(address oldWhitelist) public isFromOwner(){
        require(whitelistContract[oldWhitelist], "Address not found");
        whitelistContract[oldWhitelist] = false;

        emit RemoveWhitelistSuccess(oldWhitelist);
    }

    function mintErc20(address toAddress, uint256 amount) public isFromWhitelist(){
        _mint(toAddress, amount);
    }

}