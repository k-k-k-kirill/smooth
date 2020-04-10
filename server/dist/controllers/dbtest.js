"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbTestRouter = require('express').Router();
dbTestRouter.get('/', (req, res) => {
    res.send('Router works!');
});
module.exports = dbTestRouter;
