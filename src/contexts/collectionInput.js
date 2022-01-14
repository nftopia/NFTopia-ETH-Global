import { createContext, useState } from 'react'
const CollectionInputContext = createContext('explore', null)
export const CollectionInputProvider = ( { children }) => {
	const [inputValue, setInputValue] = useState('explore')
	return (
		<CollectionInputContext.Provider value={{inputValue, setInputValue}}>
			{children}
		</CollectionInputContext.Provider>
	)
}

export default CollectionInputContext