const hre = require("hardhat");

async function main() {
  const { ethers } = hre;
  const provider = ethers.provider;
  const lendingPool = "0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9"; // mainnet address
  const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const aWETH_ADDRESS = "0x030bA81f1c18d280636F32af80b9AAd02Cf0854e";
  const Sponsoreth = await hre.ethers.getContractFactory("GetSponsorETH");
  const sponsoreth = await Sponsoreth.deploy(lendingPool, WETH_ADDRESS);

  await sponsoreth.deployed();

  console.log("Sponsoreth deployed to:", sponsoreth.address);

  const ERC20ABI = require("../abis/ERC20.json");
  const WETHABI = require("../abis/weth.json");

  const [signer, sponsor] = await hre.ethers.getSigners();
  const WETH = new hre.ethers.Contract(WETH_ADDRESS, WETHABI, provider);
  const aWETH = new hre.ethers.Contract(aWETH_ADDRESS, ERC20ABI, provider);

  const timeToExpiry = 365 * 24 * 60 * 60;
  const pledge = "I will make an on-chain CTF";
  const isPerpetual = false;

  await sponsoreth.updateAllowed(WETH_ADDRESS, aWETH_ADDRESS, true, 100);
  console.log("WETH allowed");

  const isWETHAllowed = await sponsoreth.isAllowedToken(WETH_ADDRESS);
  console.log("DAI ALLOWED:", isWETHAllowed);

  await sponsoreth.createSponsor(timeToExpiry, pledge, isPerpetual, [
    "hi",
    "yeah",
  ]);
  console.log("Sponsorship created");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
