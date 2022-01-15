import { useState, useEffect } from 'react'
import { Card, Avatar, Tooltip } from 'antd'
import { RightCircleOutlined } from '@ant-design/icons'

const { Meta } = Card

const styles = {
	card: {
		margin: '8px',
	},
	cardContent: {
		height: 200
	}
}
const ProposalCard = ({title, desc, openProposal}) => {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
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
					<img
						height="100"
						alt="example"
						src="https://kylekittleson.com/wp-content/uploads/2017/11/touch.png"
					/>
				}
				actions={[
					<Tooltip title="Review Collection" key="enter">
						<RightCircleOutlined
							onClick={() => {openProposal(title)}}
						/>
					</Tooltip>,
				]}
			>
				<Meta
					avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
					title={title}
					description={desc}
				/>
			</Card>
		</>
	)
}

export default ProposalCard