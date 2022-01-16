/* eslint-disable no-unused-vars */
import { useMoralisDapp } from '../providers/MoralisDappProvider/MoralisDappProvider'
import { useEffect, useState } from 'react'
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from 'react-moralis'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

import { mumbaiNFTMarketAddress } from '../../config'

import Market from '../../artifacts/contracts/NFTMarket.sol/NFTMarket.json'


export const useCollectionStats = (addr) => {

	const { token } = useMoralisWeb3Api()
	const { chainId } = useMoralisDapp()

	const [totalOwners, setTotalOwners] = useState([])
	const [stats, setStats] = useState({})
	const {
		fetch: getTotalOwners,
		data,
		error,
		isLoading,
	} = useMoralisWeb3ApiCall(token.getNFTOwners, { chain: chainId, address: addr })


	const [fetchStatsSuccess, setFetchStatsSuccess] = useState(true)

	const noveltyScore = 2.5

	// const fetchCollectionStats = async () => ({data, noveltyScore})
	const fetchCollectionStats = async () => {

		const web3Modal = new Web3Modal()
		const connection = await web3Modal.connect()
		const provider = new ethers.providers.Web3Provider(connection)
		const signer = provider.getSigner()

		const marketContract = new ethers.Contract(mumbaiNFTMarketAddress, Market.abi, signer)

		const rating = await marketContract.getRating(addr)
		return {data, noveltyScore, rating}
	}

	useEffect(() => {
		if(addr !== 'explore')
		{
			fetchCollectionStats().then(response => {
				console.log(response)
				setStats({owners: response.data?.result.length, noveltyScore: response.noveltyScore, rating: response.rating.toNumber()})
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, noveltyScore])

	return { stats, fetchStatsSuccess, error, isLoading }
}
