"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UsersRouter = require('express').Router();
UsersRouter.get('/', (req, res) => {
    res.send('Router works!');
});
module.exports = UsersRouter;
