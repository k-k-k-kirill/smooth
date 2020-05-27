"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const express = require('express');
const knex = require('./database/database');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('./middleware/auth/passport');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
//Initialise Objection
objection_1.Model.knex(knex);
//Dotenv configuration
require('dotenv').config();
// Routes
const routes = require('./routes/index');
//Constants
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const app = express();
//Morgan logging
app.use(morgan('combined'));
// BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Cors
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
//Cookie parser
app.use(cookieParser());
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Append all routes.
app.use(routes);
app.listen(SERVER_PORT, () => console.log('Server running on port ' + SERVER_PORT));
