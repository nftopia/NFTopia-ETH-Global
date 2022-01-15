import '../styles/globals.css'
import { Layout, Button } from 'antd'
import Link from '../components/Link'
import Chains from '../components/Chains/Chains'
import Account from '../components/Account/Account'
import NativeBalance from '../components/NativeBalance'
import SearchCollections from '../components/SearchCollections'
import { StoreProvider } from '../utils/store'
import MenuItems from '../components/MenuItems'
import '../styles/antd.less'


//TODO: Remove code below once Moralis is deprecated
import { MoralisProvider } from 'react-moralis'
import { MoralisDappProvider } from '../providers/MoralisDappProvider/MoralisDappProvider'

const { Header } = Layout
const styles = {
	layout: { 
		height: '100vh', 
		overflow: 'auto',
		background: 'white',
	},
	content: {
		justifyContent: 'center',
		fontFamily: 'SF Pro',
		color: '#041836',
		marginTop: '50px',
	},
	header: {
		position: 'fixed',
		zIndex: 1,
		width: '100%',
		background: '#fff',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		fontFamily: 'SF Pro',
		borderBottom: 'none',
		padding: '0 10px',
	},
	headerRight: {
		display: 'flex',
		gap: '20px',
		alignItems: 'center',
		fontSize: '15px',
		fontWeight: '600',
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
	claimButton: {
		backgroundColor: '#DBFF4B',
		borderRadius: '10px',
		color: 'black',
		width: '149px',
		height: '40px',
		border: 'none',
		fontWeight: 590,
		fontSize: '16px'
	}
}

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL

function MyApp({ Component, pageProps }) {
	//TODO:
	const isServerInfo = APP_ID && SERVER_URL ? true : false
	//Validate
	if (isServerInfo)
		return (
			<Layout style={styles.layout}>
				<MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
					<MoralisDappProvider>
						<StoreProvider>
							<Header style={styles.header}>
								<Logo />
								<SearchCollections />
								<MenuItems />
								<div style={styles.headerRight}>
									<Button style={styles.reviewButton}>
										<Link href="/proposal">
										Review to Earn
										</Link>
									</Button>
									<Button style={styles.claimButton}>
										<Link href="/proposal">
										Claim Rewards
										</Link>
									</Button>
									{/* <Chains /> */}
									{/* <NativeBalance /> */}
									<Account />
								</div>
							</Header>
							<div style={styles.content}>
								<Component {...pageProps} />
							</div>
						</StoreProvider>
					</MoralisDappProvider>
				</MoralisProvider>
			</Layout>

		)
}

export const Logo = () => (
	<div style={{ display: 'flex', marginLeft: '20px' }}>
	  <img width="60" height="auto" src="/logo.png" alt=""></img> 
	</div>
)
  
export default MyApp
