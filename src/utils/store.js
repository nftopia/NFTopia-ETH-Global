import { createContext, useState} from 'react'
const StoreContext = createContext(null)

export const StoreProvider = ({children}) => {
	const [inputValue, setInputValue] = useState('explore')
	const [selectedProposal, setSelectedProposal] = useState('explore')

	const store = {
		inputValuePair: [inputValue, setInputValue],
		selectedProposal: [selectedProposal, setSelectedProposal] 
	}
	return <StoreContext.Provider value={store}>
		{children}
	</StoreContext.Provider>
}

export default StoreContext