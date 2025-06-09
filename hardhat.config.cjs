require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const config = {
  solidity: {
    version: "0.8.26",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  networks: {
    polygonAmoy: {
      url: "https://polygon-amoy.infura.io/v3/177ab83a187a45a3a5cfd8ebd83742b7",
      accounts: [`0x${process.env.PVTKEY}`],
    },
    holesky: {
      url: "https://1rpc.io/holesky",
      chainId: 17000,
      accounts: [`0x${process.env.PVTKEY}`],
      gasMultiplier: 5,
      gas: 1000000,
    },
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    bsctestnet: {
      url: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
      accounts: [`0x${process.env.PVTKEY}`],
    },
    bscmainnet: {
      url: "https://bsc-dataseed1.defibit.io/",
      accounts: [`0x${process.env.PVTKEY}`],
    },
  },
  etherscan: {
    apiKey: {
      polygonAmoy: "B41A5A1U4W4ZK1VPKK412BMG5VRXEK2NTQ",
      holesky: "JI9RFSWDE68PJNJJN797AEQ44ABT5YEXJ1",
      bscTestnet: "621ZYIAF485F6MKAH4I1TP55MHAJTXIR5H",
    },
    customChains: [
      {
        network: "polygonAmoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://amoy.polygonscan.com/",
        },
      },
      {
        network: "holesky",
        chainId: 17000,
        urls: {
          apiURL: "https://api-holesky.etherscan.io/api",
          browserURL: "https://holesky.etherscan.io",
        },
      },
    ],
  },
};

module.exports = config;
