// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat')

async function main() {
	// Hardhat always runs the compile task when running scripts with its command
	// line interface.
	//
	// If this script is run directly using `node` you may want to call compile
	// manually to make sure everything is compiled
	// await hre.run('compile');

	// We get the contract to deploy
	// const NFTMarket = await hre.ethers.getContractFactory('NFTMarket')
	// const nftMarket = await NFTMarket.deploy()
	// // await nftMarket.deployed()
	// console.log('NFTMarket deployed to:', nftMarket.address)

	// const NFT = await hre.ethers.getContractFactory('NFT')
	// const nft = await NFT.deploy('0x2E6e48483b2479Fb9cF0445C69C537cb9fE37d8C')
	// await nft.deployed()
	// console.log('NFT deployed to:', nft.address)
	//
	// const VoteToken = await ethers.getContractFactory("NFTopia721Token")
	// const voteToken = await VoteToken.deploy("NFTopia721Token", "NFTOP")
	// await voteToken.deployed()
	// const voteTokenAddress = voteToken.address
	// console.log('vote token deployed to:', voteTokenAddress)
	//
	const Governor = await ethers.getContractFactory("NFTopiaGovernor")
    const governor = await Governor.deploy("NFTopiaGovernor", "0x00044315548176c79b3f1f3e148c3ee483d4a5b7", 0, 100, 0)
	await governor.deployed()
	const governorAddress = governor.address
	console.log('governor deployed to:', governorAddress)
 }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
