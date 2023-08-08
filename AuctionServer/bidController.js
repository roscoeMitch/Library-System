const Auction = require('../models/Auction')

// @desc Place bid in an auction
// @route POST /bids/:auctionId
// @access Private

const addBid = asyncHandler(async (req,res,next) => {
	const { auctionId } = req.params
	const { amount } = req.query

	try {
		const auction = await Auction.findById(auctionId).populate('user')

		// check auction exists
		if (!auction) {
			return res.status(404).json({ message: 'Auction not found'})
		}
		// check whether bid is valid
		if (parseFloat(auction.currentBid) >= parseFloat(amount)) {
			return res.status(400).json({ message: `Bid amount needs to be more than ${amount}`})
		}
		if (auction.auctionEnded || auction.sold) {
			return res.status(400).json({ message: 'The auction is over'})
		}
		if (!auction.auctionCommenced) {
			return res.status(400).json({ message: 'The auction has not commenced'})
		}

		// If bid is valid then update user details
		auction.bids.push({ user: req.user.id, amount: amount})
		auction.currentBid = amount
		auction.highestBidder = req.user.id
		const saveAuction = await auction.save()

		res.status(200).json(saveAuction)
	}
	catch (error) {
		console.error(error)
	}
})

// @desc Get a list of bids in an auction
// @route GET /bids/:auctionId
// @access Private

const getAllBids = asyncHandler(async (req, res, next) => {
	const { auctionId } = req.params
	const { option } = req.query
	option = option ? option : 'default'

	try {
		const auction = await Auction.findById(auctionId)
		await auction.populate('bids.user')
		// Check auction exisits
		if (!auction) {
			return res.status(404).json({ message: 'Auction not found'})
		}
		const bidList = auction.bids
		if (option.toString() === 'highest') {
			res.status(200).json([bidList [bidList.length -1]])
		} else {
			res.status(200).json(bidList)
		}

	} catch (error) {
		console.error(error)
	}
}) 

module.exports = {
	addBid,
	getAllBids,
}



