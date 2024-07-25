import { Router } from "express";
import { addBlog, getBlog, getBlogs, getaBlog } from "../Controllers/blogsController";
import { verifyToken } from "../Middleware/verifyToken";


const blogRoutes= Router()



blogRoutes.post('', verifyToken,addBlog)
blogRoutes.get('',  getBlogs)
blogRoutes.get('/myblogs', verifyToken, getBlog)
blogRoutes.get('/:id', verifyToken, getaBlog)

export default blogRoutes;