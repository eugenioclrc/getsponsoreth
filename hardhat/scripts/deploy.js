// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");


async function main() {
  
  const GetSponsorETH = await ethers.getContractFactory("GetSponsorETH");
  // 0x9198F13B08E299d85E096929fA9781A1E3d5d827 mumbai lending pool
  // source https://docs.aave.com/developers/v/2.0/deployed-contracts/matic-polygon-market
  const getSponsorETH = await GetSponsorETH.deploy("0x9198F13B08E299d85E096929fA9781A1E3d5d827");
  await getSponsorETH.deployed();

  await getSponsorETH.deployed();

  console.log("Sponsoreth deployed to:", getSponsorETH.address);

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
