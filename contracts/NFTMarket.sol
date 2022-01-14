// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTMarket is ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private _itemIds;
  Counters.Counter private _itemsSold;

  address payable owner;

  // TODO - Maybe consider a method to set this value so we can adjust it by sending a trascation to this contract
  uint256 listingPrice = 0.025 ether;

  constructor() {
    owner = payable(msg.sender);
  }

  struct MarketItem {
    uint itemId;
    address nftContract;
    uint tokenId;
    address payable owner;
    address payable author;
    uint256 price;
    uint256 daoSuggestedPrice;
    uint256 aiSuggestedPrice;
    uint256 aiSuggestedUpperBound;
    uint256 aiSuggestedLowerBound;
    bool sold;
  }

  mapping(uint256 => MarketItem) private idToMarketItem;

  event MarketItemCreated (
    uint indexed itemId,
    address indexed nftContract,
    uint256 indexed tokenId,
    address owner,
    address author,
    uint256 price,
    uint256 daoSuggestedPrice,
    uint256 aiSuggestedPrice,
    uint256 aiSuggestedUpperBound,
    uint256 aiSuggestedLowerBound,
    bool sold
  );

  function getListingPirce() public view returns (uint256) {
    return listingPrice;
  }

  function createMarketItem(
    address nftContract,
    uint256 tokenId,
    uint256 price
  ) public payable nonReentrant {
    require(price > 0, "Price must be at least 1 wei");
    require(msg.value == listingPrice, "You must pay the listing fee to be able to list");

    _itemIds.increment();
    uint256 itemId = _itemIds.current();

    idToMarketItem[itemId] = MarketItem(
      itemId,
      nftContract,
      tokenId,
      payable(msg.sender),
      payable(msg.sender),
      price, // user list price
      price, // DAO suggested price
      price, // AI suggested price
      price, // AI suggested upper bound price
      price, // AI suggested lower bound price
      false
    );

    IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

    emit MarketItemCreated(
      itemId,
      nftContract,
      tokenId,
      msg.sender,
      msg.sender,
      price,
      price,
      price,
      price,
      price,
      false
    );
  }


  function createMarketSale(
    address nftContract,
    uint256 itemId
  ) public payable nonReentrant {

    uint price = idToMarketItem[itemId].price;
    uint tokenId = idToMarketItem[itemId].tokenId;

    // TODO - If value < price, this should be listed as an offer
    require(msg.value == price, "Please submit the asking price in order to complete the purchase");

    idToMarketItem[itemId].owner.transfer(msg.value);
    IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);

    // TODO - some portion should be transfered to owner, some portion should be transfered to DAO
    idToMarketItem[itemId].owner = payable(msg.sender);
    idToMarketItem[itemId].sold = true;

    _itemsSold.increment();
    payable(owner).transfer(listingPrice);
  }

  function updateSuggestedPrice(uint256 itemId, uint256 price) public {
    // This is the actual execution
    idToMarketItem[itemId].daoSuggestedPrice = price;
  }

  function proposingPrice(uint256 itemId) public {
    // Set the suggested price to be under voting
    idToMarketItem[itemId].daoSuggestedPrice = 0;
  }


  // TODO - use a map, key - collection id, value nft array
  function fetchAllMarketItems() public view returns (MarketItem[] memory) {
    uint itemCount = _itemIds.current();
    uint currentIdx = 0;

    MarketItem[] memory items = new MarketItem[](itemCount);

    for(uint i = 0; i < itemCount; i++) {
      MarketItem storage currentItem = idToMarketItem[i+1];
      items[currentIdx] = currentItem;
      currentIdx += 1;
    }

    return items;
  }

  function fetchMyNFTs() public view returns (MarketItem[] memory) {
    uint itemCount = _itemIds.current();

    uint myItemCount = 0;
    uint currentIdx = 0;

    for(uint i = 0; i < itemCount; i++) {
      if(idToMarketItem[i+1].owner == msg.sender) {
        myItemCount += 1;
      }
    }

    MarketItem[] memory items = new MarketItem[](myItemCount);

    for(uint i = 0; i < itemCount; i++) {
      if(idToMarketItem[i+1].owner == msg.sender) {
        MarketItem storage currentItem = idToMarketItem[i+1];
        items[currentIdx] = currentItem;
        currentIdx += 1;
      }
    }

    return items;
  }

  function fetchMyCreatedItems() public view returns (MarketItem[] memory) {
    uint itemCount = _itemIds.current();

    uint myCreatedItemCount = 0;
    uint currentIdx = 0;

    for(uint i = 0; i < itemCount; i++) {
      if(idToMarketItem[i+1].author == msg.sender) {
        myCreatedItemCount += 1;
      }
    }

    MarketItem[] memory items = new MarketItem[](myCreatedItemCount);

    for(uint i = 0; i < itemCount; i++) {
      if(idToMarketItem[i+1].author == msg.sender) {
        MarketItem storage currentItem = idToMarketItem[i+1];
        items[currentIdx] = currentItem;
        currentIdx += 1;
      }
    }

    return items;
  }

  function fetchMarketItem(uint256 itemId) public view returns (MarketItem memory) {
      MarketItem storage currentItem = idToMarketItem[itemId];
      return currentItem;
  }
}
