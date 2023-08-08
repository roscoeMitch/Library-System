import React, { useContext, useEffect, useState } from 'react'
import Countdown from 'react-countdown'
import { LoginContext } from '../../context/AuctionFunctions'
import axios from 'axios'
import { useTable, useSortBy } from "react-table"
import '../css/table.css'
import { Button } from 'react-bootstrap'



const renderer = ({ days, hours, minutes, seconds, completed, props}) => {
	if (completed) {
		return null
	}
}

export const AuctionCard = ({ item, bidIncrease }) => {
	const [auctionData, setAuctionData] = useState([])
	const [displayBidForm, setDisplayBidForm ]  = useState(false)

	const { currentUser } = useContext(LoginContext);

	const openForm = () => setDisplayBidForm(true)
	const closeForm = () => setDisplayBidForm(false)

	useEffect(() => {
		async function getTickets() {
		axios.get('http://localhost:3500/tickets')
			.then((response) => { setAuctionData(response.data) })
			.catch(function (error) {
				if (error.response.data) {
				  console.log('Server responded with status code:', error.response.status);
				  console.log('Response data:', error.response.data);
				} else if (error.request) {
				  console.log('No response received:', error.request);
				} else {
				  console.log('Error creating request:', error.message);
				}
			})
		}
		getTickets()
		return
	},[auctionData.length])


	
	/* let auctionEnd = setAuctionData.duration
	const { currentUser, makeBid, endAuction} = useContext(LoginContext)
 */
	return <div>
		<table className='table hover mt-5'>
			<thead style={{color: "rgb(79,89,102"}}>
				<tr>
					<th scope='col'>Fixture</th>
					<th scope='col'>Tier</th>
					<th scope='col'>Section</th>
					<th scope='col'>Seat</th>
					<th scope='col'>Time Remaining</th>
					<th scope='col'>Ticket Owner</th>
					<th scope='col'>Current Price</th>					
				</tr>
			</thead>
			<tbody>
				{auctionData.map((auctionData) => {
					return (
						<tr style={{cursor: "pointer"}} className='table-row' key={auctionData._id}>
							<th scope="row">{auctionData.fixture}</th>
							<td>{auctionData.tier}</td>
							<td>{auctionData.section}</td>
							<td>{auctionData.seat}</td>
							<td>{auctionData.duration}</td>
							<td>{currentUser.email}</td>
							<td>£{auctionData.currentPrice}</td>

							<div className="btn btn-outline-secondary" onClick={increaseBid}>Bid</div>

							<div className="btn btn-outline-secondary">Cancel Auction</div>
							
						</tr>
					)
				})}
			</tbody>
		</table>
	</div>
	
}