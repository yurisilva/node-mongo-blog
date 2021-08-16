const User = require('../database/models/User')
const bcrypts = require('bcrypt')

module.exports = (req, res) => {
    const { email, password } = req.body
    User.findOne({ email }, (error, user)=>{
        if(error) {
            return console.log("Error logging in")
        }

        if(user){
            bcrypts.compare(password, user.password, (error, samePassword) => {
                if(samePassword) {
                    req.session.userId = user._id
                    res.redirect('/')
                } else{
                    res.redirect('/auth/login')
                }
            })
        } else {
            return res.redirect('/auth/login')
        }
    })
}