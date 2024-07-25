import { ExtendedRequest } from "../Middleware/verifyToken";
import { Response, Request} from 'express'
import {DbHelper} from '../DatabaseHelpers/index'
import { v4 as uid} from 'uuid'
import { Blog } from "../Models/blogModels";
const  dbInstance= new DbHelper()

export const addBlog= async (req:ExtendedRequest, res:Response)=>{
    try {
        
        const Id =uid()
        const {Heading,Description,ImageUrl}= req.body
        console.log(req.body)
        const AuthorId= req.info?.sub as string
        await dbInstance.exec('dbo.addBlog',{Id,Heading,ImageUrl,Description,AuthorId})
        return res.status(201).json({message:'Blog Added Successfully!!'})
    } catch (error) {
        return res.status(500).json(error)
    }
}


export const getBlogs= async(req:Request, res:Response)=>{
    try {
        
        const blogs = (await dbInstance.exec('dbo.getAllBlogs', {})).recordset as Blog[]

        return res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const getBlog= async(req:ExtendedRequest, res:Response)=>{
    try {
        
        const AuthorId= req.info?.sub as string
        const blogs = (await dbInstance.exec('dbo.getUserBlogs', {authorId:AuthorId})).recordset as Blog[]

        return res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getaBlog= async(req:Request<{id:string}>, res:Response)=>{
    try {
        
        const id= req.params.id
        const blog = (await dbInstance.exec('dbo.getBlog', {Id:id})).recordset[0] as Blog

        return res.status(200).json(blog)
    } catch (error) {
        res.status(500).json(error)
    }
}