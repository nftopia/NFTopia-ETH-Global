/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import StoreContext from '../utils/store'
import ProposalCard from '../components/Proposal/ProposalCard/ProposalCard'
import {Row, Col, Tabs } from 'antd'
import ProposalDetail from '../components/Proposal/ProposalDetail/ProposalDetail'
import { useProposals } from '../hooks/useProposals'
import { useProposalDetail } from '../hooks/useProposalDetail'
import { useMoralis } from 'react-moralis'


const { TabPane }  = Tabs
const styles = {
	wrapper: {
		margin: '17px 120px 90px 120px',
	},
	cover: {
		height: '350px',
		width: '100%',
		marginTop: '60px'
	},
	title: {
		fontSize: '32px',
		fontWeight: '700',
		lineHeight: '38px',
		color: 'black',
		textAlign: 'center',
		marginBottom: '32px'
	},
	tab: {
		fontWeight: 'bold',
		lineHeight: '19px',
		fontSize: '16px',
		color: 'black'
	},
	row: {
		marginTop: '32px'
	}
}

const onTabChange = (key) => {
	console.log(key)
}

const Proposal = () => {

	// eslint-disable-next-line no-unused-vars
	//TODO: Error: You need to call Parse.initialize before using Parse.
	// const { proposals } = useProposals()

	const { selectedProposal: [selectedProposal, setSelectedProposal]} = useContext(StoreContext)
	const { upcomingProposal, inprogressProposal, endedProposal } = proposalData
	const { proposalInfo } = useProposalDetail('0x275d553f426355c20b134D944B5b28D31CDb83DA')

	return (
		<>
			<div>
				{selectedProposal === 'explore' &&
                    <div style={styles.wrapper}>
                    	<div style={styles.title}>Review to Earn</div>
                    	<Tabs style={styles.tab} defaultActiveKey='1' centered onChange={onTabChange}>
                    		<TabPane  tab="Upcoming" key="1">
                    			<Row gutter={[32, 24]} justify='center'>
                    				{upcomingProposal.map((proposal)=> (
                    					<Col span={8} key={proposal.title} >
                    						<ProposalCard title={proposal.title} desc={proposal.desc} img={proposal.img} openProposal={setSelectedProposal}/>
                    					</Col>
                    				))}
                    			</Row>
                    		</TabPane>
                    		<TabPane tab="In Progress" key="2">
                    			<Row gutter={[32, 24]} justify='center'>
                    				{upcomingProposal.map((proposal)=> (
                    					<Col span={8} key={proposal.title} >
                    						<ProposalCard title={proposal.title} desc={proposal.desc} img={proposal.img} openProposal={setSelectedProposal}/>
                    					</Col>
                    				))}
                    			</Row>
                    		</TabPane>
                    		<TabPane tab="Ended" key="3">
                    			<Row gutter={[32, 24]} justify='center'>
                    				{upcomingProposal.map((proposal)=> (
                    					<Col span={8} key={proposal.title} >
                    						{/* TODO: Title may not be unique */}
                    						<ProposalCard title={proposal.title} desc={proposal.desc} img={proposal.img} openProposal={setSelectedProposal} />
                    					</Col>
                    				))}
                    			</Row>
                    		</TabPane>
                    	</Tabs>
                    </div>}
				{selectedProposal !== 'explore' &&
                <>
                	<Row justify='center'>
				    	<img style={styles.cover} src="/assets/collectionCover.png"></img>
			        </Row>
                	<div style={styles.wrapper}>
                		<ProposalDetail info={proposalInfo}/>

                	</div>
                </>
				}
			</div>
		</>
	)
}

const proposalData = {
	upcomingProposal: [
		{
			title: 'Proposal 1',
			des: 'Review for Test Mage',
			img: 'https://lh3.googleusercontent.com/BWCni9INm--eqCK800BbRkL10zGyflxfPwTHt4XphMSWG3XZvPx1JyGdfU9vSor8K046DJg-Q8Y4ioUlWHiCZqgR_L00w4vcbA-w=s0'
		},
		{
			title: 'Proposal 2',
			des: 'Review for Pixel Show',
			img: 'https://ipfs.moralis.io:2053/ipfs/QmfLbpeVHxReWKNLaXTPcWiafi49eoAL4gRwMGuXtx2Eqe/images/14.png'
		},
		{
			title: 'Proposal 3',
			des: 'Review for NFTopia Membership',
			img: '/assets/collectionLogo.png'
		},
	],
	inprogressProposal: [
		{
			title: 'Proposal 1',
			des: 'Proposal 1 Desc',
			img: '/assets//homepagecollection1.png'
		},
		{
			title: 'Proposal 2',
			des: 'Proposal 2 Desc',
			img: '/assets//homepagecollection2.png'
		},
		{
			title: 'Proposal 3',
			des: 'Proposal 1 Desc',
			img: '/assets//homepagecollection3.png'
		},
		{
			title: 'Proposal 4',
			des: 'Proposal 1 Desc',
			img: '/assets//homepagecollection1.png'
		},
		{
			title: 'Proposal 5',
			des: 'Proposal 2 Desc',
			img: '/assets//homepagecollection2.png'
		},
		{
			title: 'Proposal 6',
			des: 'Proposal 1 Desc',
			img: '/assets//homepagecollection3.png'
		},
		{
			title: 'Proposal 7',
			des: 'Proposal 1 Desc',
			img: '/assets//homepagecollection1.png'
		},
		{
			title: 'Proposal 8',
			des: 'Proposal 2 Desc',
			img: '/assets//homepagecollection2.png'
		},
		{
			title: 'Proposal 9',
			des: 'Proposal 1 Desc',
			img: '/assets//homepagecollection3.png'
		},
	],
	endedProposal: [
		{
			title: 'Proposal 1',
			des: 'Proposal 1 Desc',
			img: '/assets//homepagecollection1.png'
		},
		{
			title: 'Proposal 2',
			des: 'Proposal 2 Desc',
			img: '/assets//homepagecollection2.png'
		},
		{
			title: 'Proposal 3',
			des: 'Proposal 1 Desc',
			img: '/assets//homepagecollection3.png'
		},
		{
			title: 'Proposal 4',
			des: 'Proposal 1 Desc',
			img: '/assets//homepagecollection1.png'
		},
		{
			title: 'Proposal 5',
			des: 'Proposal 2 Desc',
			img: '/assets//homepagecollection2.png'
		},
		{
			title: 'Proposal 6',
			des: 'Proposal 1 Desc',
			img: '/assets//homepagecollection3.png'
		},
		{
			title: 'Proposal 7',
			des: 'Proposal 1 Desc',
			img: '/assets//homepagecollection1.png'
		},
		{
			title: 'Proposal 8',
			des: 'Proposal 2 Desc',
			img: '/assets//homepagecollection2.png'
		},
		{
			title: 'Proposal 9',
			des: 'Proposal 1 Desc',
			img: '/assets//homepagecollection3.png'
		},
	]
}

export default Proposal
