const User = require('../models/User')
const Ticket = require('../models/Ticket')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
//const toId = mongoose.Types.ObjectId

// @desc Get all users
// @route Get /users
// @access Private

const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find().select('-password').lean()

	if (!users?.length) {
		return res.status(400).json({ message: 'no users found!'})
	}

	res.json(users)
})


// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
	const {name, password, email, isMember } = req.body

	// Confirm data
	if (!name || !password || !email || isMember == null) {
		res.status(400).json({ message: 'Missing data fields'})
	}

	// check database for duplicate users
	const duplicate = await User.findOne({ email }).lean().exec()

	if (duplicate) {
		return res.status(409).json({ message: 'There is a duplicate user'})
	}

	// this hashes the passwords
	const hashedPwd = await bcrypt.hash(password, 10)

	const userObject = {name, "password": hashedPwd, email, isMember}

	const user = await User.create(userObject)

	if (user) {
		res.status(201).json({ message: `New user create for ${name}`})
	}
	else {
		res.status(400).json({ message: 'Invalid data received'})
	}
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler( async (req, res) => {
	const { id, name, email, isMember, password} = req.body

	// Confirm data
	if (!id || !name || !email || isMember == null) {
		return res.status(400).json({ message: 'all field except password required'})
	}

	//Does the user exist to update
	const user = await User.findById(id).exec()

	if (!user) {
		return res.status(400).json({ message: 'User not found'})
	}

	//Check for duplicates
	const duplicate = await User.findOne({ email }).lean().exec()

	// Allows editing of exisiting users
	if (duplicate && duplicate?._id.toString() !== id) {
		return res.status(409).json( { messagfe: 'User already exists'})
	}

	user.name = name
	user.email = email
	user.isMember = isMember

	// Hashing the password
	if (password) {
		user.password = await bcrypt.hash(password, 10)
	}
	const updatedUser = await user.save()

	res.json({ message: `${updatedUser.name} updated`})
})

// @desc Delete all users
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler( async (req, res) => {
	const { id } = req.body

	// check data
	if (!id) {
		return res.status(400).json({ message: 'User ID required'})
	}

	const user = await User.findById(id).exec()

	if (!user) {
		return res.status(400).json({ message: 'User not found'})
	}

	const result = await user.deleteOne()

	const message = `${result.name} with ID ${result._id} has been deleted.`

	res.json(message)
})

module.exports = {
	getAllUsers,
	createNewUser,
	updateUser,
	deleteUser
}