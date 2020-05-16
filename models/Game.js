const mongoose = require('mongoose');
const gameSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      position: {
        type: Number,
        trim: true,
      },
      trim: true,
      price: { type: Number },
    },
  ],
  totalPrice: {
    type: Number,
  },
  pricetojoin: {
    type: Number,
    required: true,
  },
  ongoing: {
    type: Boolean,
    default: false,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Game', gameSchema);
//
