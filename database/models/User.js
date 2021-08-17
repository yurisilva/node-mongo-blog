const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide your username'] 
    },
    email: {
        type: String, 
        required: [true, 'Please provide your email'] ,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide your password'] 
    }
})

UserSchema.pre('save', function(next) {
    const user = this

    bcrypt.hash(user.password, 10, function(error, encryptedPassword) {
        user.password = encryptedPassword 
        next()
    })
})

module.exports = mongoose.model('User', UserSchema)