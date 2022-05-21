// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");


async function main() {
  const lendingPool = "0xe0fba4fc209b4948668006b2be61711b7f465bae"; // mainnet address
  const Sponsoreth = await ethers.getContractFactory("GetSponsorETH");
  const sponsoreth = await Sponsoreth.deploy(lendingPool);

  await sponsoreth.deployed();

  console.log("Sponsoreth deployed to:", sponsoreth.address);

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
