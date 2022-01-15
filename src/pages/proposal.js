import { useState } from 'react'
import ProposalCard from '../components/ProposalCard/ProposalCard'
import {Row, Col, Tabs } from 'antd'
import ProposalDetail from '../components/ProposalDetail/ProposalDetail'

const { TabPane }  = Tabs
const styles = {
	wrapper: {
		width: '80%',
		margin: '0 auto'
	},
	title: {
		fontSize: '32px',
		fontWeight: 'bold'
	},
	row: {
		marginTop: '32px'
	}
}

const onTabChange = (key) => {
	console.log(key)
}

const proposalData = {
	upcomingProposal: [
		{
			title: 'Proposal 1',
			des: 'Proposal 1 Desc'
		},
		{
			title: 'Proposal 2',
			des: 'Proposal 2 Desc'
		},
		{
			title: 'Proposal 3',
			des: 'Proposal 1 Desc'
		},
		{
			title: 'Proposal 4',
			des: 'Proposal 2 Desc'
		},
	],
	inprogressProposal: [
		{
			title: 'In progress Proposal 1',
			des: 'Proposal 1 Desc'
		},
		{
			title: 'In Progress Proposal 2',
			des: 'Proposal 2 Desc'
		},
		{
			title: 'In progress Proposal 3',
			des: 'Proposal 1 Desc'
		},
		{
			title: 'In Progress Proposal 4',
			des: 'Proposal 2 Desc'
		},
	],
	endedProposal: [
		{
			title: 'Ended progress Proposal 1',
			des: 'Proposal 1 Desc'
		},
		{
			title: 'Ended Progress Proposal 2',
			des: 'Proposal 2 Desc'
		},
	]
}
const Proposal = () => {
	const [selectedProposal, setSelectedProposal] = useState('explore')
	const { upcomingProposal, inprogressProposal, endedProposal } = proposalData
	return (
		<>
			<div>
				{selectedProposal === 'explore' && 
                    <div style={styles.wrapper}>
                    	<Tabs defaultActiveKey='1' centered onChange={onTabChange}>
                    		<TabPane tab="Upcoming" key="1">
                    			<Row gutter={[32, 24]} justify='center'>
                    				{upcomingProposal.map((proposal)=> (
                    					<Col span={12} key={proposal.title} >
                    						<ProposalCard title={proposal.title} desc={proposal.desc} openProposal={setSelectedProposal}/>
                    					</Col>
                    				))}
                    			</Row>
                    		</TabPane>
                    		<TabPane tab="In Progress" key="2">
                    			<Row gutter={[32, 24]} justify='center'>
                    				{inprogressProposal.map((proposal)=> (
                    					<Col span={12} key={proposal.title} >
                    						<ProposalCard title={proposal.title} desc={proposal.desc} openProposal={setSelectedProposal} />
                    					</Col>
                    				))}
                    			</Row>
                    		</TabPane>
                    		<TabPane tab="Ended" key="3">
                    			<Row gutter={[32, 24]} justify='center'>
                    				{endedProposal.map((proposal)=> (
                    					<Col span={12} key={proposal.title} >
                    						{/* TODO: Title may not be unique */}
                    						<ProposalCard title={proposal.title} desc={proposal.desc} openProposal={setSelectedProposal} />
                    					</Col>
                    				))}
                    			</Row>
                    		</TabPane>
                    	</Tabs>
                    </div>}
				{selectedProposal !== 'explore' && 
                <>
                	<Row>
				    <img width="100%" src="/proposalHeader.jpg"></img>                
			        </Row>
                	<div style={styles.wrapper}>
                		<ProposalDetail />

                	</div>
                </>
				}
			</div>
		</>
	)
}

export default Proposal