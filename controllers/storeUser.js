const User = require('../database/models/User')

module.exports = async (req, res) => {
    User.create(req.body, (error, post) => {
        if(error) {
            const errors = Object.keys(error.errors).map(key => error.errors[key].message)

            req.session.registrationErrors = errors
            return res.redirect('/auth/register')
        }
        res.redirect('/')
    })
}