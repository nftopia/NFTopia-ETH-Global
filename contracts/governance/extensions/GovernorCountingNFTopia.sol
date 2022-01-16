// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.0 (governance/extensions/GovernorCountingSimple.sol)

pragma solidity ^0.8.0;

import '../Governor.sol';

/**
 * @dev Extension of {Governor} for simple, 3 options, vote counting.
 *
 * _Available since v4.3._
 */
abstract contract GovernorCountingNFTopia is Governor {
  /**
   * @dev Supported vote types. Matches Governor Bravo ordering.
   */
  enum VoteType {
    OneStar,
    TwoStar,
    ThreeStar,
    FourStar,
    FiveStar
  }

  struct ProposalVote {
    uint256 oneStarVotes;
    uint256 twoStarVotes;
    uint256 threeStarVotes;
    uint256 fourStarVotes;
    uint256 fiveStarVotes;
    mapping(address => bool) hasVoted;
  }

  mapping(uint256 => ProposalVote) private _proposalVotes;

  /**
   * @dev See {IGovernor-COUNTING_MODE}.
   */
  // solhint-disable-next-line func-name-mixedcase
  function COUNTING_MODE()
    public
    pure
    virtual
    override
    returns (string memory)
  {
    return 'support=custom&quorum=oneStar,twoStar,threeStar,fourStar,fiveStar';
  }

  /**
   * @dev See {IGovernor-hasVoted}.
   */
  function hasVoted(uint256 proposalId, address account)
    public
    view
    virtual
    override
    returns (bool)
  {
    return _proposalVotes[proposalId].hasVoted[account];
  }

  /**
   * @dev Accessor to the internal vote counts.
   */
  function proposalVotes(uint256 proposalId)
    public
    view
    virtual
    returns (
      uint256 oneStarVotes,
      uint256 twoStarVotes,
      uint256 threeStarVotes,
      uint256 fourStarVotes,
      uint256 fiveStarVotes
    )
  {
    ProposalVote storage proposalvote = _proposalVotes[proposalId];
    return (
      proposalvote.oneStarVotes,
      proposalvote.twoStarVotes,
      proposalvote.threeStarVotes,
      proposalvote.fourStarVotes,
      proposalvote.fiveStarVotes
    );
  }

  /**
   * @dev See {Governor-_quorumReached}.
   */
  function _quorumReached(uint256 proposalId)
    internal
    view
    virtual
    override
    returns (bool)
  {
    ProposalVote storage proposalvote = _proposalVotes[proposalId];

    // quorum(proposalSnapshot(proposalId)) <=
    // proposalvote.forVotes + proposalvote.abstainVotes;
    return true;
  }

  /**
   * @dev See {Governor-_voteSucceeded}.
   */
  function _voteSucceeded(uint256 proposalId)
    internal
    view
    virtual
    override
    returns (bool)
  {
    ProposalVote storage proposalvote = _proposalVotes[proposalId];

    // always Succeeded
    return true;
  }

  /**
   * @dev See {Governor-_countVote}. In this module, the support follows the `VoteType` enum (from Governor Bravo).
   */
  function _countVote(
    uint256 proposalId,
    address account,
    uint8 support,
    uint256 weight
  ) internal virtual override {
    ProposalVote storage proposalvote = _proposalVotes[proposalId];

    require(
      !proposalvote.hasVoted[account],
      'GovernorVotingCountingNFT: vote already cast'
    );
    proposalvote.hasVoted[account] = true;

    if (support == uint8(VoteType.OneStar)) {
      proposalvote.oneStarVotes += weight;
    } else if (support == uint8(VoteType.TwoStar)) {
      proposalvote.twoStarVotes += weight;
    } else if (support == uint8(VoteType.ThreeStar)) {
      proposalvote.threeStarVotes += weight;
    } else if (support == uint8(VoteType.FourStar)) {
      proposalvote.fourStarVotes += weight;
    } else if (support == uint8(VoteType.FiveStar)) {
      proposalvote.fiveStarVotes += weight;
    } else {
      revert('GovernorVotingCountingNFT: invalid value for enum VoteType');
    }
  }
}
