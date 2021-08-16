const User = require('../database/models/User')

module.exports = async (req, res) => {
    User.create(req.body, (error, post) => {
        res.redirect('/')
    })
}