import React, { useState } from 'react'
import { useMoralis } from 'react-moralis'
import { Card, Image, Modal, Input, Row, Spin, Button } from 'antd'
import { useNFTBalance } from '../hooks/useNFTBalance'
import { useMoralisDapp } from '../providers/MoralisDappProvider/MoralisDappProvider'
import { useWeb3ExecuteFunction } from 'react-moralis'

const styles = {
	
	wrapper: {
		textAlign: 'center',
		margin: '0px 120px 80px 120px'
	},
	cover: {
		height: '350px',
		width: '100%',
		marginTop: '60px'
	},
	image: {
		borderRadius: '27.1256px',
		height: '162px',
		width: '162px',
	},
	logo: {
		height: '162px',
		width: '162px',
		borderRadius: '50%',
		positon: 'relative',
		marginTop: '-80px',
		border: 'solid 4px white',
	},
	title: {
		marginTop: '30px',
		fontWeight: 'bold',
		fontSize: '32px',
		lineHeight: '38px',
		marginBottom: '8px'
	},
	subtitle: {
		fontWeight: '510',
		fontSize: '16px',
		lineHeight: '19px',
		textAlign: 'center'
	},
	NFTs: {
		marginTop: '12px'
	},
	collection: {
		marginRight: '12px',
		marginBottom: '12px'
	}
}

function NFTBalance() {
	const { NFTBalance, walletAddress } = useNFTBalance()
	const { marketAddress, contractABI } = useMoralisDapp()
	const { Moralis } = useMoralis()
	const [visible, setVisibility] = useState(false)
	// eslint-disable-next-line no-unused-vars
	const [nftToSend, setNftToSend] = useState(null)
	const [price, setPrice] = useState(1)
	const [loading, setLoading] = useState(false)
	const contractProcessor = useWeb3ExecuteFunction()
	const contractABIJson = contractABI
	const listItemFunction = 'createMarketItem'
	const ItemImage = Moralis.Object.extend('ItemImages')

	async function list(nft, listPrice) {
		setLoading(true)
		const p = listPrice * ('1e' + 18)
		const ops = {
			contractAddress: marketAddress,
			functionName: listItemFunction,
			abi: contractABIJson,
			params: {
				nftContract: nft.token_address,
				tokenId: nft.token_id,
				price: String(p),
			},
		}

		await contractProcessor.fetch({
			params: ops,
			onSuccess: () => {
				console.log('success')
				setLoading(false)
				setVisibility(false)
				addItemImage()
				succList()
			},
			onError: (error) => {
				setLoading(false)
				failList()
				console.log(error)
			},
		})
	}


	async function approveAll(nft) {
		setLoading(true)  
		const ops = {
			contractAddress: nft.token_address,
			functionName: 'setApprovalForAll',
			abi: [{'inputs':[{'internalType':'address','name':'operator','type':'address'},{'internalType':'bool','name':'approved','type':'bool'}],'name':'setApprovalForAll','outputs':[],'stateMutability':'nonpayable','type':'function'}],
			params: {
				operator: marketAddress,
				approved: true
			},
		}

		await contractProcessor.fetch({
			params: ops,
			onSuccess: () => {
				console.log('Approval Received')
				setLoading(false)
				setVisibility(false)
				succApprove()
			},
			onError: (error) => {
				setLoading(false)
				failApprove()
				console.log(error)
			},
		})
	}

	function succList() {
		let secondsToGo = 5
		const modal = Modal.success({
			title: 'Success!',
			content: 'Your NFT was listed on the marketplace',
		})
		setTimeout(() => {
			modal.destroy()
		}, secondsToGo * 1000)
	}

	function succApprove() {
		let secondsToGo = 5
		const modal = Modal.success({
			title: 'Success!',
			content: 'Approval is now set, you may list your NFT',
		})
		setTimeout(() => {
			modal.destroy()
		}, secondsToGo * 1000)
	}

	function failList() {
		let secondsToGo = 5
		const modal = Modal.error({
			title: 'Error!',
			content: 'There was a problem listing your NFT',
		})
		setTimeout(() => {
			modal.destroy()
		}, secondsToGo * 1000)
	}

	function failApprove() {
		let secondsToGo = 5
		const modal = Modal.error({
			title: 'Error!',
			content: 'There was a problem with setting approval',
		})
		setTimeout(() => {
			modal.destroy()
		}, secondsToGo * 1000)
	}

	function addItemImage() {
		const itemImage = new ItemImage()

		itemImage.set('image', nftToSend.image)
		itemImage.set('nftContract', nftToSend.token_address)
		itemImage.set('tokenId', nftToSend.token_id)
		itemImage.set('name', nftToSend.name)

		itemImage.save()
	}

	return (
		<>
			<img style={styles.cover} src="/assets/collectionCover.png"></img>
			<div style={styles.wrapper}>
				{/* {contractABIJson.noContractDeployed && (
					<>
						<Alert
							message="No Smart Contract Details Provided. Please deploy smart contract and provide address + ABI in the MoralisDappProvider.js file"
							type="error"
						/>
						<div style={{ marginBottom: '10px' }}></div>
					</>
				)}
				{!fetchSuccess && (
					<>
						<Alert
							message="Unable to fetch all NFT metadata... We are searching for a solution, please try again later!"
							type="warning"
						/>
						<div style={{ marginBottom: '10px' }}></div>
					</>
				)} */}
				<Row justify='center'>
					<Image
						preview={false}
						src={'/assets/userProfile.png'}
						fallback={'/userProfile.png'}
						alt=""
						style={styles.logo}
					/>
				</Row>
				<Row justify='center'>
					<div>
						<div style={styles.title}>{`${walletAddress}`}</div>
						<div
							style={styles.subtitle} 
						> Joined December 2021</div>
					</div>
				</Row>
				<Row style={styles.NFTs}>
					{NFTBalance &&
          NFTBalance.map((nft, index) => (
			  <div style={styles.collection} key={index}
			  >
          		<Card
          			style={styles.card}
          			bordered={false}
          			cover={
          				<Image
          					preview={false}
          					src={nft?.image}
          					alt=""
          					style={styles.image}
							  placeholder={
          						<Image
          							preview={false}
          							src={'/assets/collectionLogo.png'}
          							width={162}
									  style={styles.image}
          						/>
          					}
          				/>
          			}
          		/>
			  </div>
          	// <Card
          	// 	hoverable
          	// 	actions={[
          	// 		<Tooltip title="View On Blockexplorer" key={index}>
          	// 			<FileSearchOutlined
          	// 				onClick={() =>
          	// 					window.open(
          	// 						`${getExplorer(chainId)}address/${nft.token_address}`,
          	// 						'_blank'
          	// 					)
          	// 				}
          	// 			/>
          	// 		</Tooltip>,
          	// 		<Tooltip title="List NFT for sale" key={index}>
          	// 			<ShoppingCartOutlined onClick={() => handleSellClick(nft)} />
          	// 		</Tooltip>,
          	// 	]}
          	// 	style={{ width: 240, border: '2px solid #e7eaf3' }}
          	// 	cover={
          	// 		<Image
          	// 			preview={false}
          	// 			src={nft?.image || 'error'}
          	// 			fallback="data:image/png;base64,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"
          	// 			alt=""
          	// 			style={{ height: '240px' }}
          	// 		/>
          	// 	}
          	// 	key={index}
          	// >
          	// 	<Meta title={nft.name} description={nft.contract_type} />
          	// </Card>
          ))}
		  </Row>
			</div>

			<Modal
				title={`List ${nftToSend?.name} #${nftToSend?.token_id} For Sale`}
				visible={visible}
				onCancel={() => setVisibility(false)}
				onOk={() => list(nftToSend, price)}
				okText="List"
				footer={[
					<Button onClick={() => setVisibility(false)} key={'cancel'}>
            Cancel
					</Button>,
					<Button onClick={() => approveAll(nftToSend)} key={'approve'}type="primary">
            Approve
					</Button>,
					<Button onClick={() => list(nftToSend, price)} key={'list'}type="primary">
            List
					</Button>
				]}
			>
				<Spin spinning={loading}>
					<img
						src={`${nftToSend?.image}`}
						style={{
							width: '250px',
							margin: 'auto',
							borderRadius: '10px',
							marginBottom: '15px',
						}}
					/>
					<Input
						autoFocus
						placeholder="Listing Price in MATIC"
						onChange={(e) => setPrice(e.target.value)}
					/>
				</Spin>
			</Modal>
		</>
	)
}

export default NFTBalance
