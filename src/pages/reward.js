
import { useState } from 'react'
import { Row, Divider, Card, Button, List } from 'antd'
import RewardCard from '../components/RewardCard/RewardCard'

const styles = {
	wrapper: {
		justifyContent: 'center',
		marginBottom: '64px'
	},
	cover: {
		marginTop: '63px',
		height: '350px',
		width: '100%',
	},
	title: {
		marginTop: '64px',
		fontSize: '32px',
		fontWeight: '700',
		lineHeight: '38px',
		color: 'black',
		textAlign: 'center',
		marginBottom: '4px'
	},
	subtitle: {
		textAlign: 'center',
		fontWeight: 510,
		fontSize: '16px',
		lineHeight: '19px',
		color: 'black',
		marginBottom: '64px'
	},
	scoreBoard: {
		textAlign: 'left',
		marginBottom: '64px'
	},
	scoreWrapper: {
		marginRight: '64px',
		display: 'flex'
	},
	scoreTitle: {
		fontWeight: 'bold',
		fontSize: '20px',
		lineHeight: '24px',
		marginBottom: '12px'    
	},
	claimTitle: {
		fontWeight: 'bold',
		fontSize: '24px',
		lineHeight: '29px',
		color: 'black',
		marginBottom: '18px'
	},
	scoreBody: {
		fontWeight: 'normal',
		fontSize: '54px',
		lineHeight: '64px',
		marginBottom: '12px',
		color: 'black', 
	},
	scoreBody2: {
		color: '#C9C9C9',
	},
	reward: {
		fontWeight: 'bold',
		fontSize: '16px',
		lineHeight: '19px',
		color: '#C9C9C9'
	},
	card: {
		textAlign: 'center',
		height: '270px',
		width: '400px',
		backgroundColor: '#DBFF4B',
		border: '1px solid #DBFF4B',
		boxSizing: 'border-box',
		borderRadius: '10px'
	},
	button: {
		background: 'black',
		borderRadius: '10px',
		height: '40px',
		width: '358px',
		color: 'white',
		marginTop: '19px',
		marginBottom: '24px'
	}
    
}

const Reward = ()=> {
	const [rewardClaimed, setRewardClaimed] = useState(false)
	return (
		<div>
			<img style={styles.cover} src="/assets/Reward.png" alt=""></img>
			<div style={styles.wrapper}>
				<div style={styles.title}>Claim your rewards for this week</div>
				<div style={styles.subtitle}>Jan 9 - Jan 16</div>
				<Row justify='center' style={styles.scoreBoard}>
					<div style={styles.scoreWrapper}>
						<div>
							<div style={styles.scoreTitle}>
                        Reviewed Collections
							</div>
							<div style={styles.scoreBody}>
								<span>19</span><span style={styles.scoreBody2}>/35</span>
							</div>
							<div style={styles.reward}>
                            +0.05 ETH
							</div>
						</div>
						<div style={{marginLeft: '64px'}}>
							<div style={styles.scoreTitle}>
                        Relevance Score
							</div>
							<div style={styles.scoreBody}>
								<span>7.2</span><span style={styles.scoreBody2}>/10</span>
							</div>
							<div style={styles.reward}>
                            +0.16 ETH
							</div>
						</div>
					</div>
					<Card style={styles.card}>
						<div style={styles.claimTitle}>
                            Weekly Rewards
						</div>
						<Divider />
						<div style={styles.scoreBody}>
                            0.21 ETH
						</div>
						<Button onClick={()=> setRewardClaimed(!rewardClaimed)} disabled={rewardClaimed} style={styles.button}>
							{rewardClaimed? 'You are all set!': 'Claim'}
						</Button>
					</Card>
				</Row>
				<Row justify='center'>
					<div>
						<div style={{fontWeight: 'bold', fontSize: '20px', lineHeight: '24px'}}>
                        Past Rewards
						</div>
						<div style={{fontWeight: 'normal', fontSize: '16px', lineHeight: '24px'}}>
                        Total: 2.06 ETH
						</div>
					</div>

				</Row>

				<Row style={styles.wrapper}>
					<List
						itemLayout="vertical"
						size="large"
						dataSource={listData}
						renderItem={item => (
							<List.Item
								key={item.title}
							>
								<RewardCard item={item} />
							</List.Item>
						)}/>
				</Row>
			</div>
		</div>
	)
}

const listData = []
for (let i = 0; i < 5; i++) {
	listData.push({
		title1: 'Date',
		value1: 'Week of Jan 3',
		title2: 'Reviewed Collections',
		value2: '19/32',
		title3: 'Relevance Score',
		value3: '7.2/10',
		eth: '0.18 ETH'
	})
}

export default Reward