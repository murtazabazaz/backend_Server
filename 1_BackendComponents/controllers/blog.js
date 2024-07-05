import Blog from "../model/blog.js";
import mongoose from "mongoose";

export const createBlog = async(req, res) =>{
    try {
        console.log(req.file);
        console.log(req.body);
        const {title, content} = req.body;

        const newBlog = new Blog({
            title,
            content,
            author : req.user._id,
            imageUrl: (req?.file?.originalname) ? req.file.originalname : undefined,
            
        });
      
        await newBlog.save();
        return res.status(201).json(newBlog);
    } catch (error) {
        return res.status(401).json({error: error.message});
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        
        const blogs = await Blog.find({}).populate('author', ["fname", "lname"]).exec();

        return res.status(200).json(blogs);

    } catch (error) {
        return res.status(401).json({error: error.message});
    }
}

export const getBlog = async(req, res) =>{
    const {id} = req.params;
   
    try {
        const blog = await Blog.findById(id);
        res.status(200).json(blog)
        
    } catch (error) {
        res.status(404).json({message: "Something went wrong"});
    }
}

export const deleteBlog = async(req, res) => {
    const{id} = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message: "Blog doesn't exist"});
        }
        await Blog.findByIdAndDelete(id);
        res.json({message: "blog deleted succesfully"});
    } catch (error) {
        res.status(404).json({message: "something went wrong"})
    }

}

export const updateBlog = async(req, res) => {
    const {id} = req.params;

    const {title, content} = req.body;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(404).json({message:"blog doesn't exist"});
        }
        const updatedBlog = {
            title,
            content,
            author: req.user._id
        }
       const blog =  await Blog.findByIdAndUpdate(id, updatedBlog, {new : true});
        res.status(201).json(blog);
    } catch (error) {
        res.status(404).json({message:"something went wrong"})
    }
}