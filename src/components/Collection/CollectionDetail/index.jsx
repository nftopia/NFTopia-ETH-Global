/* eslint-disable no-unused-vars */
import { Tabs, Card, Tooltip, Button, Image, Badge, Row, Col } from 'antd'
import Reviews from '../../Reviews'
import { getExplorer } from '../../../helpers/networks'

const { TabPane } = Tabs

const styles = {
	image: {
		height: '162px',
		width: '162px',
		borderRadius: '15.38px'
	},
	card: {
		marginRight: '20px'
	}
}

const { Meta } = Card 

const CollectionDetail = ({NFTTokenIds, chainId, handleBuyClick, getMarketItem, fallbackImg }) => {
	return (
		<>
			<Tabs defaultActiveKey="1" centered>
				<TabPane tab="Items" key="1">
					<Row gutter={[12, 85]} style={styles.NFTs}>
						{NFTTokenIds.slice(0, 20).map((nft, index) => (
							<Col key={index}
							>
								<Card
									bordered={false}
									bodyStyle={{padding: '12px 0'}}
									// actions={[
									// 	<Tooltip title="View On Blockexplorer" key={index}>
									// 		<Button
									// 			onClick={() =>
									// 				window.open(
									// 					`${getExplorer(chainId)}address/${nft.token_address}`,
									// 					'_blank'
									// 				)
									// 			}
									// 		></Button>
									// 	</Tooltip>,
									// 	<Tooltip title="Buy NFT" key={index}>
									// 		{/* TODO: */}
									// 		<Button onClick={() => handleBuyClick(nft)} />
									// 	</Tooltip>,
									// ]}
									style={styles.card}
									cover={
										<Image
											preview={false}
											src={nft.image || 'error'}
											fallback={fallbackImg}
											alt=""
											style={styles.image}
										/>
									}
								>
									{/* {getMarketItem(nft) && (
									<Badge.Ribbon text="Buy Now" color="green"></Badge.Ribbon>
								)} */}
									<Row justify='center'>
										<Meta title={nft.name} description={`#${nft.token_id}`} />
									</Row>
								</Card>
							</Col>
						))}
					</Row>
				</TabPane>
				<TabPane tab="Reviews" key="2">
					<Reviews />
				</TabPane>
				<TabPane tab="Activities" key="3">
			Placeholder for activities
				</TabPane>
			</Tabs>
		</>
	)
}

export default CollectionDetail