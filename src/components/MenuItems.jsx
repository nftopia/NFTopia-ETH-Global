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
				fontSize: '16px',
				fontWeight: 'bold',
				width: '100%',
				marginLeft: '26.5px',
				borderBottom: 'none'
			}}
			defaultSelectedKeys={[pathname]}
		>
			<Menu.Item key="/nftMarketplace" onClick={()=> inputValuePair[1]('explore')}>
				<Link style={{color: 'black'}} href="/"
					className="mr-6 py-4">
            		Explore
				</Link>
			</Menu.Item>
			<Menu.Item key="/create">
				<Link style={{color: 'black'}} href="/create-item" className="mr-6">
            		Create
				</Link>
			</Menu.Item>
			<Menu.Item key="/nftBalance">
				<Link style={{color: 'black'}} href="/nft-balance" className="mr-6">
            		My Page
				</Link>
			</Menu.Item>
		</Menu>
	)
}

export default MenuItems
