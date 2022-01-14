require('@nomiclabs/hardhat-waffle')
const dotenv = require('dotenv')

dotenv.config()

const privateKey = process.env.TEST_PRIVATE_KEY
console.log(privateKey)
const projectId = process.env.INFURA_PROJECT_ID
console.log(privateKey)

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();
//
//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });



// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	networks:{
		hardhat: {
			chainId: 1337
		},
		mumbai: {
			url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
			accounts: [privateKey]
		},
		mainnet: {
			url: `https://polygon-mainnet.infura.io/v3/${projectId}`,
			accounts: [privateKey]
		}
	},
	solidity: '0.8.4',
	paths: {
		sources: './contracts',
		tests: './test',
		cache: './cache',
		artifacts: './artifacts'
	},
}
