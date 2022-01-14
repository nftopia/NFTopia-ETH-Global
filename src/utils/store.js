import { createContext, useState} from 'react'
const StoreContext = createContext(null)

export const StoreProvider = ({children}) => {
	const [inputValue, setInputValue] = useState('explore')

	const store = {
		inputValuePair: [inputValue, setInputValue]
	}
	return <StoreContext.Provider value={store}>
		{children}
	</StoreContext.Provider>
}

export default StoreContext