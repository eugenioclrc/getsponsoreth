//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.4;

import "./interfaces/ILendingPool.sol";
import "./interfaces/IWETH.sol";
import "./SponsoredPools.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

// Allow staking
// Aave staking

contract GetSponsorETH is Ownable, ERC1155 {
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
    mapping(uint => SponsoredPools) public sponsoredPools;
    mapping(uint256 => SponsorshipDetail) public sponsorships;
    mapping(address => bool) public isAllowedToken;
    mapping(address => uint) minAmountFund;
    mapping(address => address) aTokens;
    uint256 _counter = 1;

    // interface to interact with aToken
    ILendingPool public lendingPool;
    IWETH public weth;

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
    event Claimed(uint indexed sponsorshipId, address indexed token);

    constructor(address _lendingPool, address _weth, address _aweth) ERC1155("SPONSORETH") {
        lendingPool = ILendingPool(_lendingPool);
        weth = IWETH(_weth);
        isAllowedToken[address(weth)] = true;
        aTokens[_weth] = _aweth;
        IERC20(_weth).approve(address(lendingPool), type(uint).max);
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
            timeToExpiry: timeToExpiry,
            pledge: pledge,
            isPerpetual: isPerpetual
        });
        sponsorships[_counter] = details;

        SponsoredPools sp = new SponsoredPools();
        sp.init(lendingPool, payable(address(this)), msg.sender);
        sponsoredPools[_counter] = sp;

        setConfigs(_counter, configs);

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
        require(_isNotExpired(sponsorshipId), "expired");
        if (token != address(0)) {
            _fundWithToken(sponsorshipId, token, isStaking, amount);
        } else {
            if (isStaking) {
                amount = msg.value;
                weth.deposit{value: amount}();
                token = address(weth);
                require(isAllowedToken[token], "!allowed token");
                require(amount >= minAmountFund[token], "small amount");
                // get sponsored pool
                SponsoredPools sp = sponsoredPools[sponsorshipId];
                // Mint aToken and send it to contract address
                lendingPool.deposit(token, amount, address(sp), 0);
                sp.stake(msg.sender, token, amount);
            } else {
                payable(ownerOf[sponsorshipId]).transfer(msg.value);
            }
        }

        _mint(msg.sender, sponsorshipId, 1, "");

        emit Fund(sponsorshipId, token, msg.sender, isStaking, user, message);

        _mint(msg.sender, sponsorshipId, 1, "");
    }

    function withdrawStake(uint sponsorshipId, address token) external {
        SponsoredPools sp = sponsoredPools[sponsorshipId];
        sp.unstake(msg.sender, token);
        emit StakeWithdrawn(sponsorshipId, token, msg.sender);
    }

    function claim(uint sponsorshipId, address token) external {
        SponsoredPools sp = sponsoredPools[sponsorshipId];
        address aToken = aTokens[token];
        sp.claim(token, aToken);
        emit Claimed(sponsorshipId, token);
    }

    function setConfigs(uint256 sponsorId, string[] calldata configs) public {
        require(configs.length % 2 == 0, "Invalid configs val");
        require(ownerOf[sponsorId] == msg.sender, "not allowed");
        for (uint256 i = 0; i < configs.length; ) {
            emit Config(sponsorId, configs[i], configs[i + 1]);
            unchecked {
                i += 2;
            }
        }
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
        require(
            IERC20(token).transferFrom(sender, address(this), amount),
            "transfer failed"
        );

        // get sponsored pool
        SponsoredPools sp = sponsoredPools[sponsorshipId];
        // Mint aToken and send it to contract address
        lendingPool.deposit(token, amount, address(sp), 0);
        sp.stake(sender, token, amount);
    }

    function _fundWithToken(
        uint sponsorshipId,
        address token,
        bool isStaking,
        uint amount
    ) internal {
        require(isAllowedToken[token], "!allowed token");
        require(amount >= minAmountFund[token], "small amount");
        if (isStaking) {
            _fundWithStaking(sponsorshipId, msg.sender, token, amount);
        } else {
            _fund(sponsorshipId, msg.sender, token, amount);
        }
    }

    function _isNotExpired(uint sponsorshipId)
        internal
        view
        returns (bool isExpired)
    {
        SponsorshipDetail memory details = sponsorships[sponsorshipId];
        isExpired =
            details.isPerpetual ||
            (details.startTime + details.timeToExpiry) > block.timestamp;
    }

    function getClaim(uint sponsorshipId, address token)
        public
        view
        returns (uint claimAmount)
    {
        // get sponsored pool
        SponsoredPools sp = sponsoredPools[sponsorshipId];
        address aToken = aTokens[token];
        claimAmount = sp.claimable(token, aToken);
    }

    receive() external payable {}
}
