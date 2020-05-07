import { Router } from 'express'
import User from '../models/User'
import jwt from 'jsonwebtoken'
const UsersRouter: Router = require('express').Router()
const mailer = require('../services/mailer/mailer')
const { UniqueViolationError } = require('objection-db-errors');

//Dotenv configuration
require('dotenv').config()

//Environment variables
const es: any = process.env.ES

UsersRouter.get('/', (req, res) => {
    res.send('Router works!')
})

UsersRouter.post('/signup/', async (req, res) => {
    try {
        const user: User = await User.query().insert({
            username: req.body.username,
            password: req.body.password,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        })

        const token: string =  jwt.sign({ user: user.id }, es, {
            expiresIn: "1h"
        })

        const message = {
            from: 'vitchenko.kirill@gmail.com',
            to: user.email,
            subject: 'Confirm your e-mail address',
            text: `To complete your registration, please, confirm you e-mail address by clicking this link http://localhost:3000/user/confirm/${token}`,
            html: `<p>To complete your registration, please, confirm you e-mail address by clicking this link http://localhost:3000/user/confirm/${token}</p>`
        }

        await mailer.send(message)
        res.status(200).json({
            message: 'User created successfully.'
        })
    } catch(err) {

        if(err instanceof UniqueViolationError) {
            res.status(500).json({
                message: err.constraint
            })
        } else {
            res.status(500)
        }
    }
})

UsersRouter.get('/confirm/:token', (req, res) => {
    try {
        jwt.verify(req.params.token, es, async (err: any, decoded: any) => {
            if(err) {
                res.status(403).json({
                    message: 'Error verifying your username.'
                })
            }

            if(decoded.user) {
                const user: User = await User.query().findById(decoded.user).patch({ email_confirmed: true })
                res.status(200).redirect('http://localhost:3001/login?confirmed=true');
            }
        });
    } catch(err) {
        console.log(err)
        res.status(403).send('Error occured while confirming your e-mail address.')
    }
})

module.exports = UsersRouter