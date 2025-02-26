const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name required'],
        trim: true,
        maxlength: [50, 'First name cannot exceed 50 characters'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name required'],
        trim: true,
        maxlength: [50, 'Last name cannot exceed 50 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format'],
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        minlength: [7, 'Password must be at least 7 characters'],
    },
    accessLevel: {type: Number,
        required: true,
        default: 0,
        min: [0, 'Invalid access level'],
        max: [2, 'Invalid access level'],
    },
})

const User = mongoose.model('User', userSchema)

module.exports = User