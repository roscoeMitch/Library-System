process.env.NODE_ENV = 'test'

const User = require('../models/User')
const Ticket = require('../models/Ticket')

/* 
before((done) => {
	User.deleteMany({}, function(err) {})
	Ticket.deleteMany({}, function(err) {})
	done()
})

after((done) => {
	User.deleteMany({}, function(err) {})
	Ticket.deleteMany({}, function(err) {})
	done()
}) */
