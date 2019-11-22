const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String },
  productPic: { type: String },
  keyword: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Post', postSchema)
