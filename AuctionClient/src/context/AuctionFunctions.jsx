import { useEffect, useState, createContext } from 'react'
import { authApp } from '../firebase'
import axios from 'axios'

export const LoginContext = createContext()

export const UserAuth = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [price, setPrice] = useState('')


	const login = (email, password) => {
		return authApp.signInWithEmailAndPassword(email, password)
	}

	const logout = () => {
		return authApp.signOut()
	}

	const register = (name, email, password, memberId) => {
		return authApp.createUserWithEmailAndPassword(email, password)
	}

	const makeBid = (ticketId, price) => {
		if (!currentUser) {
			return console.log('User needs to be logged into account to make a bid')
		}

		let newPrice = Math.floor((price / 100) * 110)
		axios.post('http://localhost:3500/tickets', newPrice)// I am here
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
		
	}

	const endAuction = (ticketId) => {
		axios.delete(`http://localhost:3500/tickets/${ticketId}`)
	}

	useEffect(() => {
		const subscribe = authApp.onAuthStateChanged((user) => {
			setCurrentUser(user)
		})
		return subscribe
	},[])

	return <LoginContext.Provider value={{currentUser, login, logout, register, makeBid, endAuction}}>
		{children}
	</LoginContext.Provider>
}

