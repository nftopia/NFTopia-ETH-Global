// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './governance/extensions/GovernorProposalThreshold.sol';
import './governance/extensions/GovernorSettings.sol';
import './governance/extensions/GovernorCountingNFTopia.sol';
import './governance/extensions/GovernorVotesQuorumFraction.sol';

contract NFTopiaGovernor is
  GovernorProposalThreshold,
  GovernorSettings,
  GovernorVotesQuorumFraction,
  GovernorCountingNFTopia
{
  constructor(
    string memory name_,
    IVotes token_,
    uint256 votingDelay_,
    uint256 votingPeriod_,
    uint256 quorumNumerator_
  )
    Governor(name_)
    GovernorSettings(votingDelay_, votingPeriod_, 0)
    GovernorVotes(token_)
    GovernorVotesQuorumFraction(quorumNumerator_)
  {}

  function cancel(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    bytes32 salt
  ) public returns (uint256 proposalId) {
    return _cancel(targets, values, calldatas, salt);
  }

  function getVotes(address account, uint256 blockNumber)
    public
    view
    virtual
    override(IGovernor, GovernorVotes)
    returns (uint256)
  {
    return super.getVotes(account, blockNumber);
  }

  function proposalThreshold()
    public
    view
    override(Governor, GovernorSettings)
    returns (uint256)
  {
    return super.proposalThreshold();
  }

  function propose(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    string memory description
  )
    public
    virtual
    override(Governor, GovernorProposalThreshold)
    returns (uint256)
  {
    return super.propose(targets, values, calldatas, description);
  }

  // TODO: there is a security risk here, need to be addressed by modify the interface to view instead of pure, and apply msg.sender in encode
  function hashProposal(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    bytes32 descriptionHash
  ) public pure virtual override returns (uint256) {
    return
      uint256(
        keccak256(
          abi.encode(
            targets,
            values,
            extractSig(calldatas[0], 0, 4),
            descriptionHash
          )
        )
      );
  }

  function extractSig(
    bytes memory data,
    uint8 from,
    uint8 n
  ) public pure returns (bytes memory) {
    bytes memory returnValue = new bytes(n);
    for (uint8 i = 0; i < n - from; i++) {
      returnValue[i] = data[i + from];
    }
    return returnValue;
  }
}
