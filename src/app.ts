import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandlers from './app/middlewares/globalErrorHandlers'
import { StatusCodes } from 'http-status-codes'
import router from './app/routes'
import cookieParser from 'cookie-parser'

const app : Application= express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
        

app.get('/', (req:Request, res:Response)=>{
    res.send({
        Message: 'Welcome to healthcare API',
    })
})
app.use('/api', router)
app.use(globalErrorHandlers)
app.use((req: Request, res: Response, next: Function) => {  
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "API NOT FOUND",
        error:{
            path:req.originalUrl,
            message: "Your requested path is not found"
        }
    })
})


export default app
