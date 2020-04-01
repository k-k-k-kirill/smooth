//Express imports
import { Application, Request, Response, NextFunction } from 'express'
const express = require('express')

//Dotenv configuration
require('dotenv').config()

//Constants
const SERVER_PORT: string | number = process.env.SERVER_PORT || 5000

const app: Application = express()

app.listen(SERVER_PORT, () => console.log('Server running'))