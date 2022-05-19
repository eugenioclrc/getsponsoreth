const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("WIP", function () {
  it("Should test something", async function () {
    const GetSponsorETH = await ethers.getContractFactory("GetSponsorETH");
    const getSponsorETH = await GetSponsorETH.deploy();
    await greeter.getSponsorETH();

    // create a sponsor
    // fund it

  });
});
