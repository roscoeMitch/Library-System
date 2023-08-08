const mongoose = require('mongoose');
const types = mongoose.Types;

const auctionSchema = new mongoose.Schema(
  {
    startingPrice: {
      type: types.Decimal128,
      required: true,
    },
    currentPrice: {
      type: types.Decimal128,
      required: true,
    },
    duration: {
      type: Number,
      default: 300,
    },
    timer: {
      type: Number,
      default: 300,
    },
    auctionCommenced: {
      type: Boolean,
      default: false,
    },
    auctionEnded: {
      type: Boolean,
      default: false,
    },
    user: {
      type: types.ObjectId,
      ref: 'user',
    },
    ticketId: {
      type: types.ObjectId,
      ref: 'ticket',
    },
    highestBidder: {
      type: types.ObjectId,
      ref: 'user',
    },
	sold: {
		type: Boolean,
		default: false,
	},
    bids: [
      {
        user: {
          type: types.ObjectId,
          ref: 'user',
          required: true,
        },
        amount: {
          type: types.Decimal128,
          required: true,
        },
        time: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('auctions', auctionSchema);