//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Allow staking
// Aave staking

contract GetSponsorETH is Ownable {
    // example strategy detail
    struct SponsorshipDetail {
        uint id;
        uint startTime;
        uint timeToExpiry;
        string pledge;
        bool isPerpetual;
    }

    uint constant MAX_TIME_TO_EXPIRY = 365 days;

    mapping(uint256 => address) public ownerOf;
    mapping(uint256 => SponsorshipDetail) public sponsorships;
    mapping(address => bool) public isAllowedToken;
    mapping(address => uint) minAmountFund;
    uint256 _counter = 1;

    event NewSponsor(uint256 indexed idx, address indexed owner, string pledge);
    event Fund(
        uint256 indexed idx,
        address indexed from,
        string author,
        string message
    );
    event Config(uint256 indexed idx, string valName, string value);
    event TokenAllowanceUpdate(address token, bool isAllowed);

    constructor() {}

    function createSponsor(
        uint timeToExpiry,
        string calldata pledge,
        bool isPerpetual
    ) external {
        require(timeToExpiry <= MAX_TIME_TO_EXPIRY, "!max time");
        ownerOf[_counter] = msg.sender;
        emit NewSponsor(_counter, msg.sender, pledge);

        SponsorshipDetail memory details = SponsorshipDetail({
            id: _counter,
            startTime: block.timestamp,
            timeToExpiry: timeToExpiry,
            pledge: pledge,
            isPerpetual: isPerpetual
        });
        sponsorships[_counter] = details;

        unchecked {
            _counter++;
        }
    }

    function fund(
        uint sponsorshipId,
        address token,
        bool isStaking,
        uint amount,
        string calldata user,
        string calldata message
    ) external payable {
        require(isAllowedToken[token], "!allowed token");
        require(amount >= minAmountFund[token], "small amount");
        address _owner = ownerOf[sponsorshipId];
        require(_owner != address(0), "Sponsor not found");
        require(_isNotExpired(sponsorshipId), "expired");

        if (isStaking) {
            _fundWithStaking(_owner, msg.sender, token, amount);
        } else {
            _fund(_owner, msg.sender, token, amount);
        }
        payable(_owner).transfer(msg.value);
        emit Fund(sponsorshipId, msg.sender, user, message);
    }

    function config(
        uint256 sponsorId,
        string calldata valName,
        string calldata value
    ) public {
        require(ownerOf[sponsorId] == msg.sender, "not allowed");
        emit Config(sponsorId, valName, value);
    }

    function updateAllowed(
        address token,
        bool isAllowed,
        uint minAmount
    ) external onlyOwner {
        require(isAllowedToken[token] != isAllowed, "!update");
        isAllowedToken[token] = isAllowed;

        if (isAllowed) {
            minAmountFund[token] = minAmount;
        } else {
            minAmountFund[token] = 0;
        }

        emit TokenAllowanceUpdate(token, isAllowed);
    }

    function _fund(
        address receiver,
        address sender,
        address token,
        uint amount
    ) internal {}

    function _fundWithStaking(
        address receiver,
        address sender,
        address token,
        uint amount
    ) internal {}

    function _isNotExpired(uint sponsorshipId)
        internal
        returns (bool isExpired)
    {
        SponsorshipDetail memory details = sponsorships[sponsorshipId];
        isExpired =
            details.isPerpetual ||
            (details.startTime + details.timeToExpiry) < block.timestamp;
    }
}
