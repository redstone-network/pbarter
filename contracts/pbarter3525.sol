// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@solvprotocol/erc-3525/ERC3525.sol";

contract ERC3525GettingStarted is ERC3525 {

  using Strings for uint256;
  address public owner;

    constructor(address owner_) 
        ERC3525("RedStoneNetwork", "RSN", 18) {
        owner = owner_;
        }

   function mint(address to_, uint256 slot_, uint256 amount_) external {
        require(msg.sender == owner, 
            "RedStoneNetwork: only owner can mint");
        _mint(to_, slot_, amount_);
    }
}