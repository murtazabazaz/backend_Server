import mongoose from 'mongoose';
import User from './user.js';

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageUrl : {
        type : String
    }
    
    // createdAt: {
    //      type: Date,
    //      default: Date.now
    //  }
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
