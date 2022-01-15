
import { Image } from 'antd'

const styles = {
	banner: {
		display: 'flex',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		margin: '0 auto',
		width: '600px',
		//borderRadius: "10px",
		height: '150px',
		marginBottom: '40px',
		paddingBottom: '20px',
		borderBottom: 'solid 1px #e3e3e3',
	},
	logo: {
		height: '115px',
		width: '115px',
		borderRadius: '50%',
		// positon: "relative",
		// marginTop: "-80px",
		border: 'solid 4px white',
	},
	text: {
		color: '#041836',
		fontSize: '27px',
		fontWeight: 'bold',
	},
}

const CollectionBanner = ({NFTTokenIds, totalNFTs, stats, fallbackImg}) => {
	return (
		<div style={styles.banner}>
			<Image
				preview={false}
				src={NFTTokenIds[0]?.image || 'error'}
				fallback={fallbackImg}
				alt=""
				style={styles.logo}
			/>
			<div style={styles.text}>
				<>
					<div>{`${NFTTokenIds[0]?.name}`}</div>
					<div
						style={{
							fontSize: '15px',
							color: '#9c9c9c',
							fontWeight: 'normal',
						}}
					>
                    Collection Size: {`${totalNFTs}`}
										Owner Count: {stats?.owners}
										Novelty Score: {stats?.noveltyScore}
										Community Rating: {stats?.rating}
					</div>
				</>
			</div>
		</div>
	)
}

export default CollectionBanner