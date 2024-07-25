import { Request,Response } from "express";
import {DbHelper} from '../DatabaseHelpers'
import bcrypt from 'bcrypt'
import {v4 as uid} from 'uuid'
import {User,JPayload} from "../Models/authModels";
import jwt from 'jsonwebtoken'

const dbInstance= new DbHelper()
export const registerUser=async (req:Request, res:Response)=>{

    try {
    const {Name, Email, Password} =req.body
    const Id = uid()
    const hashedpassword = await bcrypt.hash(Password, 10)
    await dbInstance.exec('dbo.addUser', {Id,Name,Email,Password:hashedpassword})
    res.status(201).json({message:' Added user Successfully!'})
    } catch (error) {
        res.status(500).json({error})
    }

}


export const loginUser= async(req:Request, res:Response)=>{
try {
    
    const {Email, Password}=req.body
    const user = (await dbInstance.exec('dbo.getUserByEmail',{Email})).recordset 
     if(user.length>0){
        const isValid= await bcrypt.compare(Password, user[0].Password)
        if(isValid){
            let payload:JPayload={
                sub:user[0].Id
            }
            const token= jwt.sign(payload,process.env.SECRET as string, {expiresIn:'3h'})
            return res.status(200).json({message:"Logged In !!", token})
        }else{
            return res.status(400).json({message:'Invalid Credentials'})
        }
     }

     return res.status(400).json({message:'Invalid Credentials'})
} catch (error) {
    return res.status(500).json(error)
}
}
