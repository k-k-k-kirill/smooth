//Express imports
import { Application } from "express";
import { Model } from "objection";
const express = require("express");
const knex = require("./database/database");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("./middleware/auth/passport");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const logger = require("./logger");

//Initialise Objection
Model.knex(knex);

//Dotenv configuration
require("dotenv").config();

// Routes
const routes = require("./routes/index");

//Constants
const SERVER_PORT: string | number = process.env.SERVER_PORT || 5000;

const app: Application = express();

//Morgan logging
app.use(morgan("combined", { stream: logger.stream }));

// BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Cors
app.use(cors({ origin: "http://localhost:3001", credentials: true }));

//Cookie parser
app.use(cookieParser());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Append all routes.
app.use(routes);

app.listen(SERVER_PORT, () =>
  console.log("Server running on port " + SERVER_PORT)
);
