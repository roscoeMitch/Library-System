const User = require('../models/User.js')
const Ticket = require('../models/Ticket.js')
const asyncHandler = require('express-async-handler')


// @desc Get all tickets 
// @route GET /tickets
// @access Private
const getAllTickets = asyncHandler(async (req, res) => {
	// get all tickets from database
	const tickets = await Ticket.find().lean()

	// if no tickets found
	if (!tickets?.length) {
		return res.status(400).json({message: 'No tickets found'})
	}

	// Add user's name to each ticket before sending response
	/* const ticketsWithUser = await Promise.all(tickets.map(async (ticket) => {
		const user = await User.findById(ticket.user).lean().exec()
		return {...ticket, user: user.name}
	})) */
	res.json(tickets)

	
})

// @desc Create new ticket
// @route POST /tickets
// @access Private
const createNewTicket = asyncHandler(async (req,res) => {
	const { user, fixture, tier, section, seat, currentPrice, duration, currentWinner } = req.body 

	//confirm data
	if (!fixture || !tier || !section || !seat) {
		return res.status(400).json({ message: 'All fields required'})
	}

	// Check for duplcate section & seat
	const duplicate = await Ticket.findOne({seat}).lean().exec()

	if (duplicate) {
		return res.status(409).json({  message: 'Error ticket already exists'})
	}
	
	// Create and store new ticket
	
	const ticket = await Ticket.create({ user , fixture, tier, section, seat, currentPrice, duration, currentWinner}) //currentPrice

	if (ticket) { //created
		return res.status(201).json({ message: 'New ticket created '})
	} else {
		return res.status(400).json({ message: 'Invalid ticket data entered'})
	}
})

// @desc Update a ticket
// @route PATCH /ticket
// @access Private
const updateTicket = asyncHandler(async (req, res) => {
	const { id, user, fixture, tier, section, seat} = req.body

	// Confirm data
	if (!id || !fixture || !tier || !section || !seat) {
		return res.status(400).json( {message: 'All data field required'})
	}

	// Confirm ticket exists for update
	const ticket = await Ticket.findById(id).exec()

	if (!ticket) {
		return res.status(400).json({message: 'Ticket not found'})
	}

	const duplicate = await Ticket.findOne({section, seat}).lean().exec()

	if (duplicate) {
		return res.status(409).json({  message: 'Error cannot ticket already exists'})
	}

	ticket.user = user
	ticket.fixture = fixture
	ticket.tier = tier
	ticket.section = section
	ticket.seat = seat

	const updatedTicket = await ticket.save()

	res.json(`Ticket for the '${updatedTicket.fixture}' fixture has been updated`)
})

// @desc Delete a ticket
// @route DELETE /tickets
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
	const { id } = req.body

	// Confirm data
	if (!id) {
		return res.status(400).json({message: 'Ticket ID required'})
	}

	// Confirm ticket exists to delete
	const ticket = await Ticket.findById(id).exec()

	if (!ticket) {
		return res.status(400).json({ message: 'Ticket not found'})
	}

	const result = await ticket.deleteOne()

	const message = `Ticket for '${result.fixure}' fixture with ID ${result.id} has been deleted`

	res.json(message)
})

module.exports = {
	getAllTickets,
	createNewTicket,
	updateTicket,
	deleteTicket
}