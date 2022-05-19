const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("WIP", function () {
  it("Should test something", async function () {
    const [deployer, bob, alice] = await hre.ethers.getSigners();

    
    const GetSponsorETH = await ethers.getContractFactory("GetSponsorETH");
    const getSponsorETH = await GetSponsorETH.deploy();
    await getSponsorETH.deployed();
    

    expect(await getSponsorETH.ownerOf(1)).to.eq(ethers.constants.AddressZero);
    // create a sponsor
    const tx = await getSponsorETH.createSponsor("Create a loans protocol");
    await tx.wait()

    expect(await getSponsorETH.ownerOf(1)).to.eq(deployer.address);

    // fund it

  });
});
