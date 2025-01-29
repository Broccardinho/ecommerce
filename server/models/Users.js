const mongoose = require('mongoose')

const User = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
}, {
    collection: 'users',
})

module.exports = mongoose.model('users', User)