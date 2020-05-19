"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UsersRouter = require('express').Router();
const mailer = require('../services/mailer/mailer');
const { UniqueViolationError } = require('objection-db-errors');
const passport = require('../middleware/auth/passport');
//Dotenv configuration
require('dotenv').config();
//Environment variables
const es = process.env.ES;
const ls = process.env.LOGIN_SECRET;
const rs = process.env.REFRESH_SECRET;
UsersRouter.get('/', (req, res) => {
    res.send('Router works!');
});
UsersRouter.post('/signup/', async (req, res) => {
    try {
        const user = await User_1.default.query().insert({
            password: req.body.password,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email
        });
        const token = jsonwebtoken_1.default.sign({ user: user.id }, es, {
            expiresIn: "1h"
        });
        const message = {
            from: 'vitchenko.kirill@gmail.com',
            to: user.email,
            subject: 'Confirm your e-mail address',
            text: `To complete your registration, please, confirm you e-mail address by clicking this link http://localhost:3000/user/email/confirm/${token}`,
            html: `<p>To complete your registration, please, confirm you e-mail address by clicking this link http://localhost:3000/user/email/confirm/${token}</p>`
        };
        await mailer.send(message);
        res.status(200).json({
            message: 'User created successfully.'
        });
    }
    catch (err) {
        if (err instanceof UniqueViolationError) {
            res.status(500).json({
                message: err.constraint
            });
        }
        else {
            res.status(500);
        }
    }
});
UsersRouter.get('/email/confirm/:token', (req, res) => {
    try {
        jsonwebtoken_1.default.verify(req.params.token, es, async (err, decoded) => {
            if (err) {
                if (err.name == 'TokenExpiredError') {
                    res.status(404).redirect('http://localhost:3001/signup?expired=true');
                }
                else {
                    res.status(403).json({
                        message: 'Error verifying your account.'
                    });
                }
            }
            if (decoded.user) {
                const user = await User_1.default.query().findById(decoded.user).patch({ email_confirmed: true });
                res.status(200).redirect('http://localhost:3001/login?confirmed=true');
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(403).send('Error occured while confirming your e-mail address.');
    }
});
UsersRouter.get('/email/unique/:email', async (req, res) => {
    try {
        if (req.params.email) {
            let user_email = await User_1.default.query().select('email').where('email', req.params.email);
            if (user_email.length > 0) {
                res.status(200).send(false);
            }
            else {
                res.status(200).send(true);
            }
        }
        else {
            res.status(200).send(true);
        }
    }
    catch (err) {
        res.status(500);
    }
});
UsersRouter.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    const access_token = jsonwebtoken_1.default.sign({ user: req.user.id }, ls, {
        expiresIn: "1d"
    });
    const refresh_token = jsonwebtoken_1.default.sign({ user: req.user.id }, rs, {
        expiresIn: "7d"
    });
    res.cookie('smooth', refresh_token, { maxAge: 60 * 60 * 24 * 7, httpOnly: true }).send(access_token);
});
module.exports = UsersRouter;
