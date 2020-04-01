const express = require('express');
//Dotenv configuration
require('dotenv').config();
//Constants
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const app = express();
console.log('env test', process.env.DB_USER);
app.listen(SERVER_PORT, () => console.log('Server running'));
