import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'

export const useProposals = (options) => {
  const { Moralis } = useMoralis()

	const [proposals, setProposals] = useState([])


  const fetchProposals = async () => {
    const query = new Moralis.Query("Proposals")
    const results = await query.find()

    return {results}
  }

	console.log(proposals)

  useEffect(() => {
    fetchProposals().then(response => {
      console.log(response)
      setProposals(response.results)
    })
	}, [])

	return { proposals }
}
