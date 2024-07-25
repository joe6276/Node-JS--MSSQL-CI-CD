
import { Router } from "express";
import { verifyToken } from "../Middleware/verifyToken";
import { uploadImage } from "../Controllers/uploadController";


const uploadRouter = Router()

uploadRouter.get("", verifyToken, uploadImage)
export default uploadRouter