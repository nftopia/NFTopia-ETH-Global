import { useMoralisDapp } from '../providers/MoralisDappProvider/MoralisDappProvider'
import { useEffect, useState } from 'react'
import { useMoralisWeb3Api, useMoralisWeb3ApiCall, useMoralis } from 'react-moralis'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import { useIPFS } from './useIPFS'


import { mumbaiGovernorAddress } from '../../config'

import Governor from '../../artifacts/contracts/PricerGovernor.sol/PricerGovernor.json'


export const useProposalDetail = (addr) => {

	const { token } = useMoralisWeb3Api()
	const { chainId } = useMoralisDapp()
	const { Moralis, isInitialized  } = useMoralis()
	const { resolveLink } = useIPFS()

	const [proposalInfo, setProposalInfo] = useState({})

	const {
		fetch: getNFTTokenIds,
		data,
		error,
		isLoading,
	} = useMoralisWeb3ApiCall(token.getAllTokenIds, {
		chain: chainId,
		address: addr,
		limit: 10,
	})

	const fetchProposalInfo = async () => {
		let NFTs = []
		if (data?.result) {
			NFTs = data.result

			for (let NFT of NFTs) {
				if (NFT?.metadata) {
					NFT.metadata = JSON.parse(NFT.metadata)
					NFT.image = resolveLink(NFT.metadata?.image)
				} else if (NFT?.token_uri) {
					try {
						await fetch(NFT.token_uri)
							.then((response) => response.json())
							.then((data) => {
								NFT.image = resolveLink(data.image)
							})
					} catch (error) {
						console.log('Running into ' + error)
					}
				}
			}
		}

		const query = new Moralis.Query('Collections')
		query.equalTo('collection_address', addr)
		const result = await query.first()
		

		const noveltyScore = result.get('nolvety_score')
		console.log(noveltyScore)
		const aiTag = result.get('ai_tag')
		console.log(aiTag)


		const query2 = new Moralis.Query('Proposals')
		const firstproposal = await query2.first()
		const proposalId = firstproposal.get('proposal_id')
		console.log(proposalId)


		const web3Modal = new Web3Modal()
		const connection = await web3Modal.connect()
		const provider = new ethers.providers.Web3Provider(connection)
		const signer = provider.getSigner()

		const governorContract = new ethers.Contract(mumbaiGovernorAddress, Governor.abi, signer)

		//   Pending,
		//   Active,
		//   Canceled,
		//   Defeated,
		//   Succeeded,
		//   Queued,
		//   Expired,
		//   Executed

		const state = await governorContract.state(proposalId)

		const hasVoted = await governorContract.hasVoted(proposalId, signer.getAddress())

		const voteRes = await governorContract.proposalVotes(proposalId)

		return {NFTs, noveltyScore, aiTag, state, hasVoted, voteRes}
	}

	useEffect(() => {
		if(addr !== 'explore')
		{
			fetchProposalInfo().then(response => {
				console.log(response)
				setProposalInfo({
					tokens: response.NFTs, noveltyScore: response.noveltyScore, aiTag: response.aiTag,
					state: response.state, hasVoted: response.hasVoted, voteRes: response.voteRes
				})
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, addr, isInitialized])

	return { proposalInfo, error, isLoading }
}
