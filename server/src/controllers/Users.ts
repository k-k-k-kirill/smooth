import { Router } from 'express'
const UsersRouter: Router = require('express').Router()

UsersRouter.get('/', (req, res) => {
    res.send('Router works!')
})

module.exports = UsersRouter