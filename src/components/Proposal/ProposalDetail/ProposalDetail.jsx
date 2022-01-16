import { Row, Card, Col, Avatar, Image, Rate, Button, Form, Input } from 'antd'
import NFTCarousel from '../../Carousel'

import { useState } from 'react'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import { useMoralis } from 'react-moralis'

import { mumbaiGovernorAddress } from '../../../../config'

import Governor from '../../../../artifacts/contracts/PricerGovernor.sol/PricerGovernor.json'

const { Meta } = Card
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
}

const onFinish = (values) => {
	console.log("finish")
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

const ProposalDetail = ({info}) => {

	const [currentRating, setCurrentRating] = useState(0)
	const [currentReview, setCurrentReview] = useState("review to earn is pretty awesome!")

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

		console.log("end")
	}


	return (
		<>
			<Row>
				<NFTCarousel source={info.tokens}/>
			</Row>
			<Row>
				<Col span={13}>
					<Row>
						<Col span={8}>
							<h1>
								{info.tokens[0].name}
							</h1>
							<h3>
								{`0 people have voted`}
							</h3>
						</Col>

					</Row>
					<Row>
						<Col span={12}>
							<Card>
								<Meta title="Novelty Score" description={info.noveltyScore}></Meta>
							</Card>
						</Col>
						<Col span={12}>
							<Card>
								<Meta title="AI Tags" description={info.aiTag}></Meta>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col span={24}><h1>Description</h1></Col>
						<Col><h4>
							{dummyData.description}
						</h4></Col>
					</Row>
					<Row>
						<Col span={24}><h1>Community</h1></Col>
						<Col>
							<Card>
								<Meta title={dummyData.communityInfo.twitterFollower} description="Twitter Followers"></Meta>
							</Card>
						</Col>
						<Col>
							<Card>
								<Meta title={dummyData.communityInfo.twitterMentions} description="Twitter Mentions"></Meta>
							</Card>
						</Col>
						<Col>
							<Card>
								<Meta title={dummyData.communityInfo.discordMembers} description="Discord Members"></Meta>
							</Card>
						</Col>
					</Row>

					<Row>
						<Col span={24}><h1>Similar Collections (with similar tags)</h1></Col>
						{dummyData.similarCollections.map((collection)=> (
							<Image
								key={collection.name}
								width={225}
								height={200}
								alt=""
								src={collection.img}
								placeholder={
									<Image
										preview={false}
										src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
										width={200}
									/>
								}
							/>
						))}
					</Row>
				</Col>
				<Col offset={1} span={10}>
					<Row justify='center'>
						<Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
							<Card title="My Reviews" style={{ width: 500 }}>
								<Form.Item>
									<Rate onChange={(value) => {
						        setCurrentRating(value)
						      }} value={currentRating}/>
								</Form.Item>
								<Form.Item>
									<Input.TextArea placeholder='Leave a Comment'/>
								</Form.Item>
								<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
									<Button onClick={submitVote} type="primary" htmlType="submit">
										Submit
									</Button>
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
	description: 'Blah Blah Blah',
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
