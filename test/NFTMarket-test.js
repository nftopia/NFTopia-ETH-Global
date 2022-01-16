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
    const governor = await Governor.deploy("NFTopiaGovernor", voteToken.address, 0, 7, 0)
    await governor.deployed()
    const governorAddress = governor.address

    await nft.createToken("https://www.test.com/tok1")
    await nft.createToken("https://www.test.com/tok2")

    const accounts = await ethers.getSigners()

    const owner  = accounts[0].address
    await voteToken.mint(owner, 1)
    await voteToken.mint(owner, 2)
    await voteToken.mint(owner, 3)
    await voteToken.mint(owner, 4)
    await voteToken.mint(owner, 5)
    await voteToken.mint(owner, 6)

    await voteToken.transferFrom(owner, accounts[1].address, 1)
    await voteToken.transferFrom(owner, accounts[2].address, 2)
    await voteToken.transferFrom(owner, accounts[3].address, 3)
    await voteToken.transferFrom(owner, accounts[4].address, 4)
    await voteToken.transferFrom(owner, accounts[5].address, 5)
    await voteToken.transferFrom(owner, accounts[5].address, 6)
    
    await voteToken.connect(accounts[1]).delegate(accounts[1].address, { from: accounts[1].address });
    await voteToken.connect(accounts[2]).delegate(accounts[2].address, { from: accounts[2].address });
    await voteToken.connect(accounts[3]).delegate(accounts[3].address, { from: accounts[3].address });
    await voteToken.connect(accounts[4]).delegate(accounts[4].address, { from: accounts[4].address });
    await voteToken.connect(accounts[5]).delegate(accounts[5].address, { from: accounts[5].address });

    const balance0 = await voteToken.balanceOf(accounts[1].address)
    console.log("account[1] address: " + accounts[1].address)
    console.log("account[1] balance of pricer token: " + balance0)

    const balance1 = await voteToken.balanceOf(accounts[5].address)
    console.log("account[5] address: " + accounts[5].address)
    console.log("account[5] balance of pricer token: " + balance1)

    let listingPrice = await market.getListingPirce()
    listingPrice = listingPrice.toString()
    console.log("listingPrice is: " + listingPrice)
    const auctionPrice = ethers.utils.parseUnits('100', 'ether')

    await market.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice })
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice })

    let item1 = await market.fetchMarketItem(1)
    let item2 = await market.fetchMarketItem(2)

    console.log("Account[1] weight is: " + await voteToken.getVotes(accounts[1].address))
    console.log("Account[5] weight is: " + await voteToken.getVotes(accounts[5].address))
    console.log("Block number: " + await ethers.provider.getBlockNumber())

    const targetAddr = marketAddress

    const emptyArr = [];
    const calldata = market.interface.encodeFunctionData('updateRating', [nftContractAddress, item1.tokenId, emptyArr])

    console.log("Block number: " + await ethers.provider.getBlockNumber())

    const proposal_tx = await governor.propose(
        [targetAddr],
        [0],
        [calldata],
        "Give a review from 1 star to 5 star"
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
    console.log("Before - account[3] has voted: " + await governor.hasVoted(proposalId, accounts[3].address))
    console.log("Before - account[4] has voted: " + await governor.hasVoted(proposalId, accounts[4].address))
    console.log("Before - account[5] has voted: " + await governor.hasVoted(proposalId, accounts[5].address))

    console.log("Block number: " + await ethers.provider.getBlockNumber())

    // accounts voting
    const cast_vote_tx1 = await governor.connect(accounts[1]).castVoteWithReason(proposalId, 0, "It's 1 star")
    const cast_vote_tx2 = await governor.connect(accounts[2]).castVoteWithReason(proposalId, 1, "It's 2 star")
    const cast_vote_tx3 = await governor.connect(accounts[3]).castVoteWithReason(proposalId, 2, "It's 3 star")
    const cast_vote_tx4 = await governor.connect(accounts[4]).castVoteWithReason(proposalId, 3, "It's 4 star")
    const cast_vote_tx5 = await governor.connect(accounts[5]).castVoteWithReason(proposalId, 4, "It's 5 star")

    const voteReceipt1 = await cast_vote_tx1.wait()
    const voteReceipt2 = await cast_vote_tx2.wait()
    const voteReceipt3 = await cast_vote_tx3.wait()
    const voteReceipt4 = await cast_vote_tx4.wait()
    const voteReceipt5 = await cast_vote_tx5.wait()

    await nft.createToken("https://www.test.com/tok4")
    // console.log("address 0 vote receipt")
    // console.log(voteReceipt)

    // TODO: aseert
    // const weight = voteReceipt.events[0].args.weight
    // console.log("proposal 1 weight: " + weight)

    console.log("After - account[1] has voted: " + await governor.hasVoted(proposalId, accounts[1].address))
    console.log("After - account[2] has voted: " + await governor.hasVoted(proposalId, accounts[2].address))
    console.log("After - account[3] has voted: " + await governor.hasVoted(proposalId, accounts[3].address))
    console.log("After - account[4] has voted: " + await governor.hasVoted(proposalId, accounts[4].address))
    console.log("After - account[5] has voted: " + await governor.hasVoted(proposalId, accounts[5].address))

    const votingResults = await governor.proposalVotes(proposalId)
    console.log("voting results: " + votingResults)

    const descriptionHash = ethers.utils.id("Give a review from 1 star to 5 star");

    // TODO: use ethers provider to mine blocks instead of creating a token
    await nft.createToken("https://www.test.com/tok5")
    console.log("Block number: " + await ethers.provider.getBlockNumber())

    // TODO: assert these values
    console.log("Proposal state: " + await governor.state(proposalId))
    console.log("Proposal snapshot: " + await governor.proposalSnapshot(proposalId))
    console.log("Proposal deadline: " + await governor.proposalDeadline(proposalId))

    const toExecuteCalldata = market.interface.encodeFunctionData('updateRating', [nftContractAddress, item1.tokenId, votingResults])

    const execute_tx = await governor.execute(
        [targetAddr],
        [0],
        [toExecuteCalldata],
        descriptionHash
    );

    item1 = await market.fetchMarketItem(1)

    console.log("Item1's rating is " + await market.getRating(nftContractAddress, 1))
  });
});
