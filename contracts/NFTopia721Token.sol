// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import './token/ERC721/extensions/ERC721Votes.sol';

contract NFTopia721Token is ERC721Votes {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  constructor(string memory name, string memory symbol)
    ERC721(name, symbol)
    EIP712(name, '1')
  {
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
    _mint(msg.sender, newItemId);
  }

  function createToken(string memory tokenURI) public returns (uint256) {
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();

    _mint(msg.sender, newItemId);

    _setTokenURI(newItemId, tokenURI);

    return newItemId;
  }

  function baseURI() public view returns (string memory) {
    return _baseURI();
  }

  function exists(uint256 tokenId) public view returns (bool) {
    return _exists(tokenId);
  }

  function mint(address to, uint256 tokenId) public {
    _mint(to, tokenId);
  }

  function safeMint(address to, uint256 tokenId) public {
    _safeMint(to, tokenId);
  }

  function safeMint(
    address to,
    uint256 tokenId,
    bytes memory _data
  ) public {
    _safeMint(to, tokenId, _data);
  }

  function burn(uint256 tokenId) public {
    _burn(tokenId);
  }

  function getChainId() external view returns (uint256) {
    return block.chainid;
  }
}
