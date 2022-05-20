require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/xXu9KRGXH4MBBGzilL8sb6kneGzZSK2p",
        blockNumber: 14807328,
      },
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  etherscan: {
    apiKey: {
      //polygonMumbai: process.env.ETHERSCANKEY,
      //polygon: process.env.ETHERSCANKEY,
    },
  },
  abiExporter: {
    path: "./data/abi",
    clear: true,
    // flat: true,
    only: [":GetSponsorETH$"],
  },
};
