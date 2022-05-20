//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.4;

import "hardhat/console.sol";
import "./interfaces/ILendingPool.sol";
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
    mapping(address => address) aTokens;
    // Sponsorship id => Token => staker => amount
    mapping(uint => mapping(address => mapping(address => uint))) tokensStaked;
    mapping(uint => mapping(address => mapping(address => uint))) aTokensStaked;
    uint256 _counter = 1;

    // interface to interact with aToken
    ILendingPool public lendingPool;

    event NewSponsor(uint256 indexed idx, address indexed owner, string pledge);
    event Fund(
        uint256 indexed idx,
        address indexed token,
        address indexed from,
        bool isStaking,
        string author,
        string message
    );
    event Config(uint256 indexed idx, string valName, string value);
    event TokenAllowanceUpdate(address token, bool isAllowed);
    event StakeWithdrawn(
        uint indexed sponsorshipId,
        address indexed token,
        address indexed staked
    );

    constructor(address _lendingPool) {
        lendingPool = ILendingPool(_lendingPool);
    }

    function createSponsor(
        uint timeToExpiry,
        string calldata pledge,
        bool isPerpetual,
        string[] calldata configs
    ) external {
        ownerOf[_counter] = msg.sender;
        emit NewSponsor(_counter, msg.sender, pledge);

        SponsorshipDetail memory details = SponsorshipDetail({
            id: _counter,
            startTime: block.timestamp,
            timeToExpiry: block.timestamp + timeToExpiry,
            pledge: pledge,
            isPerpetual: isPerpetual
        });
        sponsorships[_counter] = details;

        if (configs % 2 == 0) {
            for(uint16 i = 0; i < configs.length; i += 2) {
                // if there is any base configuration lets submit it
                emit Config(_counter, configs[i], configs[i+1]);
            }
        }

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
        require(_isNotExpired(sponsorshipId), "expired");

        if (isStaking) {
            _fundWithStaking(sponsorshipId, msg.sender, token, amount);
        } else {
            _fund(sponsorshipId, msg.sender, token, amount);
        }

        emit Fund(sponsorshipId, token, msg.sender, isStaking, user, message);
    }

    function withdrawStake(uint sponsorshipId, address token) external {
        uint stake = aTokensStaked[sponsorshipId][token][msg.sender];
        require(stake > 0, "No Stake");
        address owner = ownerOf[sponsorshipId];
        uint balanceBefore = IERC20(token).balanceOf(address(this));
        lendingPool.withdraw(token, stake, address(this));
        uint balanceAfter = IERC20(token).balanceOf(address(this));
        uint stakerBalance = tokensStaked[sponsorshipId][token][msg.sender];
        uint tokenTosendToOwner = balanceAfter - balanceBefore - stakerBalance;

        // update mappings
        aTokensStaked[sponsorshipId][token][msg.sender] = 0;
        tokensStaked[sponsorshipId][token][msg.sender] = 0;

        IERC20(token).transfer(owner, tokenTosendToOwner);
        IERC20(token).transfer(msg.sender, stakerBalance);

        emit StakeWithdrawn(sponsorshipId, token, msg.sender);
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
        address aToken,
        bool isAllowed,
        uint minAmount
    ) external onlyOwner {
        require(isAllowedToken[token] != isAllowed, "!update");
        isAllowedToken[token] = isAllowed;

        if (isAllowed) {
            minAmountFund[token] = minAmount;
            IERC20(token).approve(address(lendingPool), type(uint256).max);
            aTokens[token] = aToken;
        } else {
            minAmountFund[token] = 0;
            IERC20(token).approve(address(lendingPool), 0);
        }

        emit TokenAllowanceUpdate(token, isAllowed);
    }

    function _fund(
        uint sponsorshipId,
        address sender,
        address token,
        uint amount
    ) internal {
        address owner = ownerOf[sponsorshipId];
        require(owner != address(0), "Sponsor not found");
        require(
            IERC20(token).transferFrom(sender, owner, amount),
            "transfer failed"
        );
    }

    function _fundWithStaking(
        uint sponsorshipId,
        address sender,
        address token,
        uint amount
    ) internal {
        address owner = ownerOf[sponsorshipId];
        require(owner != address(0), "Sponsor not found");

        // Mint aToken and send it to contract address
        address aToken = aTokens[token];
        uint aBalanceBefore = IERC20(aToken).balanceOf(address(this));
        lendingPool.deposit(token, amount, address(this), 0);
        uint mintAmount = IERC20(aToken).balanceOf(address(this)) -
            aBalanceBefore;
        tokensStaked[sponsorshipId][token][sender] += amount;
        aTokensStaked[sponsorshipId][token][sender] += mintAmount;
    }

    function _isNotExpired(uint sponsorshipId)
        internal
        view
        returns (bool isExpired)
    {
        SponsorshipDetail memory details = sponsorships[sponsorshipId];
        isExpired =
            details.isPerpetual ||
            (details.startTime + details.timeToExpiry) < block.timestamp;
    }
}
