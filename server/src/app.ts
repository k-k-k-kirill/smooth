import express, { Application, Request, Response, NextFunction } from 'express'

//Constants
const PORT: string | number = process.env.PORT || 5000

const app: Application = express()

app.get('/', (req: Request, res: Response) => {
    res.send('Hello!')
})

app.listen(PORT, () => console.log('Server running'))