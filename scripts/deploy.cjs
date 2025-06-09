const { ethers } = require("hardhat");

async function main() {
  const ChatApp = await ethers.deployContract("ChatApp");
  console.log("The Address of the Chatting App is: ", ChatApp.target);
}

main().catch((error) => {
  console.error(error);
});

// Deployment Code
// https://holesky.etherscan.io/address/0x1b31678F0cF4fc6De77c58a2db618c1EfaC7Ca15#code