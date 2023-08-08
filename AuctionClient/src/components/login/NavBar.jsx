import React, { useContext } from 'react'
import logo from '../../img/TicketLogo.png'
import { Login }  from './Login'
import { Register }  from './Register'
import { LoginContext }  from '../../context/AuctionFunctions'

export const NavBar = () => {
	const { currentUser, logout } = useContext(LoginContext);
  
	return (
	  <nav className="container navbar sticky-top navbar-light bg-light">
		<div className="container-fluid" style={{backgroundColor:'#50A1A7'}}>
		  <div className="navbar-brand">
			<img src={logo} alt="logo" height="80" />
		  </div>
		  <div className="d-flex">
			<div className="col">
			  {currentUser ? (
				<>
				  <div className="btn btn-outline-secondary mx-2 disabled">
					{currentUser.email}
				  </div>
				  <div
					onClick={() => logout()}
					className="btn btn-outline-secondary mx-2"
				  >
					Logout
				  </div>
				</>
			  ) : (
				<>
				  <Login />
				  <Register />
				</>
			  )}
			</div>
		  </div>
		</div>
	  </nav>
	);
  };