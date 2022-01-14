// import { useLocation } from 'react-router'
import { Menu } from 'antd'
import Link from '../components/Link'
import { useContext } from 'react'
import StoreContext from '../utils/store'

function MenuItems() {
	const { inputValuePair } = useContext(StoreContext)
	// TODO: useLocation()
	const pathname ='/'

	return (
		<Menu
			theme="light"
			mode="horizontal"
			style={{
				display: 'flex',
				fontSize: '17px',
				fontWeight: '500',
				width: '100%',
				justifyContent: 'center',
			}}
			defaultSelectedKeys={[pathname]}
		>
			<Menu.Item key="/nftMarketplace" onClick={()=> inputValuePair[1]('explore')}>
				<Link href="/"
					className="mr-6 py-4">
            		Explore
				</Link>
			</Menu.Item>
			<Menu.Item key="/create">
				<Link href="/create-item" className="mr-6">
            		Create Your NFT
				</Link>
			</Menu.Item>
			<Menu.Item key="/nftBalance">
				<Link href="/nft-balance" className="mr-6">
            		Your Collection
				</Link>
			</Menu.Item>
			<Menu.Item key="/proposal">
				<Link href="/proposal" className="mr-6">
					Proposal
				</Link>
			</Menu.Item>
		</Menu>
	)
}

export default MenuItems
