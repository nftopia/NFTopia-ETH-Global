const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarket", function () {
  it("Can handle end to end market place test", async function () {
    const Market = await ethers.getContractFactory("NFTMarket")
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address

    const NFT = await ethers.getContractFactory("NFT")
    const nft = await NFT.deploy(marketAddress)
    await nft.deployed()
    const nftContractAddress = nft.address

    let listingPrice = await market.getListingPirce()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits('100', 'ether')

    await nft.createToken("https://www.test.com/tok1")
    await nft.createToken("https://www.test.com/tok2")

    await market.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice})
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice})

    const [_, buyerAddress] = await ethers.getSigners()
    await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice})

    let items = await market.fetchAllMarketItems()
    console.log('Raw items: ', items)

    items = await Promise.all(items.map(async i => {
        const tokenUri = await nft.tokenURI(i.tokenId)
        let item = {
          price: i.price.toString(),
          tokenId: i.tokenId.toString(),
          owner: i.owner,
          author: i.author,
          tokenUri
        }
        return item
    }))
    console.log('Verbosed items: ', items)
  });

  it("Can handle DAO pricing", async function () {

    const Market = await ethers.getContractFactory("NFTMarket")
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address

    const NFT = await ethers.getContractFactory("NFT")
    const nft = await NFT.deploy(marketAddress)
    await nft.deployed()
    const nftContractAddress = nft.address

    const VoteToken = await ethers.getContractFactory("PricerToken")
    const voteToken = await VoteToken.deploy()
    await voteToken.deployed()
    const voteTokenAddress = voteToken.address

    const Governor = await ethers.getContractFactory("PricerGovernor")
    const governor = await Governor.deploy(voteTokenAddress)
    await governor.deployed()
    const governorAddress = governor.address

    await nft.createToken("https://www.test.com/tok1")
    await nft.createToken("https://www.test.com/tok2")

    let listingPrice = await market.getListingPirce()
    listingPrice = listingPrice.toString()
    const auctionPrice = ethers.utils.parseUnits('100', 'ether')
    let daoSuggestedPrice = ethers.utils.parseUnits('30', 'ether')

    await market.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice})
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice})


    let item1 = await market.fetchMarketItem(1)
    let item2 = await market.fetchMarketItem(2)
    console.log("First item's current DAO suggested price is: " + item1.daoSuggestedPrice.toString())
    console.log("Second item's current DAO suggested price is: " + item2.daoSuggestedPrice.toString())
    console.log("current block number: " + await ethers.provider.getBlockNumber())




    const accounts = await ethers.getSigners()

    const balance = await voteToken.balanceOf(accounts[0].address)
    console.log("account 0 address: " + accounts[0].address)
    console.log("account 0 balance of pricer token: " + balance)

    await voteToken.delegate(accounts[0].address)

    console.log("current weight1 is: " + await voteToken.getVotes(accounts[0].address))
    console.log("current block number: " + await ethers.provider.getBlockNumber())

    const targetAddr = marketAddress

    const calldata = market.interface.encodeFunctionData('updateSuggestedPrice', [1, daoSuggestedPrice])

    console.log("current block number: " + await ethers.provider.getBlockNumber())

    const proposal_tx = await governor.propose(
        [targetAddr],
        [0],
        [calldata],
        "set dao suggested price for item 1"
    );

    console.log("current block number: " + await ethers.provider.getBlockNumber())

    const receipt = await proposal_tx.wait()

    await nft.createToken("https://www.test.com/tok3")
    await market.createMarketItem(nftContractAddress, 3, auctionPrice, { value: listingPrice})

    // console.log("Proposal receipt: ")
    // console.log(receipt)
    const proposalId = receipt.events[0].args.proposalId
    console.log("Proposal ID: " + receipt.events[0].args.proposalId)

    // https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/governance/IGovernor.sol#L14
    console.log("Proposal state: " + await governor.state(proposalId))

    console.log(await governor.hasVoted(proposalId, accounts[0].address))

    console.log("current block number: " + await ethers.provider.getBlockNumber())

    const cast_vote_tx = await governor.castVoteWithReason(proposalId, 1, "cause i like it")

    const voteReceipt = await cast_vote_tx.wait()

    await nft.createToken("https://www.test.com/tok4")
    // console.log("address 0 vote receipt")
    // console.log(voteReceipt)

    // TODO: aseert
    // const weight = voteReceipt.events[0].args.weight
    // console.log("proposal 1 weight: " + weight)


    console.log(await governor.hasVoted(proposalId, accounts[0].address))

    const result = await governor.proposalVotes(proposalId)
    console.log("voting result: " + result)

    const descriptionHash = ethers.utils.id("set dao suggested price for item 1");
    daoSuggestedPrice = ethers.utils.parseUnits('60', 'ether')
    const newCalldata = market.interface.encodeFunctionData('updateSuggestedPrice', [1, daoSuggestedPrice])

    // TODO: use ethers provider to mine blocks instead of creating a token
    await nft.createToken("https://www.test.com/tok5")
    console.log("current block number: " + await ethers.provider.getBlockNumber())

    // TODO: assert these values
    // console.log("Proposal state: " + await governor.state(proposalId))
    // console.log("Proposal snapshot: " + await governor.proposalSnapshot(proposalId))
    // console.log("Proposal deadline: " + await governor.proposalDeadline(proposalId))

    const execute_tx = await governor.execute(
        [targetAddr],
        [0],
        [newCalldata],
        descriptionHash
    );

    item1 = await market.fetchMarketItem(1)
    item2 = await market.fetchMarketItem(2)
    console.log("First item's current DAO suggested price is: " + item1.daoSuggestedPrice.toString())
    console.log("Second item's current DAO suggested price is: " + item2.daoSuggestedPrice.toString())


  });
});
