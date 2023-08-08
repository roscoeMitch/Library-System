import React, { useState, useContext } from 'react'
import { LoginContext } from '../../context/AuctionFunctions'
import { CreateAuction } from './CreateAuction'
import { AuctionCard } from './AuctionCard'
import { Welcome } from '../Welcome'


export const AuctionBody = () => {
	const [auction, setAuction] = useState(null)
	const { currentUser } = useContext(LoginContext)



  return (
	<div className="py-5">
      <div className="container">
            {!currentUser && <Welcome />}
            {currentUser && <CreateAuction setAuction={setAuction} />}
           
          </div>
          <div className='ticket__table'>{currentUser && <AuctionCard />} </div>
           
      </div>
    
  )
}
