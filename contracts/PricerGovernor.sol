// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "./GovernorCountingCustomized.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract PricerGovernor is Governor, GovernorSettings, GovernorCountingSimple, GovernorVotes, GovernorVotesQuorumFraction {
    constructor(ERC20Votes _token)
        Governor("PricerGovernor")
        GovernorSettings(1 /* 1 block */, 2 /* 2 blocks */, 0)
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(4)
    {}

    function extractSig (bytes memory data, uint8 from, uint8 n) public pure returns(bytes memory) {
      bytes memory returnValue = new bytes(n);
      for (uint8 i = 0; i < n - from; i++) {
        returnValue[i] = data[i + from];
      }
      return returnValue;
    }

    // TODO: there is a security risk here, need to be addressed by modify the interface to view instead of pure, and apply msg.sender in encode
    function hashProposal(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) public pure virtual override returns (uint256) {
        return uint256(keccak256(abi.encode(targets, values, extractSig(calldatas[0], 0, 4), descriptionHash)));
    }

    function votingDelay()
        public
        view
        override(IGovernor, GovernorSettings)
        returns (uint256)
    {
        return super.votingDelay();
    }

    function votingPeriod()
        public
        view
        override(IGovernor, GovernorSettings)
        returns (uint256)
    {
        return super.votingPeriod();
    }

    function quorum(uint256 blockNumber)
        public
        view
        override(IGovernor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }

    // Voting power of an account at a specific blockNumber.
    // https://docs.openzeppelin.com/contracts/4.x/api/governance#IGovernor-getVotes-address-uint256-
    function getVotes(address account, uint256 blockNumber)
        public
        view
        override(IGovernor, GovernorVotes)
        returns (uint256)
    {
        return super.getVotes(account, blockNumber);
    }

    // Current state of a proposal, following Compound’s convention
    // https://docs.openzeppelin.com/contracts/4.x/api/governance#IGovernor-state-uint256-
    function state(uint256 proposalId)
        public
        view
        override(Governor)
        returns (ProposalState)
    {
        return super.state(proposalId);
    }

    // Create a new proposal.
    // https://docs.openzeppelin.com/contracts/4.x/api/governance#IGovernor-propose-address---uint256---bytes---string-

    // A proposal is a sequence of actions that the Governor contract will perform if it passes.
    // Each action consists of a target address, calldata encoding a function call, and an amount of ETH to include.
    // Additionally, a proposal includes a human-readable description.

    // function propose(address[] memory targets, uint256[] memory values, bytes[] memory calldatas, string memory description)


    // Part of the Governor Bravo’s interface: "The number of votes required in order for a voter to become a proposer".
    // https://docs.openzeppelin.com/contracts/4.x/api/governance#Governor-proposalThreshold--
    function proposalThreshold()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.proposalThreshold();
    }
}
