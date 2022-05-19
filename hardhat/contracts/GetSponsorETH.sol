//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract GetSponsorETH {

    mapping(uint256 => address) public ownerOf;
    uint256 _counter = 1;

    event NewSponsor(uint256 indexed, address indexed owner, string pledge);
    event Fund(uint256 indexed, address indexed from, string author, string message);
    event Config(uint256 indexed, string valName, string value);

    
    constructor() {
    }

    function createSponsor(string calldata pledge) external {
        ownerOf[_counter] = msg.sender;
        emit NewSponsor(_counter, msg.sender, pledge);
        unchecked { _counter++; }
    }

    function fund(uint sponsorId, string calldata user, string calldata message) external payable {
        address _owner = ownerOf[sponsorId];
        require(_owner != address(0), "Sponsor not found");
        payable(_owner).transfer(msg.value);
        emit Fund(sponsorId, msg.sender, user, message);
    }

    function config(uint256 sponsorId, string calldata valName, string calldata value) {
        require(ownerOf[sponsorId] == msg.sender, "not allowed");
        emit Config(sponsorId, valName, value);
    }
}
