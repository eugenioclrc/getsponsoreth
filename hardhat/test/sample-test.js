const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("WIP", function () {
  it("Should test something", async function () {
    const [deployer, bob, alice] = await hre.ethers.getSigners();

    
    const GetSponsorETH = await ethers.getContractFactory("GetSponsorETH");
    // 0x9198F13B08E299d85E096929fA9781A1E3d5d827 mumbai lending pool
    // source https://docs.aave.com/developers/v/2.0/deployed-contracts/matic-polygon-market
    const getSponsorETH = await GetSponsorETH.deploy("0x9198F13B08E299d85E096929fA9781A1E3d5d827");
    await getSponsorETH.deployed();
    

    expect(await getSponsorETH.ownerOf(1)).to.eq(ethers.constants.AddressZero);
    // create a sponsor
    const tx = await getSponsorETH.createSponsor(0, "Create a loans protocol", true, []);
    await tx.wait()

    expect(await getSponsorETH.ownerOf(1)).to.eq(deployer.address);

    // fund it

  });
});
