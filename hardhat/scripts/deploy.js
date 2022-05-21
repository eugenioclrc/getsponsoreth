const { ethers } = require("hardhat");
const hre = require("hardhat");
const provider = ethers.provider;

async function main() {
  const lendingPool = "0xe0fba4fc209b4948668006b2be61711b7f465bae"; // mainnet address
  const Sponsoreth = await hre.ethers.getContractFactory("GetSponsorETH");
  const sponsoreth = await Sponsoreth.deploy(lendingPool);

  await sponsoreth.deployed();

  console.log("Sponsoreth deployed to:", sponsoreth.address);

  const DAI_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";
  const aDAI_ADDRESS = "0xfC1E690f61EFd961294b3e1Ce3313fBD8aa4f85d";
  const ERC20ABI = require("../abis/ERC20.json");

  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: ["0xb60c61dbb7456f024f9338c739b02be68e3f545c"], // dai whale
  });

  const [signer] = await ethers.getSigners();
  const sponsor = await ethers.getSigner(
    "0xb60c61dbb7456f024f9338c739b02be68e3f545c"
  );

  const DAI = new ethers.Contract(DAI_ADDRESS, ERC20ABI, provider);
  const aDAI = new ethers.Contract(aDAI_ADDRESS, ERC20ABI, provider);
  const signerBal = await provider.getBalance(signer.address);
  console.log(signerBal);

  const timeToExpiry = 365 * 24 * 60 * 60;
  const pledge = "I will make an on-chain CTF";
  const isPerpetual = false;

  await sponsoreth.updateAllowed(DAI_ADDRESS, aDAI_ADDRESS, true, 100);
  console.log("DAI allowed");

  const isDAIAllowed = await sponsoreth.isAllowedToken(DAI_ADDRESS);
  console.log("DAI ALLOWED:", isDAIAllowed);

  await sponsoreth.createSponsor(timeToExpiry, pledge, isPerpetual);
  console.log("Sponsorship created");
  const owner = await sponsoreth.ownerOf(1);
  console.log("owner:", owner);

  await DAI.connect(sponsor).approve(
    sponsoreth.address,
    ethers.utils.parseEther("1000000")
  );
  await sponsoreth.connect(sponsor).fund(1, DAI_ADDRESS, false, 200, "", "");

  const signeDAIBal = await DAI.balanceOf(signer.address);
  console.log(signeDAIBal);

  await sponsoreth
    .connect(sponsor)
    .fund(1, DAI_ADDRESS, true, ethers.utils.parseEther("100000"), "", "");

  const sponsorETHaDAIBal = await aDAI.balanceOf(sponsoreth.address);
  console.log(sponsorETHaDAIBal / 10 ** 18);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
