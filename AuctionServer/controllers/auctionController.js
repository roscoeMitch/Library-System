const User = require('../models/User.js')
const Ticket = require('../models/Ticket.js')
const Auction = require('../models/Auction.js')
const asyncHandler = require('express-async-handler')

// @desc Get all auctions
// @route GET /auctions
// @access Private
const getAllAuctions = asyncHandler(async (req, res) => {
	// get all auctions from database
	const auctions = await Auction.find().lean()

	// if no auctions found
	if (!auctions?.length) {
		return res.status(400).json({message: 'No auctions found'})
	}

	// Add fixture to each auction
	const auctionsWithTicket = await Promise.all(auctions.map(async (auction) => {
		const ticket = await Ticket.findById(auction.ticketId).lean().exec()
		return {...auction, fixture: ticket.fixture}
	})) 

	// Add user's name to each auction before sending response
	const auctionsWithUser = await Promise.all(auctions.map(async (auction) => {
		const user = await User.findById(auction.user).lean().exec()
		return {...auction, user: user.user}
	}))
	res.json(auctionsWithTicket, auctionsWithUser)
})

// @desc Create new auction
// @route POST /auctions
// @access Private
const createAuction = asyncHandler(async (req,res) => {
	const { ticketId, userId, duration, startingPrice } = req.body

	if (duration == null || duration === 0) {
		duration = 500
	}
	if (duration > 8000) {
		duration = 4000
	}

	const timer = duration

	// Check all data fields have been completed
	if (!ticketId || !userId || !duration || !startingPrice) {
		return res.status(400).json({ message: 'All fields required '})
	}

	// Check for duplcation
	const duplicate = await Auction.findOne({ticketId}).lean().exec()

	if (duplicate) {
		return res.status(409).json({  message: 'Error this ticket has already been auctioned'})
	}

	// Create and store new ticket
	let auction = new Auction({
		ticketId: req.ticket.id,
		ticketOwner: req.user.id,
		duration,
		startingPrice,
		currentBid: startingPrice,
		timer

	})

	auction.save()


	if (auction) { //created
		return res.status(201).json({ message: 'New auction created '})
	} else {
		return res.status(400).json({ message: 'Invalid auction data entered'})
	}
})

// @desc Update auction
// @route PATCH /auction
// @access Private
const updateAuction = asyncHandler(async (req, res) => {
	const { id, ticketId, userId, duration, startingPrice } = req.body

	// Confirm data
	if (!id || !ticketId || !userId || !duration || !startingPrice) {
		return res.status(400).json( {message: 'All data field required'})
	}

	// Confirm auction exists for update
	const auction = await Auction.findById(id).exec()

	if (!auction) {
		return res.status(400).json({message: 'Ticket not found'})
	}

	const duplicate = await Ticket.findOne({section, seat}).lean().exec()

	if (duplicate) {
		return res.status(409).json({  message: 'Error ticket is already in auction'})
	}

	auction.ticketId = req.ticket.id
	auction.ticketOwner = req.user.id
	auction.duration = duration
	auction.startingPrice = startingPrice
	auction.currentBid = startingPrice,
	auction.timer = timer

	const updatedAuction = await auction.save()

	res.json(`Auction for ticket: '${updatedAuction.ticketId}' updated`)
})

// @desc Delete an auction
// @route DELETE /auction
// @access Private
const deleteAuction = asyncHandler(async (req, res) => {
	const { id } = req.body

	// Confirm data
	if (!id) {
		return res.status(400).json({message: 'Auction ID required'})
	}

	// Confirm auction exists to delete
	const auction = await Auction.findById(id).exec()

	if (!auction) {
		return res.status(400).json({ message: 'Auction not found'})
	}

	const result = await auction.deleteOne()

	const message = `Auction for '${result.fixture}' with ID ${result.id} deleted`

	res.json(message)
})

module.exports = {
	getAllAuctions,
	createAuction,
	updateAuction,
	deleteAuction
}