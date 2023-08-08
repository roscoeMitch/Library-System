import React, { useState } from 'react'

export const IncreaseBid = ({bidIncrease, currentPrice}) => {
	const [displayForm, setDisplayForm] = useState(false)

	const openForm = () => setDisplayForm(true)
	const closeForm = () => setDisplayForm(false)

	const submitForm = async (e) => {
		e.preventDefault()
		console.log('You clicked bid')

		try {
			await 
			closeForm()
		} catch (error) {
			console.error(error)
		}
	}

  return (
	<div>IncreaseBid</div>
  )
}
