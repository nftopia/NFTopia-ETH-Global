import { createContext, useState, useEffect} from 'react'
import { useMoralis } from 'react-moralis'


const StoreContext = createContext(null)


export const StoreProvider = ({children}) => {
	const [inputValue, setInputValue] = useState('explore')
	const [selectedProposal, setSelectedProposal] = useState('explore')
	// const [proposals, setProposals] = useState([])
	// const { Moralis } = useMoralis()

	const store = {
		inputValuePair: [inputValue, setInputValue],
		selectedProposal: [selectedProposal, setSelectedProposal]
		// proposals
	}

	// const fetchProposals = async () => {
  //   const query = new Moralis.Query("Proposals")
  //   const results = await query.find()
	//
  //   return results
  // }
	//
	// useEffect(() => {
  //   fetchProposals().then(response => {
  //     console.log("yuguan in response")
  //     console.log(response)
  //     setProposals(response)
  //   })
	// }, [])

	return <StoreContext.Provider value={store}>
		{children}
	</StoreContext.Provider>
}

export default StoreContext
