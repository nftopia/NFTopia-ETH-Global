import { Row, Col, Button, List, Image } from 'antd'
import { useContext } from 'react'
import StoreContext from '../utils/store'
import ProposalCard from '../components/Proposal/ProposalCard/ProposalCard'
import { getCollectionsByChain } from '../helpers/collections'
import { useMoralisDapp } from '../providers/MoralisDappProvider/MoralisDappProvider'

const styles = {
	wrapper: {
		marginTop: '163px',
		marginBottom: '90px'
	},
	banner: {
		width: '100%',
		height: '450px',
		backgroundColor: '#DBFF4B',
		padding: '80px 120px 80px 120px',
		lineHeight: '99px',
		fontWeight: 'bold',
		fontStyle: 'normal',
		position: 'relative'
	},
	image: {
		position: 'absolute',
		right: 120,
		top: -26
	},
	title: {
		fontSize: '83.3px',
		width: '502px'
	},
	content: {
		margin: '50px 120px 32px 120px',
	},
	subtitle: {
		fontWeight: 'bold',
		fontSize: '32px',
		lineHeight: '38px',
		marginLeft: '8px',
		marginBottom: '16px'
	},
	reviewButton: {
		backgroundColor: 'black',
		borderRadius: '10px',
		color: 'white',
		width: '149px',
		height: '40px',
		fontWeight: 590,
		fontSize: '16px'
	},
	collectionItem: {
		borderRadius: '21.6px'
	}
}

const { Item } = List

const Home = () => {
	// eslint-disable-next-line no-unused-vars
	const { selectedProposal: [selectedProposal, setSelectedProposal]} = useContext(StoreContext)
	const { chainId } =
    useMoralisDapp()

	const NFTCollections = getCollectionsByChain(chainId)

	return (
		<div style={styles.wrapper}>
			<Row style={styles.banner}>
				<Col span={24}>
					<div style={styles.title}>Review NFTs, Get Rewards</div>
				</Col>
				<img style={styles.image} width="400" height="400" src="/assets/homepage.png" alt=""></img>
				<Button style={styles.reviewButton}>Start Earning</Button>
			</Row>
			<Row style={styles.content}>
				<Col span={24}>
					<div style={styles.subtitle}>
						Collections waiting for review
					</div>
				</Col>
				{data.map((item)=> (
					<Col span={8} key={item.title}>
						<ProposalCard title={item.title} desc={item.des} img={item.img} openProposal={setSelectedProposal}/>
					</Col>
				))}
			</Row>
			<Row style={styles.content}>
				<Col span={24}>
					<div style={styles.subtitle}>
						Popular collections
					</div>
				</Col>
				<Col span={24}>
					<List
						grid={{gutter: 8, column: 8}}
						dataSource={NFTCollections}
						renderItem={item => (
							<Item>
								<Image
									style={styles.collectionItem}
									height={200}
									src={item.image}
									fallback={'/assets/collectionLogo.png'}
									alt="/assets/collectionLogo.png"
								/>
							</Item>
						)}
					/>
				</Col>
			</Row>

		</div>
	)
}

const data = [
	{
		title: 'Proposal 1',
		des: 'Proposal 1 Desc',
		img: '/assets/homepagecollection1.png'
	},
	{
		title: 'Proposal 2',
		des: 'Proposal 2 Desc',
		img: '/assets//homepagecollection2.png'
	},
	{
		title: 'Proposal 3',
		des: 'Proposal 1 Desc',
		img: '/assets/homepagecollection3.png'
	},
]

export default Home
