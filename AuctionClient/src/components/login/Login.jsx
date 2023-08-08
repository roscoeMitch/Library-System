import React, { useContext, useRef, useState} from 'react'
import {Button, Form, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from 'react-bootstrap'
import { LoginContext } from '../../context/AuctionFunctions'

export const Login = () => {
	const [displayForm, setDisplayForm] = useState(false)
	
	const emailRef = useRef()
	const pwdRef = useRef()

	const { login } = useContext(LoginContext)

	const openForm = () => setDisplayForm(true)
	const closeForm = () => setDisplayForm(false)

	const submitForm = async (e) => {
		e.preventDefault()
		console.log('You clicked submit.')

		try {
			await login(emailRef.current.value, pwdRef.current.value)
			closeForm()
		} catch (error) {
			console.error(error)
		}
	}

  return(
	<>
	<div onClick={openForm} className='btn btn-outline-secondary mx-2'>
		Login
	</div>
	<Modal centered show={displayForm} onHide={closeForm}>
		<form onSubmit={submitForm}>
		<ModalHeader>
			<ModalTitle className='centered'>GW Tickets Login</ModalTitle>
		</ModalHeader>
		<ModalBody>
		<Form.Group>
			<Form.Label>Email Address</Form.Label>
			<Form.Control type="email" required ref={emailRef} />
		</Form.Group>
		<Form.Group>
			<Form.Label>Password</Form.Label>
			<Form.Control type="password" required ref={pwdRef} />
		</Form.Group>
		</ModalBody>
		<ModalFooter>
			<Button onClick={closeForm} variant="secondary">
				Cancel
			</Button>
			<Button type="submit" variant="primary">
				Login
			</Button>
		</ModalFooter>
		</form>
	</Modal>
	</>
  )
}
