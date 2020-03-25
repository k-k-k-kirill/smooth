const express = require('express');
//Constants
const PORT = process.env.PORT || 5000;
const app = express();
// Initialize knex.
const knex = require('knex');
const knexfile = require('../knexfile');
const env = process.env.NODE_ENV || 'development';
const configOptions = knexfile[env];
const db = knex(configOptions);
db.schema.createTable('loh', (table) => {
    console.log('table created successfully', table);
});
app.get('/', (req, res) => {
    res.send('Hello!');
});
app.listen(PORT, () => console.log('Server running'));
