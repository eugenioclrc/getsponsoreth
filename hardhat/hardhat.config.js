require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-abi-exporter");
require("dotenv").config();

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
        url: "https://eth-mainnet.alchemyapi.io/v2/" + process.env.ALCHEMYKEY,
      },
    },
    mumbai: {
      url: process.env.MUMBAI_RPC || "https://rpc-mumbai.matic.today/",
      chainId: 80001,
      accounts: process.env.PRIVATEKEY ? [process.env.PRIVATEKEY] : undefined,
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
      polygonMumbai: process.env.ETHERSCANKEY,
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
