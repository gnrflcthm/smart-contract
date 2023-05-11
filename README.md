# KickStarter Smart Contract
Smart Contract project for crowdsourcing funds.

# How To Deploy Contract
1. Install Contract Dependencies using `npm install` in the root directory.
2. Compile the contract using the command `npx hardhat compile`
3. Run the Test network using the command `npx hardhat node`
4. In a separate terminal, Deploy the contract using the `npx hardhat run scripts/deploy.ts --network localhost`

# How To Run The Client
1. Change your working directory from the root directory to the client folder (`cd client`)
2. Install dependencies using `npm install`
3. Run the client using `npm run dev` in a separate terminal