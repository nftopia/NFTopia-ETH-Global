/* eslint-disable no-unused-vars */
import { Row, Card, Col, Avatar, Image, Rate, Button, Form, Input } from 'antd'
import NFTCarousel from '../../Carousel'

import { useState } from 'react'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import { useMoralis } from 'react-moralis'

import { mumbaiGovernorAddress } from '../../../../config'

import Governor from '../../../../artifacts/contracts/PricerGovernor.sol/PricerGovernor.json'

const onFinish = (values) => {
	console.log('finish')
}

const validateMessages = {
	required: '${label} is required!',
	types: {
		email: '${label} is not a valid email!',
		number: '${label} is not a valid number!',
	},
	number: {
		range: '${label} must be between ${min} and ${max}',
	},
}

const styles = {
	statusWrapper: {
		background:' #F5F5F5',
		borderRadius: '10px',
		padding: '12px 16px',
		width: '100px',
	},
	title: {
		fontWeight: 'bold',
		fontSize: '32px',
		lineHeight: '38px',
		marginBottom: '4px'
	},
	subtitle: {
		fontWeight: '510',
		fontSzie: '16px',
		lineHeight: '19px',
		marginBottom: '47px'
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
	card: {
		textAlign: 'center',
		borderRadius: '10px',
		border: '1px solid #E6E8EB',
		width: '360px',
		padding: '32px 64px',
		marginBottom: '32px'
	},
	card2: {
		textAlign: 'center',
		borderRadius: '10px',
		border: '1px solid #E6E8EB',
		height: '121px',
		padding: '32px 64px',
		marginBottom: '32px'
	},
	cardTitle: {
		fontWeight: 'bold',
		fontSize: '18px',
		lineHeight: '21px',
		marginBottom: '8px'
	},
	cardText1: {
		fontWeight: '510',
		fontSize: '40px',
		lineHeight: '48px',
		color: '#27AE60'
	},
	cardText2: {
		fontWeight: '510',
		fontSize: '40px',
		lineHeight: '48px',
		color: '#C9C9C9'
	},
	cardTagText: {
		fontWeight: '510',
		fontSize: '18px',
		lineHeight: '24px',
		color: 'black'
	},
	section: {
		fontWeight: 'bold',
		fontSize: '18px',
		lineHeight: '21px',
		marginBottom: '16px'
	},
	desc: {
		fontWeight: '510',
		fontSize: '16px',
		lineHeight: '19px',
		color: 	'#8C939A',
		marginBottom: '32px'
	},
	card2Title: {
		fontWeight: 'bold',
		fontSize: '24px',
		lineHeight: '29px',
		marginBottom: '5px'
	},
	card2Text: {
		fontWeight: '510',
		fontSize: '14px',
		lineHeight: '17px',
		color: '#8C939A'
	},
	form: {
		textAlign: 'center',
		backgroundColor: '#CDED4F',
		padding: '16px',
		width: '500px',
	},
	rate: {
		color: 'black'
	},
	button: {
		background: 'black',
		borderRadius: '10px',
		height: '40px',
		width: '358px',
		color: 'white',
		marginTop: '19px',
	},
	disabledbutton:{
		background: 'grey',
		borderRadius: '10px',
		height: '40px',
		width: '358px',
		color: 'black',
		marginTop: '19px',
	}
}

const ProposalDetail = ({info}) => {

	const [currentRating, setCurrentRating] = useState(0)
	const [currentReview, setCurrentReview] = useState('review to earn is pretty awesome!')
	const [reviewPosted, setReviewPosted] = useState(false)

	const router = useRouter()




	async function submitVote() {

		if (currentRating === 0) return

		console.log(currentRating)
		console.log(currentReview)

		const web3Modal = new Web3Modal()
		const connection = await web3Modal.connect()
		const provider = new ethers.providers.Web3Provider(connection)
		const signer = provider.getSigner()

		const governorContract = new ethers.Contract(mumbaiGovernorAddress, Governor.abi, signer)

		// const tx = await governorContract.castVoteWithReason(pid, rating-1, review)
		//
		// governorContract.on("VoteCast", (voter, proposalId, support, weight, reason) => {
		// 		console.log("This voter has voted: " + voter);
		// 		const Review = Moralis.Object.extend("Reviews");
		// 		const review = new Review();
		//
		// 		review.set("proposal_id", proposalId);
		// 		review.set("voter", voter);
		// 		review.set("rating", support+1);
		// 		review.set("weight", weight);
		// 		review.set("review", reason);
		//
		// 		review.save();
		// 		console.log("Back to home page")
		//
		// 		router.push('/')
		// });

		console.log('end')
	}


	return (
		<>
			<Row justify='center'>
				<NFTCarousel source={info.tokens}/>
			</Row>
			<Row>
				<Col span={13}>
					<Row justify='space-between'>
						<div>
							<div style={styles.title}>
								{info.tokens[0].name}
							</div>
						</div>

					</Row>
					<Row justify='space-between'>
						<Col span={12} style={styles.card}>
							<div style={styles.cardTitle}>
							Novelty Score
							</div>
							<div style={styles.cardText1}>
								<span>{info.noveltyScore}</span><span style={styles.cardText2}>/10</span>
							</div>
						</Col>
						<Col offset={1} span={11} style={styles.card}>
							<div style={styles.cardTitle}>
							AI Tags
							</div>
							<div style={styles.cardTexcardTagTextt1}>
								{info.aiTag}
							</div>
						</Col>
					</Row>
					<Row>
						<Col span={24}><div style={styles.section}>About</div></Col>
						<Col><div style={styles.desc}>
							{/* TODO: */}
							{dummyData.description}
						</div></Col>
					</Row>
					<div style={styles.section}>Community</div>
					<Row>
						<Col span={8} style={styles.card2}>
							<div style={styles.card2Title}>
								{dummyData.communityInfo.twitterFollower}
							</div>
							<div style={styles.card2Text}>
								Twitter Followers
							</div>
						</Col>
						<Col span={8} style={styles.card2}>
							<div style={styles.card2Title}>
								{dummyData.communityInfo.twitterMentions}
							</div>
							<div style={styles.card2Text}>
								Twitter Mentions
							</div>
						</Col>
						<Col span={8} style={styles.card2}>
							<div style={styles.card2Title}>
								{dummyData.communityInfo.discordMembers}
							</div>
							<div style={styles.card2Text}>
								Discord Members
							</div>
						</Col>
					</Row>
					<div style={styles.section}>Similar Collections (with similar tags)</div>
					<Row>
						{dummyData.similarCollections.map((collection)=> (
							<div key={collection.name} style={{marginRight: '30px'}}>
								<Image
									width={90}
									height={90}
									alt="/assets/collectionLogo.png"
									src={collection.img}
									placeholder={
										<Image
											preview={false}
											src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
											width={90}
											height={90}
										/>
									}
								/>
							</div>
						))}
					</Row>
				</Col>
				<Col offset={1} span={10}>
					<Row justify='center'>
						<Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
							<Card title="My Reviews" style={styles.form}>
								<Form.Item>
									<Rate style={styles.rate} onChange={(value) => {
						        setCurrentRating(value)
						      }} value={currentRating}/>
								</Form.Item>
								<Form.Item>
									<Input.TextArea rows={6} placeholder='Leave a Comment'/>
								</Form.Item>
								<Form.Item>
									{reviewPosted ? (<Button onClick={() => setReviewPosted(!reviewPosted)} style={styles.disabledbutton} htmlType="submit" disabled={reviewPosted}>
										Thanks for submitting your review
									</Button>) : (<Button onClick={() => setReviewPosted(!reviewPosted)} style={styles.button} htmlType="submit" disabled={reviewPosted}>
										 Submit
									</Button>)}

								</Form.Item>
							</Card>
						</Form>
					</Row>
				</Col>
			</Row>

		</>
	)
}

const dummyData = {
	collectionName: 'Allen Frens',
	status: 'Launching in 35 hours',
	numberOfVotedPeople: '3781',
	description: 'If you are a member of NFTopia, we invite you to leverage the information we provided, and review this collection to earn',
	keyPeople: [
		{
			name: 'Person 1'
		},
		{
			name: 'Person 2'
		},
		{
			name: 'Person 3'
		}
	],
	AITags: ['2D', 'Simple', 'Cartoon','Zombie','Character'],
	noveltyScore: 9.2,
	communityInfo: {
		twitterFollower: '87K',
		twitterMentions: '120K',
		discordMembers: '126K'
	},
	myRating: null,
	myReviews: '',
	similarCollections: [
		{
			name: 'LinksDAO',
			img: 'https://lh3.googleusercontent.com/4flXT3VrXYC63isfk78Ki3UbDA4tALcMgYCTelqq5n8Z3rQr_Nl_Q1a3NroC6bCDRQ0YDHpkJMHmIXcCcuAmtkenRUuECs8eKD2Ka-0=s0'
		},
		{
			name: 'Art Blocks',
			img: 'https://lh3.googleusercontent.com/UZ7MU-BYcbR7xZ37WMwcr9_-XMgg2bhHu7jU5tOTRpfi3b4LnE3YzZVU4WdMOcnOtHIOKz0Md9bhz8BzrmLdJSvus-TZockc-eTNyA=s0'
		}
	]


}

export default ProposalDetail
