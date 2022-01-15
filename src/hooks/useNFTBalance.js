import { useMoralisDapp } from '../providers/MoralisDappProvider/MoralisDappProvider'
import { useEffect, useState } from 'react'
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from 'react-moralis'
import { useIPFS } from './useIPFS'

export const useNFTBalance = (options) => {

	const { account } = useMoralisWeb3Api()
	const { chainId, walletAddress } = useMoralisDapp()
	const { resolveLink } = useIPFS()
	const [NFTBalance, setNFTBalance] = useState([])
	const {
		fetch: getNFTBalance,
		data,
		error,
		isLoading,
	} = useMoralisWeb3ApiCall(account.getNFTs, { chain: chainId, address: walletAddress })
	const [fetchSuccess, setFetchSuccess] = useState(true)

	console.log(data)
	const fetchNFTBalance = async () => {
		if (data?.result) {
			const NFTs = data.result
			setFetchSuccess(true)
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
						// try {
						// 	await fetch(`https://obscure-wave-37922.herokuapp.com/${NFT.token_uri}`)
						// 		.then(response => response.json())
						// 		.then(data => {
						// 	  NFT.image = resolveLink(data.image)
						// 		})
						//   } catch (error) {
						// 	setFetchSuccess(false)
						//   }
					} catch (error) {
						setFetchSuccess(false)
					}
				}
			}
			setFetchSuccess(true)
			setNFTBalance(NFTs)
		}
	}
	useEffect(() => {
		fetchNFTBalance()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data])

	return { getNFTBalance, NFTBalance, fetchSuccess, error, isLoading }
}
