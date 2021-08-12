const express = require('express')
const path = require('path')
const { config, engine } = require('express-edge')
const mongoose = require('mongoose')
const Post = require('./database/models/Post')
// const bodyParser = require('body-parser') //DEPRECATED

const app = new express()

mongoose.connect('mongodb://localhost/node-js-blog')

// app.use(bodyParser.json()) //DEPRECATED
// app.use(bodyParser.urlencoded({ extended: true })) //DEPRECATED

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(engine)
app.use(express.static('public'))

app.set('views', `${__dirname}/views`)

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/post', (req, res) => {
    res.render('post')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})

app.post('/posts/store', (req, res) => {
    Post.create(req.body, (error, post) => {
        res.redirect('/')
    })
})

app.listen(2000, () => {
    console.log('App listening on port 2000')
})