
import { Image, Row, Divider, Rate } from 'antd'

const styles = {
	banner: {

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
	stats: {
		marginTop: '32px'
	},
	statsTitle: {
		fontWeight: '510',
		fontSize: '12px',
		lineHeight: '14px',
		color: '#8C939A',
		marginBottom: '12px'
	},
	statsNumber: {
		fontWeight: 'bold',
		fontSize: '20px',
		lineHeight: '20px'
	},
	statsRate: {
		fontSize: '20px',
		lineHeight: '20px'
	},
	logo: {
		height: '162px',
		width: '162px',
		borderRadius: '50%',
		positon: 'relative',
		marginTop: '-80px',
		border: 'solid 4px white',
	},
	text: {
		marginTop: '32px'
	},
	statsContainer: {
		textAlign: 'center',
		marginLeft: '8px',
		marginRight: '8px'
	},
	divider: {
		borderLeft: '1px solid #DDDDDD',
		height: '41px',
	}
}

const CollectionBanner = ({NFTTokenIds, totalNFTs, stats, fallbackImg}) => {
	console.log(stats)
	return (
		<>
			<div style={styles.banner}>
				<Row justify='center'>
					<Image
						preview={false}
						src={NFTTokenIds[0]?.image || 'error'}
						fallback={fallbackImg}
						alt=""
						style={styles.logo}
					/>
				</Row>
				<Row justify='center'>
					<div>
						<div style={styles.title}>{`${NFTTokenIds[0]?.name}`}</div>
						<div
							style={styles.subtitle}
						> Joined December 2021</div>
					</div>
				</Row>
				<Row justify='center' style={styles.stats}>
					<div style={styles.statsContainer}>
						<div style={styles.statsTitle}>
							Novelty Score
						</div>
						<div style={styles.statsNumber}>
							{stats?.noveltyScore}
						</div>
					</div>
					<Divider style={styles.divider} type="vertical" />
					<div style={styles.statsContainer}>
						<div style={styles.statsTitle}>
							Community Rating
						</div>
						<div style={styles.statsNumber}>
							<Rate style={styles.rate} disabled defaultValue={4.5} value={5}/>
						</div>
					</div>
					<Divider style={styles.divider} type="vertical" />
					<div style={styles.statsContainer}>
						<div style={styles.statsTitle}>
						Collection Size
						</div>
						<div style={styles.statsNumber}>
							{`${totalNFTs}`}
						</div>
					</div>
					<Divider style={styles.divider} type="vertical" />
					<div style={styles.statsContainer}>
						<div style={styles.statsTitle}>
							Owner Count
						</div>
						<div style={styles.statsNumber}>
							1
						</div>
					</div>
				</Row>
			</div>
		</>
	)
}

export default CollectionBanner
