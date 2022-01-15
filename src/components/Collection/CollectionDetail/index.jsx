import { Tabs, Card, Tooltip, Button, Image, Badge } from 'antd'
import Reviews from '../../Reviews'
import { getExplorer } from '../../../helpers/networks'

const { TabPane } = Tabs

const styles = {
	NFTs: {
		display: 'flex',
		flexWrap: 'wrap',
		WebkitBoxPack: 'start',
		justifyContent: 'flex-start',
		margin: '0 auto',
		maxWidth: '1000px',
		gap: '10px',
	},
}

const { Meta } = Card 

const CollectionDetail = ({NFTTokenIds, chainId, handleBuyClick, getMarketItem, fallbackImg }) => {
	return (
		<Tabs defaultActiveKey="1" centered>
			<TabPane tab="Items" key="1">
				<div style={styles.NFTs}>
					{NFTTokenIds.slice(0, 20).map((nft, index) => (
						<Card
							hoverable
							actions={[
								<Tooltip title="View On Blockexplorer" key={index}>
									<Button
										onClick={() =>
											window.open(
												`${getExplorer(chainId)}address/${nft.token_address}`,
												'_blank'
											)
										}
									></Button>
								</Tooltip>,
								<Tooltip title="Buy NFT" key={index}>
									{/* TODO: */}
									<Button onClick={() => handleBuyClick(nft)} />
								</Tooltip>,
							]}
							style={{ width: 240, border: '2px solid #e7eaf3' }}
							cover={
								<Image
									preview={false}
									src={nft.image || 'error'}
									fallback={fallbackImg}
									alt=""
									style={{ height: '240px' }}
								/>
							}
							key={index}
						>
							{getMarketItem(nft) && (
								<Badge.Ribbon text="Buy Now" color="green"></Badge.Ribbon>
							)}
							<Meta title={nft.name} description={`#${nft.token_id}`} />
						</Card>
					))}
				</div>
			</TabPane>
			<TabPane tab="Reviews" key="2">
				<Reviews />
			</TabPane>
			<TabPane tab="Activities" key="3">
			Placeholder for activities
			</TabPane>
		</Tabs>
	)
}

export default CollectionDetail