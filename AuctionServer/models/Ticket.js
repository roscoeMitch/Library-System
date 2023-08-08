const mongoose = require('mongoose')
//const AutoIncrement = require('mongoose-sequence')(mongoose)
//const types = mongoose.Types

const ticketSchema = new mongoose.Schema({

	user: { 
		type: mongoose.Schema.Types.ObjectId,
		require: false,
		ref: 'User'		
	}, 
	fixture: {
		type: String,
		required: true
	},
	currentPrice: {
		type: Number,
		required: false
	},
	duration: {
		type: Number,
		required: false
	},
	tier: {
		type: String,
		required: true
	},
	section: {
		type: String,
		required: true
	},
	seat: {
		type: String,
		required: true
	},
	currentWinner: {
		type: String,
		require: false,
	} 

})
/* ticketSchema.plugin(AutoIncrement, {
	inc_field: 'ticket',
	id: 'ticketNums',
	start_seq: 1000
}) */

module.exports = mongoose.model('Ticket', ticketSchema)