import { Card, Button, Image, Row, Col, Rate, Divider } from 'antd'

const styles = {
	card: {
		marginBottom: '20px',
		height: '450px',
		width: '268px'
	},
	image: {
		borderRadius: '27.1256px',
		height: '268px',
		width: '268px'
	},
	title: {
		fontWeight: 'bold',
		fontSize: '18px',
		lineHeight: '21px',
		marginBottom: '20px'
	},
	subtitle: {
		textAlign: 'center',
		fontWeight: 510,
		fontSize: '12px',
		lineHeight: '14px',
		color: '#8C939A',
	},
	novelty: {
		marginTop: '8px',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: '20px',
		lineHeight: '20px'
	},
	rate: {
		marginTop: '4px',
		marginLeft: '2px',
		fontSize: '14px'
	},
	button: {
		fontWeight: 'bold',
		fontSize: '16px',
		lineHeight: '19px',
		marginTop: '20px',
		color: '#ADC751',
		border: 'none',
		borderBottom: 'none',
		boxShadow: 'none'

	},
	divider: {
		borderLeft: '1px solid #DDDDDD',
		height: '41px'
	}
}

const CollectionCard = ({ setInputValue, nft, fallbackImg}) => {
	return (
		<Card
			style={styles.card}
			bordered={false}
			cover={
				<Image
					preview={false}
					src={nft?.image || 'error'}
					fallback={fallbackImg}
					alt=""
					style={styles.image}
				/>
			}
		>
			<Row justify='center' style={styles.title}>
				{nft.name}
			</Row>
			<Row>
				<Col span={10}>
					<div style={styles.subtitle}>Novelty Score</div>
					<div style={styles.novelty}>8.7</div>
				</Col>
				<Divider style={styles.divider} type="vertical" />
				<Col span={12}>
					<div style={styles.subtitle}>Community Rating</div>
					<Rate style={styles.rate} disabled defaultValue={4.5} value={4.5} />				</Col>
			</Row>
			<Row justify='center'>
				<Button style={styles.button}
					onClick={() => {setInputValue(nft?.addrs)}}
				>View Collection</Button>
			</Row>
		</Card>
	)
}

export default CollectionCard