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

  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: ["0xca8fa8f0b631ecdb18cda619c4fc9d197c8affca"], // eth whale
  });

  const [signer, sponsor] = await hre.ethers.getSigners();
  // const sponsor = await hre.ethers.getSigner(
  //   "0xca8fa8f0b631ecdb18cda619c4fc9d197c8affca"
  // );

  const WETH = new hre.ethers.Contract(WETH_ADDRESS, WETHABI, provider);
  const aWETH = new hre.ethers.Contract(aWETH_ADDRESS, ERC20ABI, provider);
  const signerBal = await provider.getBalance(signer.address);
  console.log(signerBal);

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
  const owner = await sponsoreth.ownerOf(1);
  console.log("owner:", owner);
  console.log(sponsoreth.address);

  await WETH.connect(sponsor).approve(
    sponsoreth.address,
    ethers.utils.parseEther("1000000")
  );
  console.log("approved");
  const signeETHBalBefore = await provider.getBalance(signer.address);
  console.log(signeETHBalBefore);
  await sponsoreth
    .connect(sponsor)
    .fund(1, ethers.constants.AddressZero, true, 200, "", "", {
      value: ethers.utils.parseEther("10"),
    });

  const signeETHBalAfter = await provider.getBalance(signer.address);
  console.log(signeETHBalAfter - signeETHBalBefore);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
