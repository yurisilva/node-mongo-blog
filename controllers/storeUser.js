const User = require('../database/models/User')

module.exports = async (req, res) => {
    User.create(req.body, (error, post) => {
        if(error) {
            return res.redirect('/auth/register')
        }
        res.redirect('/')
    })
}