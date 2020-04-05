import User from './models/User';
const express = require('express');
const jennifer = await User.query().insert({
    first_name: 'Jennifer',
    last_name: 'Lawrence',
    username: 'dirty_j',
    password: 'lololo'
});
console.log(jennifer.id);
//Dotenv configuration
require('dotenv').config();
//Constants
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const app = express();
app.listen(SERVER_PORT, () => console.log('Server running'));
