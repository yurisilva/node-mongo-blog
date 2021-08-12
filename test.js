const mongoose = require('mongoose')
const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/node-js-test-blog', { useNewUrlParser: true })

Post.create({
    title: 'My first blog post', 
    description: 'Blog post description',
    content: 'Lorem Ipsum content.'
}, (error, post) => {
    console.log(error, post)

    Post.find({ }, (error, post) => { 
        console.log("", error, "\n- Found all: \n", post)
    })
    
    Post.findById(post._id, (error, post) => { 
        console.log("", error, "\n- Found by id: \n", post)
    })
    
    Post.findByIdAndUpdate(post._id, {title: 'My second blog post'}, (error, post) => { 
        if(error) console.log(error)
        console.log("- Updated successfully.")
    })
    
    Post.findById(post._id, (error, post) => { 
        if(error) console.log(error)
        console.log("- After title update: \n", post)
    })
    
    Post.deleteOne({ title: 'My second blog post' }, (error, post) => { 
        console.log(error, post)
    })

})
