import React, { useState, useContext, useRef } from 'react'
import { LoginContext } from '../../context/AuctionFunctions'
import { Button, Form, Modal, Row, Col } from 'react-bootstrap'
import axios from 'axios'


export const CreateAuction = ({ setAuction }) => {
	const [displayForm, setDisplayForm] = useState(false)
	//const [fixture, setFixture] = useState['']

	const fixtureRef = useRef()
	const startingPriceRef = useRef()
	const durationRef = useRef()
	const tierRef = useRef()
	const sectionRef = useRef()
	const seatRef = useRef()

	const openForm = () => setDisplayForm(true)
	const closeForm = () => setDisplayForm(false)

	const { currentUser } = useContext(LoginContext)

	const handleSubmit = async (event) => {
		event.preventDefault()

		let currentDate = new Date()
		let endDate = currentDate.setHours(currentDate.getHours() + durationRef.current.value)

		let newAuction = {
			user: currentUser.name,
			fixture: fixtureRef.current.value,
			currentPrice: startingPriceRef.current.value,
			duration: endDate,
			tier: tierRef.current.value,
			section: sectionRef.current.value,
			seat: seatRef.current.value,
			currentWinner: currentUser.name
			
		}

		axios.post('http://localhost:3500/tickets', newAuction)
			.then((response) => {
				console.log(response.data)
			})
			.catch(function (error) {
				if (error.response) {
				  console.log('Server responded with status code:', error.response.status);
				  console.log('Response data:', error.response.data);
				} else if (error.request) {
				  console.log('No response received:', error.request);
				} else {
				  console.log('Error creating request:', error.message);
				}
			})

		setAuction(newAuction)
		closeForm()
	}
	
  return (
	<>
		<div className="col d-flex justify-content-center my-3">
			<div onClick={openForm} className="btn btn-outline-secondary mx-3">
				Auction Your Ticket
			</div>
		</div>
		<Modal centered show={displayForm} onHide={closeForm}>
			<form onSubmit={handleSubmit}>
				<Modal.Header>
					<Modal.Title>Sell your ticket</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Col>
						<Form.Group>
							<Form.Label>Ticket Owner</Form.Label>
							<Form.Control disabled type="text" value={currentUser.email} readOnly />
						</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col className='my-3'>
						<Form.Select aria-label="fixture-selector">
							<option>Select a Fixture</option>
							<option value="Denniston FC" ref={fixtureRef}>Denniston FC - 25th August</option>
							<option value="Hillhead United" ref={fixtureRef}>HillHead United - 7th September</option>
							<option value="Spartans" ref={fixtureRef}>Spartans - 14th September</option>
						</Form.Select>
						</Col>
					</Row>
					<Row>
						<Col>
						<Form.Group>
							<Form.Label>Your Price</Form.Label>
							<Form.Control type="number" required ref={startingPriceRef} />
						</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
						<Form.Group>
							<Form.Label>Tier</Form.Label>
								<Form.Control type="text" required ref={tierRef} />							
						</Form.Group>
						</Col>
						<Col>
						<Form.Group>
							<Form.Label>Section</Form.Label>
								<Form.Control type="text" required ref={sectionRef} />							
						</Form.Group>
						</Col>
						<Col>
						<Form.Group>
							<Form.Label>Seat</Form.Label>
								<Form.Control type="text" required ref={seatRef} />							
						</Form.Group>
						</Col>				
					</Row>
					<Row>
						<Col className='my-3'>
						<Form.Group>
							<Form.Label>Set Auction Time (Hours)</Form.Label>
							<Form.Control type="number" required ref={durationRef} />
						</Form.Group>
						</Col>
					</Row>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" type="submit">
						Submit
					</Button>
					<Button variant="secondary" onClick={closeForm}>
						Cancel
					</Button>					
          		</Modal.Footer>
			</form>
		</Modal>
	</>
  )
}
