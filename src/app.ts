import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { userRoutes } from './app/user/user.routes'
import { adminRoutes } from './app/admin/admin.routes'
import globalErrorHandlers from './app/middlewares/globalErrorHandlers'

const app : Application= express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/user', userRoutes)
app.use('/api/admin', adminRoutes)
app.use(globalErrorHandlers)

app.get('/', (req:Request, res:Response)=>{
    res.send({
        Message: 'Welcome to healthcare API',
    })
})


export default app
