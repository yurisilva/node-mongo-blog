const express = require('express')
const { config, engine } = require('express-edge')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const validateCreatePostMiddleware = require('./middleware/storePost')

const app = new express()

mongoose.connect('mongodb://localhost/node-js-blog')

app.use(fileUpload())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(engine)
app.use(express.static('public'))
app.use('/posts/store', validateCreatePostMiddleware)

const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')


app.set('views', `${__dirname}/views`)

app.get('/', homePageController)
app.get('/post/:id', getPostController)
app.get('/posts/new', createPostController)
app.post('/posts/store', storePostController)

app.listen(2000, () => {
    console.log('App listening on port 2000')
})