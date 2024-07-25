import express, {Request, Response, json } from 'express'
import router from './Routes/authRoutes'
import blogRoutes from './Routes/blogsRoutes'
import cors from 'cors'
import uploadRouter from './Routes/uploadRoutes'


const app = express()

app.use(cors())
app.use(json())
app.use('/auth', router)
app.use('/blogs', blogRoutes)
app.use("/upload", uploadRouter)
app.use('/test', (req:Request, res:Response)=>{
    console.log('We Got here')
    return res.status(200).send('<h1> This Is Working Well!!</h1>')
})




app.listen(80, ()=> console.log("Server Running again"))