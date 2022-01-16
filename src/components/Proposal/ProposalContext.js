import { createContext, useState, useEffect} from 'react'
import { useMoralis } from 'react-moralis'


const ProposalContext = createContext(null)


export const ProposalProvider = ({children}) => {

	const [proposals, setProposals] = useState([])
	const { Moralis, isInitialized } = useMoralis()

	const values = {
		proposals
	}

	const fetchProposals = async () => {
    if(isInitialized)
    {
      const query = new Moralis.Query("Proposals")
      const results = await query.find()
      let data = []
      for (let i = 0; i < results.length; i++) {
        const object = results[i];
        data.push({proposal_id: object.get("proposal_id"), description: object.get("proposal_description"),
           collection: object.get("proposal_collection"), state: object.get("proposal_state"), rating: object.get("proposal_rating"),
           collection_name: object.get("collection_name"), collection_img: object.get("collection_image")})
      }
      return data
    }
  }

	useEffect(() => {
    fetchProposals().then(response => {
      console.log("yuguan in response")
      console.log(response)
      setProposals(response)
    })
	}, [isInitialized])

	return <ProposalContext.Provider value={values}>
		{children}
	</ProposalContext.Provider>
}

export default ProposalContext
