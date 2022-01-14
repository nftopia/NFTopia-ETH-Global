import { useContext } from 'react'
import StoreContext from '../utils/store'
import { Select } from 'antd'
import { useMoralisDapp } from '../providers/MoralisDappProvider/MoralisDappProvider'
import { getCollectionsByChain } from '../helpers/collections'


function SearchCollections(){
	const { inputValuePair } = useContext(StoreContext)
	const { Option } = Select
	const { chainId } = useMoralisDapp()
	const NFTCollections = getCollectionsByChain(chainId)
    
    

	function onChange(value) {
		inputValuePair[1](value)
	}

	return (
		<>
			<Select
				showSearch
				style={{width: '1000px',
					marginLeft: '20px' }}
				placeholder="Find a Collection"
				optionFilterProp="children"
				onChange={onChange}
			>   
				{NFTCollections && 
            NFTCollections.map((collection, i) => 
            	<Option value={collection.addrs} key= {i}>{collection.name}</Option>
            )
				}   
			</Select>
            
		</>
	)
}
export default SearchCollections