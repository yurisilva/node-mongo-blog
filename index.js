const express = require('express')
const { config, engine } = require('express-edge')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const validateCreatePostMiddleware = require('./middleware/storePost')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const app = new express()
mongoose.connect('mongodb://localhost/node-js-blog', { useNewUrlParser: true, useUnifiedTopology: true })

app.use(fileUpload())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(engine)
app.use(express.static('public'))
app.use('/posts/store', validateCreatePostMiddleware)
app.use(session(
    { 
        secret: 'secret',
        store: MongoStore.create({ 
            client: mongoose.connection.getClient(),
            collectionName: 'sessions'
        })
    }))

const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const storeUserController = require('./controllers/storeUser')
const getPostController = require('./controllers/getPost')
const createUserController = require('./controllers/createUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')

app.set('views', `${__dirname}/views`)

app.get('/', homePageController)
app.get('/post/:id', getPostController)
app.get('/posts/new', createPostController)
app.get('/auth/register', createUserController)
app.get('/auth/login', loginController)
app.post('/posts/store', storePostController)
app.post('/users/register', storeUserController)
app.post('/users/login', loginUserController)

app.listen(2000, () => {
    console.log('App listening on port 2000')
})