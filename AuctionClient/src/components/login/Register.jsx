import React, { useState, useContext, useRef} from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { LoginContext } from '../../context/AuctionFunctions'

export const Register = () => {
	const [displayForm, setDisplayForm] = useState(false)

	const emailRef = useRef()
	const pwdRef = useRef()
	const nameRef = useRef()
	const memberRef = useRef()

	const { register } = useContext(LoginContext)
	
	const openForm = () => setDisplayForm(true)
	const closeForm = () => setDisplayForm(false)

	const submitForm = async (e) => {
		e.preventDefault()

		try {
			await register(
				nameRef.current.value, 
				emailRef.current.value, 
				pwdRef.current.value, 
				memberRef.current.value
				)
			closeForm()
			console.log('form check')
		} catch (error){
			console.error(error.message)
		}
	}

	
  return (
	<>
		<div className='btn btn-outline-secondary mx-2' onClick={openForm}>
			Register
		</div>
		<Modal centered show={displayForm} onHide={closeForm}>
			<form onSubmit={submitForm}>
				<Modal.Header>
					<Modal.Title>Register</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control type="name" required ref={nameRef}/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Email Address</Form.Label>
						<Form.Control type="email" required ref={emailRef}/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Already a club member? Enter your member ID</Form.Label>
						<Form.Control type="text" ref={memberRef}/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" required ref={pwdRef}/>
					</Form.Group>
					
				</Modal.Body>
				<Modal.Footer>
					<Button type="submit" variant="primary">
						Register
					</Button>
					<Button onClick={closeForm} variant="secondary">
						Cancel
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	</>
  )
}
