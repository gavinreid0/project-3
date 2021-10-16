const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const listSchema = new Schema({
  listText: {
    type: String,
    required: 'You need to leave a list!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  listAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  }
})

const List = model('List', listSchema);

module.exports = List;
