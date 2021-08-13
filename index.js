const express = require('express')
const path = require('path')
const { config, engine } = require('express-edge')
const mongoose = require('mongoose')
const Post = require('./database/models/Post')
const fileUpload = require('express-fileupload')

const app = new express()

mongoose.connect('mongodb://localhost/node-js-blog')

app.use(fileUpload())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(engine)
app.use(express.static('public'))

const validateCreatePostMiddleware = (req, res, next) => {
    if(!req.files || !req.body.username || !req.body.title || !req.body.subtitle || !req.body.content) {
        return res.redirect('/posts/new')
    }
    next()
}

app.use('/posts/store', validateCreatePostMiddleware)

app.set('views', `${__dirname}/views`)

app.get('/', async (req, res) => {
    const posts = await Post.find({})
    res.render('index', {
        posts
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/post/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post', { post })
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})

app.post('/posts/store', (req, res) => {
    const { image } = req.files

    image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
        Post.create({...req.body, image: `/posts/${image.name}`}, (error, post) => {
            res.redirect('/')
        })
    })
})

app.listen(2000, () => {
    console.log('App listening on port 2000')
})