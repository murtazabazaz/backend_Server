import express from 'express';
import {createBlog, deleteBlog, getAllBlogs, getBlog, updateBlog} from "../controllers/blog.js";
import { isAuthenticated } from '../middlewares/authmiddleware.js';
import multer from 'multer';

const upload = multer({ dest: 'blog/pic/' })

const router = express.Router();

router.post("/createBlog", isAuthenticated, upload.single('imageUrl'), createBlog);

router.get("/blog",  getAllBlogs);

router.get("/:id", getBlog)

router.delete("/:id", isAuthenticated, deleteBlog)

router.patch("/:id", isAuthenticated, updateBlog)

export default router;