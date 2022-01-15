import { Card, Tooltip, Image } from 'antd'
import {
	RightCircleOutlined,
} from '@ant-design/icons'

const { Meta } = Card

const CollectionCard = ({ setInputValue, nft, fallbackImg}) => {
	return (
		<Card
			hoverable
			actions={[
				<Tooltip title="View Collection" key={'submit'}>
					<RightCircleOutlined
						onClick={() => {setInputValue(nft?.addrs)}}
					/>
				</Tooltip>,
			]}
			style={{ width: 240, border: '2px solid #e7eaf3' }}
			cover={
				<Image
					preview={false}
					src={nft?.image || 'error'}
					fallback={fallbackImg}
					alt=""
					style={{ height: '240px' }}
				/>
			}
		>
			<Meta title={nft.name} />
		</Card>
	)
}

export default CollectionCard