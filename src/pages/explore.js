import React, { useState, useContext, useEffect } from 'react'
import StoreContext from '../utils/store'
import { getNativeByChain } from '../helpers/networks'
import { getCollectionsByChain } from '../helpers/collections'
import {
	useMoralis,
	useMoralisQuery,
} from 'react-moralis'
import { Modal, Badge, Alert, Spin, Row, Tabs} from 'antd'
import { useNFTTokenIds } from '../hooks/useNFTTokenIds'
import { CollectionBanner, CollectionCard, CollectionDetail } from '../components/Collection'
import { useMoralisDapp } from '../providers/MoralisDappProvider/MoralisDappProvider'
import { useWeb3ExecuteFunction } from 'react-moralis'
import { useCollectionStats } from '../hooks/useCollectionStats'

const styles = {
	wrapper: {
		textAlgin: 'center',
		margin: '0px 120px 30px 120px',
	},
	title: {
		fontSize: '32px',
		fontWeight: '700',
		lineHeight: '38px',
		color: 'black',
		textAlign: 'center',
		marginBottom: '32px'
	},
	cover: {
		height: '350px',
		width: '100%',
		marginTop: '60px'
	},
	NFTs: {
		marginTop: '12px'
	},
	collection: {
		marginRight: '42px',
		marginBottom: '42px'
	}
}

const { TabPane } = Tabs

export default function NFTMarketplace() {


	const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis()

	useEffect(() => {
		if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	  }, [isAuthenticated, isWeb3Enabled])

	const { inputValuePair: [inputValue, setInputValue]} = useContext(StoreContext)
	const fallbackImg =
    'https://nftopia-public.s3.amazonaws.com/demo/image/collectionLogo.png'

	// eslint-disable-next-line no-unused-vars
	const { stats, fetchStatsSuccess } = useCollectionStats(inputValue)
	const { NFTTokenIds, totalNFTs, fetchSuccess } = useNFTTokenIds(inputValue)
	const [visible, setVisibility] = useState(false)
	const [nftToBuy, setNftToBuy] = useState(null)
	const [loading, setLoading] = useState(false)
	const contractProcessor = useWeb3ExecuteFunction()
	const { chainId, marketAddress, contractABI, walletAddress } =
    useMoralisDapp()
	const nativeName = getNativeByChain(chainId)
	const contractABIJson = contractABI
	const { Moralis } = useMoralis()
	const queryMarketItems = useMoralisQuery('MarketItems')
	const fetchMarketItems = JSON.parse(
		JSON.stringify(queryMarketItems.data, [
			'objectId',
			'createdAt',
			'price',
			'nftContract',
			'itemId',
			'sold',
			'tokenId',
			'seller',
			'owner',
			'confirmed',
		])
	)
	const purchaseItemFunction = 'createMarketSale'
	const NFTCollections = getCollectionsByChain(chainId)

	async function purchase() {
		setLoading(true)
		const tokenDetails = getMarketItem(nftToBuy)
		const itemID = tokenDetails.itemId
		const tokenPrice = tokenDetails.price
		const ops = {
			contractAddress: marketAddress,
			functionName: purchaseItemFunction,
			abi: contractABIJson,
			params: {
				nftContract: nftToBuy.token_address,
				itemId: itemID,
			},
			msgValue: tokenPrice,
		}

		await contractProcessor.fetch({
			params: ops,
			onSuccess: () => {
				console.log('success')
				setLoading(false)
				setVisibility(false)
				updateSoldMarketItem()
				succPurchase()
			},
			onError: (error) => {
				setLoading(false)
				failPurchase()
				console.log(error)
			},
		})
	}

	const handleBuyClick = (nft) => {
		setNftToBuy(nft)
		setVisibility(true)
	}

	function succPurchase() {
		let secondsToGo = 5
		const modal = Modal.success({
			title: 'Success!',
			content: 'You have purchased this NFT',
		})
		setTimeout(() => {
			modal.destroy()
		}, secondsToGo * 1000)
	}

	function failPurchase() {
		let secondsToGo = 5
		const modal = Modal.error({
			title: 'Error!',
			content: 'There was a problem when purchasing this NFT',
		})
		setTimeout(() => {
			modal.destroy()
		}, secondsToGo * 1000)
	}

	async function updateSoldMarketItem() {
		const id = getMarketItem(nftToBuy).objectId
		const marketList = Moralis.Object.extend('MarketItems')
		const query = new Moralis.Query(marketList)
		await query.get(id).then((obj) => {
			obj.set('sold', true)
			obj.set('owner', walletAddress)
			obj.save()
		})
	}

	const getMarketItem = (nft) => {
		const result = fetchMarketItems?.find(
			(e) =>
				e.nftContract === nft?.token_address &&
        e.tokenId === nft?.token_id &&
        e.sold === false &&
        e.confirmed === true
		)
		return result
	}

	return (
		<>
			<div>
				{contractABIJson.noContractDeployed && (
					<>
						<Alert
							message="No Smart Contract Details Provided. Please deploy smart contract and provide address + ABI in the MoralisDappProvider.js file"
							type="error"
						/>
						<div style={{ marginBottom: '10px' }}></div>
					</>
				)}
				{inputValue !== 'explore' && totalNFTs !== undefined && (
					<>
						{!fetchSuccess && (
							<>
								<Alert
									message="Unable to fetch all NFT metadata... We are searching for a solution, please try again later!"
									type="warning"
								/>
								<div style={{ marginBottom: '10px' }}></div>
							</>
						)}
						<img style={styles.cover} src="/assets/collectionCover.png"></img>
						<div style={styles.wrapper}>
							<CollectionBanner NFTTokenIds={NFTTokenIds} totalNFTs={totalNFTs} stats={stats} fallbackImg={fallbackImg}/>
						</div>
					</>
				)}

				<div style={styles.wrapper}>
					{inputValue === 'explore' ?
						<>
							<div style={styles.title}>Review to Earn</div>
							<Tabs defaultActiveKey='1' centered>
								<TabPane tab="Trending" key="1">
									<Row style={styles.NFTs}>
										{NFTCollections?.map((nft, index) => (
											<div style={styles.collection} key={index} >
												<CollectionCard setInputValue={setInputValue} nft={nft} fallbackImg={fallbackImg} />
											</div>

										))}
									</Row>
								</TabPane>
								<TabPane tab="Top" key="2">
									Coming Soon
								</TabPane>
								<TabPane tab="Art" key="3">
									Coming Soon
								</TabPane>
								<TabPane tab="Collectibles" key="4">
									Coming Soon
								</TabPane>
							</Tabs>
						</>
						: <CollectionDetail NFTTokenIds={NFTTokenIds} chainId={chainId} handleBuyClick={handleBuyClick} getMarketItem={getMarketItem} fallbackImg={fallbackImg} />
					}
				</div>

				{getMarketItem(nftToBuy) ? (
					<Modal
						title={`Buy ${nftToBuy?.name} #${nftToBuy?.token_id}`}
						visible={visible}
						onCancel={() => setVisibility(false)}
						onOk={() => purchase()}
						okText="Buy"
					>
						<Spin spinning={loading}>
							<div
								style={{
									width: '250px',
									margin: 'auto',
								}}
							>
								<Badge.Ribbon
									color="green"
									text={`${
										getMarketItem(nftToBuy).price / ('1e' + 18)
									} ${nativeName}`}
								>
									<img
										src={nftToBuy?.image}
										style={{
											width: '250px',
											borderRadius: '10px',
											marginBottom: '15px',
										}}
									/>
								</Badge.Ribbon>
							</div>
						</Spin>
					</Modal>
				) : (
					<Modal
						title={`Buy ${nftToBuy?.name} #${nftToBuy?.token_id}`}
						visible={visible}
						onCancel={() => setVisibility(false)}
						onOk={() => setVisibility(false)}
					>
						<img
							src={nftToBuy?.image}
							style={{
								width: '250px',
								margin: 'auto',
								borderRadius: '10px',
								marginBottom: '15px',
							}}
						/>
						<Alert
							message="This NFT is currently not for sale"
							type="warning"
						/>
					</Modal>
				)}
			</div>
		</>
	)
}
