import { useState, useEffect, useContext } from 'react'
import StoreContext from '../../../utils/store'
import { useRouter } from 'next/router'
import { Card, Tooltip, Row, Col, Button } from 'antd'


const styles = {
	card: {
		margin: '8px',
	},
	cardContent: {
		height: 200
	},
	title: {
		fontWeight: 'bold',
		fontSize: '18px',
		lineHeight: '21px',
		marginBottom: '8px'
	},
	subtitle: {
		fontWeight: '510',
		fontSzie: '14px',
		lineHeight: '17px',
		marginBottom: '47px'
	},
	desc: {
		fontWeight: '510',
		fontSzie: '14px',
		color: '#8C939A',
		lineHeight: '17px',
		marginBottom: '31px'
	},
	statusWrapper: {
		background:' #F5F5F5',
		borderRadius: '10px',
		padding: '12px 16px',
		width: '100px',
	},
	statusPrefix: {
		fontWeight: '510',
		fontSize: '14px',
		lineHeight: '17px',
	},
	status: {
		fontWeight: 'bold',
		fontSize: '14px',
		lineHeight: '17px',
		color: '#27AE60'
	},
	enterButton: {
		width: '90%',
		borderRadius: '10px',
		height: '40px'
	}
}
// eslint-disable-next-line no-unused-vars
const ProposalCard = ({proposoal, openProposal}) => {
	// eslint-disable-next-line no-unused-vars
	// const { selectedProposal: [selectedProposal, setSelectedProposal]} = useContext(StoreContext)
	// const [loading, setLoading] = useState(true)
	// const router = useRouter()
	// useEffect(() => {
	// 	setSelectedProposal(collectionAddr)
	// 	//TODO: Remove it once have the real data fecthing
	// 	setTimeout(()=> {
	// 		setLoading(false)
	// 	}, 2000)
	// },[])

	return (
		<>
			<Card style={styles.card} hoverable={true}
				bodyStyle={
					styles.cardContent
				}
				cover={
					<img
						height="110"
						alt="example"
						src={proposoal?.collection_img}
					/>
				}
			>
				<Row>
					<Col span={6}>
						<div style={styles.title}>{proposoal?.collection_name}</div>
						<div style={styles.subtitle}>{'9,999 NFTs'}</div>
					</Col>
					<Col span={6} offset={12}>
						<div style={styles.statusWrapper}>
							<span style={styles.statusPrefix}>
								{'Ends in '}
							</span>
							<span style={styles.status}>
								{/* TODO: */}
								{'36 hours'}
							</span>
						</div>
					</Col>
				</Row>
				<Row>
					<div style={styles.desc}>
						{proposoal?.description}
					</div>
				</Row>
				<Row justify='center'>
					<Button style={styles.button}
						onClick={() => {openProposal(proposoal?.collection)}}
					>Enter</Button>
				</Row>
			</Card>
		</>
	)
}

export default ProposalCard
