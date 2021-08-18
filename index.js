const express = require('express')
const { config, engine } = require('express-edge')
const session = require('express-session')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const connectFlash = require('connect-flash')
const MongoStore = require('connect-mongo')
const storePost = require('./middleware/storePost')
const auth = require('./middleware/auth')
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')

const app = new express()
mongoose.connect('mongodb://localhost/node-js-blog', { useNewUrlParser: true, useUnifiedTopology: true })

app.use(connectFlash())
app.use(fileUpload())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(engine)
app.use(express.static('public'))
app.use(session(
    { 
        secret: 'secret',
        store: MongoStore.create({ 
            client: mongoose.connection.getClient(),
            collectionName: 'sessions'
        })
    }))

app.use('*', (req, res, next) => {
    app.locals.auth = req.session.userId 
    next()
})

const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const storeUserController = require('./controllers/storeUser')
const getPostController = require('./controllers/getPost')
const createUserController = require('./controllers/createUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

app.set('views', `${__dirname}/views`)

app.get('/', homePageController)
app.get('/post/:id', getPostController)
app.get('/posts/new', auth, createPostController)
app.post('/posts/store', auth, storePost, storePostController)
app.get('/auth/login', redirectIfAuthenticated, loginController)
app.get('/auth/logout', auth, logoutController)
app.post('/users/login', redirectIfAuthenticated, loginUserController)
app.get('/auth/register', redirectIfAuthenticated, createUserController)
app.post('/users/register', redirectIfAuthenticated, storeUserController)
app.use((req, res) => res.render('notFound'))

app.listen(2000, () => {
    console.log('App listening on port 2000')
})