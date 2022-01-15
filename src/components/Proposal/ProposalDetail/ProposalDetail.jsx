import { Row, Card, Col, Avatar, Image, Rate, Button, Form, Input } from 'antd'
import NFTCarousel from '../../Carousel'

const { Meta } = Card
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
}

const onFinish = (values) => {
	alert(values)
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

const ProposalDetail = () => {
	
	return (
		<>
			<Row>
				<NFTCarousel />
			</Row>
			<Row>
				<Col span={13}>
					<Row>
						<Col span={4}>
							<h1>
								{dummyData.collectionName}
							</h1>
							<h3>
								{`${dummyData.numberOfVotedPeople} people have voted`}
							</h3>
						</Col>
						<Col span={4} offset={16}>
							<div>Ends in 36 hours</div>
						</Col>
					</Row>
					<Row>
						<Col span={12}>
							<Card>
								<Meta title="Novelty Score" description={dummyData.noveltyScore}></Meta>
							</Card>				
						</Col>
						<Col span={12}>
							<Card>
								<Meta title="AI Tags" description={dummyData.AITags.map((tag)=> (
									` ${tag} |`
								))}></Meta>	
							</Card>			
						</Col>
					</Row>
					<Row>
						<Col span={24}><h1>About</h1></Col>
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
						<Col span={24}><h1>Key People</h1></Col>
						<Avatar.Group
							maxCount={5}
							maxPopoverTrigger="click"
							size="large"
							maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
						>
							{dummyData.keyPeople.map((people)=>(
								<Meta key={people.name} avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />} title={`${people.name}`} />
							))}
					
						</Avatar.Group>
					</Row>
					<Row>
						<Col span={24}><h1>Similar Collections(2)</h1></Col>
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
									<Rate />
								</Form.Item>
								<Form.Item>								
									<Input.TextArea placeholder='Leave a Comment'/>
								</Form.Item>
								<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
									<Button type="primary" htmlType="submit">Submit</Button>
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
			name: 'Doodles',
			img: 'https://pbs.twimg.com/tweet_video_thumb/FI65UrdUcAQSKtd.jpg'
		},
		{
			name: 'Cool Cats',
			img: 'https://lh3.googleusercontent.com/Alhv4pn_L805OaXdAychKVSm1O6C619mSuNJOtuXRFNfNzHnZ8SJBm2yHAylgfkh4xe-jgZtdCdQI3sxzew6fZGOscbHytW5-EEHLw=w600'
		}
	]
    
    
}

export default ProposalDetail