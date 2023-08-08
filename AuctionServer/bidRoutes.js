const express = require('express')
const router = express.Router()
const bidController = require('../controllers/bidController')

router.route('/')
	.get(bidController.addBid)
	.post(bidController.getAllBids)
	

module.exports = router