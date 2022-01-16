import { useState, useEffect, useContext } from 'react'
import StoreContext from '../../../utils/store'
import { useRouter } from 'next/router'
import { Card, Tooltip, Row, Col, Button } from 'antd'


const styles = {
	card: {
		margin: '8px'
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
		marginBottom: '31px',
		width: '100%'
	},
	statusWrapper: {
		background:' #F5F5F5',
		borderRaduius: '10px',
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
	},
	images: {
		height: '100px',
		width: '100%'
	}
}
// eslint-disable-next-line no-unused-vars
const ProposalCard = ({title, desc, img, collection, openProposal}) => {
	// eslint-disable-next-line no-unused-vars
	const { selectedProposal: [selectedProposal, setSelectedProposal]} = useContext(StoreContext)
	const [loading, setLoading] = useState(true)
	const router = useRouter()
	useEffect(() => {
		setSelectedProposal('explore')
		//TODO: Remove it once have the real data fecthing
		setTimeout(()=> {
			setLoading(false)
		}, 2000)
	},[])

	return (
		<>
			<Card style={styles.card} hoverable={true} loading={loading}
				bodyStyle={
					styles.cardContent
				}
				cover={
					<img style={styles.images}
						alt="example"
						src={img}
					/>
				}
				actions={[
					<Tooltip title="Review Collection" key="enter">
						<Button
							style={styles.enterButton}
							type="primary" onClick={() => {router.push('/proposal');openProposal(collection)}}
						>Enter</Button>
					</Tooltip>,
				]}
			>
				<Row>
					<Col span={8}>
						<div style={styles.title}>{title}</div>
					</Col>

				</Row>
				<Row>
					<div style={styles.desc}>
						{desc}
					</div>
				</Row>
			</Card>
		</>
	)
}

export default ProposalCard
