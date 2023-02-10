//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@solvprotocol/erc-3525/ERC3525.sol";



contract AdvaitaReward { 


  //contract deployer
  address public contract_owner;
  uint256 public contract_balance;


  event TransferReceived(address _from,uint _amount);
  event TransferSent(address _from,address _destAddr,uint _amount);

  
  constructor() {
    contract_owner = msg.sender;
  }

  //get token
  receive() payable external {
    contract_balance += msg.value;
    emit TransferReceived(msg.sender, msg.value);
  }

  //get contract balance
  function get_contract_balance(IERC721 tokenContractAddress) public view returns (uint) {
   
    uint256 erc20balance = tokenContractAddress.balanceOf(address(this));
    return erc20balance;
  }

  //reward token
  function transfer_erc20(IERC721 tokenContractAddress,address to,uint amount) public {
    
    //Only owner can set reward amount
    require(msg.sender == contract_owner,"Only owner can set reward amount");

    //get erc20 token balance
    uint256 erc20balance = tokenContractAddress.balanceOf(address(this));
    require(amount <= erc20balance,"Contract balance is low");

    //transfer
    tokenContractAddress.transfer(to,amount);
    emit TransferSent(msg.sender,to,amount);

  }

  // 1. define a ownership fund pool



  // 2. swap 

  function swap(ERC721 nft_address, uint256 token_id,ERC3525 snft_address, uint256 token_id) {

      
  }
  

}
