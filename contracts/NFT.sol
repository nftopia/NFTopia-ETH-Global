// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

// Possible ways to improve this: https://dev.to/rounakbanik/writing-an-nft-collectible-smart-contract-2nh8

contract NFT is ERC721URIStorage {
  // Allow us to increment the minted NFT counter
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  // This is the market place address so NFT and market place can interact with each other.
  address contractAddress;

  constructor(address marketplaceAddress)
    ERC721('The MarketPlace Tokens', 'TMT')
  {
    contractAddress = marketplaceAddress;
  }

  function createToken(string memory tokenURI) public returns (uint256) {
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();

    _mint(msg.sender, newItemId);

    _setTokenURI(newItemId, tokenURI);

    // Allow marketplace to transcation this NFT
    setApprovalForAll(contractAddress, true);

    return newItemId;
  }
}
