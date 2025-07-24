import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { userRoutes } from './app/user/user.routes'

const app : Application= express()

app.use(cors())
app.use(express.json())

app.get('/', (req:Request, res:Response)=>{
    res.send({
        Message: 'Welcome to healthcare API',
    })
})

app.use('/api/v1/user', userRoutes)

export default app
