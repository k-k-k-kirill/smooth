//Express imports
import { Application } from 'express'
import { Model } from 'objection'
const express = require('express')
const knex = require('./database/database')
const bodyParser    = require('body-parser')
const cors = require('cors')

//Initialise Objection
Model.knex(knex)

//Dotenv configuration
require('dotenv').config()

// Routes
const routes = require('./routes/index')

//Constants
const SERVER_PORT: string | number = process.env.SERVER_PORT || 5000

const app: Application = express()

// BodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Append all routes.
app.use(routes)

//Cors
app.use(cors())

app.listen(SERVER_PORT, () => console.log('Server running on port ' + SERVER_PORT))