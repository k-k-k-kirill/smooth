"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const express = require('express');
const knex = require('./database/database');
//Initialise Objection
objection_1.Model.knex(knex);
//Dotenv configuration
require('dotenv').config();
// Routes
const routes = require('./routes/index');
//Constants
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const app = express();
// Append all routes.
app.use(routes);
app.listen(SERVER_PORT, () => console.log('Server running'));
