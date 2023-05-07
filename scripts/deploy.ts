import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const targetValue = ethers.utils.parseEther("0.1");

  const Kickstarter = await ethers.getContractFactory("KickStarter");
  const kickstarter = await Kickstarter.deploy(targetValue);

  await kickstarter.deployed();

  console.log(
    `Lock with ${ethers.utils.formatEther(targetValue)}ETH and unlock timestamp ${unlockTime} deployed to ${kickstarter.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});