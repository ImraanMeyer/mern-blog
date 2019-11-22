/*
** User Model
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true
    },
    createdAt: Date,
    updatedAt: Date
})

module.exports = mongoose.model('User', userSchema)