/*
 ** Admin Model
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {
    type: String,
    required: true
  },
  createdAt: Date
})

module.exports = mongoose.model('Admin', adminSchema)
