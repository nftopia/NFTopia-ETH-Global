import React, { useState, useContext, useEffect } from 'react'
import StoreContext from '../utils/store'
import { getNativeByChain } from '../helpers/networks'
import { getCollectionsByChain } from '../helpers/collections'
import {
	useMoralis,
	useMoralisQuery,
} from 'react-moralis'
import { Modal, Badge, Alert, Spin, Row, Col, Tabs} from 'antd'
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
		width: '100%'
	},
	NFTs: {
		marginTop: '12px'
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
    'data:image/png;base64,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'

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
											<Col span={6} key={index}>
												<CollectionCard setInputValue={setInputValue} nft={nft} fallbackImg={fallbackImg} />
											</Col>
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
