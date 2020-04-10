//Express imports
import { Application } from 'express'
import { Model } from 'objection'
const express = require('express')
const knex = require('./database/database')

//Initialise Objection
Model.knex(knex)

//Dotenv configuration
require('dotenv').config()

// Routes
const routes = require('./routes/index')

//Constants
const SERVER_PORT: string | number = process.env.SERVER_PORT || 5000

const app: Application = express()

// Append all routes.
app.use(routes)

app.listen(SERVER_PORT, () => console.log('Server running'))