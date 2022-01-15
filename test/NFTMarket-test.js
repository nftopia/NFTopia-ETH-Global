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

    const VoteToken = await ethers.getContractFactory("NFTopia721Token")
    const voteToken = await VoteToken.deploy("NFTopia721Token", "NFTOP")
    
    await voteToken.deployed()
    const voteTokenAddress = voteToken.address

    console.log("NFTopia721 vote token onwer address: " + voteTokenAddress)
    
    const Governor = await ethers.getContractFactory("NFTopiaGovernor")
    const governor = await Governor.deploy("NFTopiaGovernor", voteToken.address, 0, 5, 60)
    await governor.deployed()
    const governorAddress = governor.address

    await nft.createToken("https://www.test.com/tok1")
    await nft.createToken("https://www.test.com/tok2")

    const accounts = await ethers.getSigners()

    const owner  = accounts[0].address
    await voteToken.mint(owner, 1)
    await voteToken.mint(owner, 2)
    await voteToken.mint(owner, 3)

    await voteToken.transferFrom(owner, accounts[1].address, 1)
    await voteToken.transferFrom(owner, accounts[1].address, 3)
    await voteToken.transferFrom(owner, accounts[2].address, 2)
    
    await voteToken.connect(accounts[1]).delegate(accounts[1].address, { from: accounts[1].address });
    await voteToken.connect(accounts[2]).delegate(accounts[2].address, { from: accounts[2].address });

    const balance0 = await voteToken.balanceOf(accounts[1].address)
    console.log("account[1] address: " + accounts[1].address)
    console.log("account[1]balance of pricer token: " + balance0)

    const balance1 = await voteToken.balanceOf(accounts[2].address)
    console.log("account[2] address: " + accounts[2].address)
    console.log("account[2]balance of pricer token: " + balance1)

    let listingPrice = await market.getListingPirce()
    listingPrice = listingPrice.toString()
    console.log("listingPrice is: " + listingPrice)
    const auctionPrice = ethers.utils.parseUnits('100', 'ether')
    let daoSuggestedPrice = ethers.utils.parseUnits('30', 'ether')

    await market.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice })
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice })

    let item1 = await market.fetchMarketItem(1)
    let item2 = await market.fetchMarketItem(2)

    console.log("First item's current DAO suggested price is: " + item1.daoSuggestedPrice.toString())
    console.log("Second item's current DAO suggested price is: " + item2.daoSuggestedPrice.toString())
    console.log("Block number: " + await ethers.provider.getBlockNumber())

    console.log("Account[1] weight is: " + await voteToken.getVotes(accounts[1].address))
    console.log("Account[2] weight is: " + await voteToken.getVotes(accounts[2].address))
    console.log("Block number: " + await ethers.provider.getBlockNumber())

    const targetAddr = marketAddress

    const calldata = market.interface.encodeFunctionData('updateSuggestedPrice', [1, daoSuggestedPrice])

    console.log("Block number: " + await ethers.provider.getBlockNumber())

    const proposal_tx = await governor.propose(
        [targetAddr],
        [0],
        [calldata],
        "set dao suggested price for item 1"
    );

    console.log("Block number: " + await ethers.provider.getBlockNumber())

    const receipt = await proposal_tx.wait()

    await nft.createToken("https://www.test.com/tok3")
    await market.createMarketItem(nftContractAddress, 3, auctionPrice, { value: listingPrice})

    // console.log("Proposal receipt: ")
    // console.log(receipt)
    const proposalId = receipt.events[0].args.proposalId
    console.log("Proposal ID: " + receipt.events[0].args.proposalId)

    // https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/governance/IGovernor.sol#L14
    console.log("Proposal state: " + await governor.state(proposalId))

    console.log("Before - account[1] has voted: " + await governor.hasVoted(proposalId, accounts[1].address))
    console.log("Before - account[2] has voted: " + await governor.hasVoted(proposalId, accounts[2].address))

    console.log("Block number: " + await ethers.provider.getBlockNumber())

    const cast_vote_tx1 = await governor.connect(accounts[1]).castVoteWithReason(proposalId, 1, "cause i dislike it")
    const cast_vote_tx2 = await governor.connect(accounts[2]).castVoteWithReason(proposalId, 0, "cause i like it")

    const voteReceipt1 = await cast_vote_tx1.wait()
    const voteReceipt2 = await cast_vote_tx2.wait()

    await nft.createToken("https://www.test.com/tok4")
    // console.log("address 0 vote receipt")
    // console.log(voteReceipt)

    // TODO: aseert
    // const weight = voteReceipt.events[0].args.weight
    // console.log("proposal 1 weight: " + weight)

    console.log("After - account[1] has voted: " + await governor.hasVoted(proposalId, accounts[1].address))
    console.log("After - account[2] has voted: " + await governor.hasVoted(proposalId, accounts[2].address))

    const result = await governor.proposalVotes(proposalId)
    console.log("voting result: " + result)

    const descriptionHash = ethers.utils.id("set dao suggested price for item 1");
    daoSuggestedPrice = ethers.utils.parseUnits('60', 'ether')
    const newCalldata = market.interface.encodeFunctionData('updateSuggestedPrice', [1, daoSuggestedPrice])

    // TODO: use ethers provider to mine blocks instead of creating a token
    await nft.createToken("https://www.test.com/tok5")
    console.log("Block number: " + await ethers.provider.getBlockNumber())

    // TODO: assert these values
    console.log("Proposal state: " + await governor.state(proposalId))
    console.log("Proposal snapshot: " + await governor.proposalSnapshot(proposalId))
    console.log("Proposal deadline: " + await governor.proposalDeadline(proposalId))

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
