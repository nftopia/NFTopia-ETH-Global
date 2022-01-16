import { Row, Col, Card } from 'antd'

const styles = {
	card: {
		textAlign: 'center',
	},
	column: {
		marginRight: '100px',
		textAlign: 'left',
		width: '100%'
	},
	title: {
		fontWeight: 'bold',
		fontSize: '18px',
		lineHeight: '21px',
		color: 'black',
		marginBottom: '16px'
	},
	value: {
		fontWeight: 'normal',
		fontSize: '24px',
		fontStyle: 'nomral',
		lineHeight: '29px',
		color: 'black',
	},
	eth: {
		justifyContent: 'center',
		padding: '24px 0',
		backgroundColor: '#F5F5F5',
		width: '130px',
		height: '83px',
		borderRadius: '10px'
	}
}
const RewardCard = ({item}) => {
	return (
		<Card style={styles.card}>
			<Row>
				<Col span={6}>
					<div style={styles.column}>
						<div style={styles.title}>
							{item.title1}
						</div>
						<div style={styles.value}>
							{item.value1}
						</div>
					</div>
				</Col>
				<Col span={6}>
					<div style={styles.column}>
						<div style={styles.title}>
							{item.title2}
						</div>
						<div style={styles.value}> 
							{item.value2}
						</div>
					</div>
				</Col>
				<Col span={6}>
					<div style={styles.column}>
						<div style={styles.title}>
							{item.title3}
						</div>
						<div style={styles.value}>
							{item.value3}
						</div>
					</div>
				</Col>
				<Col span={6}>
					<div style={styles.eth}>
						<div style={styles.title}>
							{item.eth}
						</div>
					</div>
				</Col>
			</Row>
		</Card>       
	)
}

export default RewardCard