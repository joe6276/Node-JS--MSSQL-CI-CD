import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { JPayload } from "../Models/authModels";
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.resolve(__dirname,"../../.env")})


export interface ExtendedRequest extends  Request{
    info?:JPayload
}
export const verifyToken =(req:ExtendedRequest, res:Response, next:NextFunction)=>{
    try {
        

        const token = req.headers['token'] as string

        if(!token){
            return res.status(403).json({message:'Forbidden'})
        }

        const decodedData = jwt.verify(token , process.env.SECRET as string) as JPayload
        req.info=decodedData

        next()

    } catch (error) {
        return res.status(500).json(error)
    }
}