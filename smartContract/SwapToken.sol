// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;


import "./ThesisErc20.sol";

/**
 * @title TruongThesisERC20
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */


contract SwapToken {

    address public owner;
    mapping(address => uint256) public rate; // 10^18 eth = ?? erc20


   constructor() {
       owner = msg.sender;
   }

    modifier isFromOwner(){
        require(msg.sender == owner, "Not owner");
        _;
    }

  function changeOwner(address newOwner) public isFromOwner {
      owner = newOwner;
  }

  function setUpRate(address token, uint256 _rate) public isFromOwner() {
      rate[token] = _rate;
  }

  function swapToken(address token) payable public {
    
    uint256 convertedAmount = msg.value * rate[token] / 10**18;
    require (convertedAmount> 0 , "Not set yet or user not send eth");

    (bool success,) = owner.call{value: msg.value}("");
    require (success, "send fail ");

    ThesisErc20(token).mintErc20(msg.sender, convertedAmount);
  }


}