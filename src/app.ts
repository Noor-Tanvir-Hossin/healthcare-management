import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { userRoutes } from './app/user/user.routes'

const app : Application= express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/user', userRoutes)

app.get('/', (req:Request, res:Response)=>{
    res.send({
        Message: 'Welcome to healthcare API',
    })
})


export default app
