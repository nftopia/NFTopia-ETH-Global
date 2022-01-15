import { useState } from 'react'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import { useMoralis } from 'react-moralis'



import {
	mumbaiNFTAddress, mumbaiNFTMarketAddress, mumbaiGovernorTokenAddress, mumbaiGovernorAddress
} from '../../config'

import NFT from '../../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import GovernanceToken from '../../artifacts/contracts/PricerToken.sol/PricerToken.json'
import Governor from '../../artifacts/contracts/PricerGovernor.sol/PricerGovernor.json'

export default function CreateProposal() {
  const { web3, Moralis, user } = useMoralis()
	const [formInput, updateFormInput] = useState({ address: '', description: '' })
	const router = useRouter()


	async function createCollectionProposal() {
		const { address, description } = formInput
		if (!address || !description) return

    const web3Modal = new Web3Modal()
		const connection = await web3Modal.connect()
		const provider = new ethers.providers.Web3Provider(connection)
		const signer = provider.getSigner()

    const governorContract = new ethers.Contract(mumbaiGovernorAddress, Governor.abi, signer)
    const governanceTokenContract = new ethers.Contract(mumbaiGovernorTokenAddress, GovernanceToken.abi, signer)
    const marketContract = new ethers.Contract(mumbaiNFTMarketAddress, Market.abi, signer)

    console.log("current weight is: " + await governanceTokenContract.getVotes(signer.getAddress()))

    const calldata = marketContract.interface.encodeFunctionData('updateRating', [mumbaiNFTAddress, 1])

    const proposal_tx = await governorContract.propose(
        [mumbaiNFTMarketAddress],
        [0],
        [calldata],
        description
    );

    governorContract.on("ProposalCreated", (proposalId) => {
        console.log("got proposal id: " + proposalId);
    });

    console.log("end")

    // const proposalId = await governorContract.hashProposal(
    //     [mumbaiNFTMarketAddress],
    //     [0],
    //     [calldata],
    //     ethers.utils.formatBytes32String(description)
    // );

    // provider.waitForTransaction(proposal_tx.hash).then((receipt) => {
    //   // console.log("proposal id: " + receipt.events[0].args.proposalId)
    //   console.log(receipt)
    //   console.log("proposal id: " + proposalId)
    //   console.log("Proposal state: " + governorContract.state("67929189116362849761711444791875284825831083884664372968252207849422980362770"))
    // });
	}

	async function createSale(url) {
		const web3Modal = new Web3Modal()
		const connection = await web3Modal.connect()
		const provider = new ethers.providers.Web3Provider(connection)
		const signer = provider.getSigner()

		/* next, create the item */
		let contract = new ethers.Contract(mumbaiNFTAddress, NFT.abi, signer)
		let transaction = await contract.createToken(url)
		let tx = await transaction.wait()
		let event = tx.events[0]
		let value = event.args[2]
		let tokenId = value.toNumber()
		const price = ethers.utils.parseUnits(formInput.price, 'ether')

		/* then list the item for sale on the marketplace */
		contract = new ethers.Contract(mumbaiNFTMarketAddress, Market.abi, signer)
		// let listingPrice = await contract.getListingPirce()
		// listingPrice = listingPrice.toString()

		transaction = await contract.createMarketItem(mumbaiNFTAddress, tokenId, price, { value: 0 })
		await transaction.wait()
		router.push('/')
	}

	return (
		<div className="flex justify-center">
			<div className="w-1/2 flex flex-col pb-12">
				<input
					placeholder="Collection address"
					className="mt-8 border rounded p-4"
					onChange={e => updateFormInput({ ...formInput, address: e.target.value })}
				/>
				<textarea
					placeholder="Proposal Description"
					className="mt-2 border rounded p-4"
					onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
				/>
				<button onClick={createCollectionProposal} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Create Proposal
				</button>
			</div>
		</div>
	)
}