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
//Utils
const createAccessToken_1 = __importDefault(require("../utils/createAccessToken"));
const createRefreshToken_1 = __importDefault(require("../utils/createRefreshToken"));
const createEmailToken_1 = __importDefault(require("../utils/createEmailToken"));
//New user registration route
UsersRouter.post('/signup/', async (req, res) => {
    try {
        const user = await User_1.default.query().insert({
            password: req.body.password,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email
        });
        const token = createEmailToken_1.default(user.id);
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
                status: 500,
                message: err.constraint
            });
        }
        else {
            res.status(500).json({
                status: 500,
                message: 'Internal server error occured. Please, try again later.'
            });
        }
    }
});
//Email confirmation route
UsersRouter.get('/email/confirm/:token', (req, res) => {
    try {
        jsonwebtoken_1.default.verify(req.params.token, process.env.EMAIL_SECRET, async (err, decoded) => {
            if (err) {
                if (err.name == 'TokenExpiredError') {
                    res.status(403).redirect('http://localhost:3001/signup?expired=true');
                }
                else {
                    res.status(401).json({
                        status: 401,
                        message: 'Error verifying your account.'
                    });
                }
            }
            const user = await User_1.default.query().findById(decoded.user).patch({ email_confirmed: true });
            res.status(200).redirect('http://localhost:3001/login?confirmed=true');
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: 500,
            message: 'Internal server error occured. Please, try again later.'
        });
    }
});
//Route for checking if user email is unique
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
        res.status(500).json({
            status: 500,
            message: 'Internal server error occured. Please, try again later.'
        });
    }
});
//Login route
UsersRouter.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    const accessToken = createAccessToken_1.default(req.user.id);
    const refreshToken = createRefreshToken_1.default(req.user.id);
    res.cookie('smooth', refreshToken, { maxAge: 60 * 60 * 24 * 7, httpOnly: true }).send(accessToken);
});
//Route for refreshing bearer token
UsersRouter.post('/auth/refresh', async (req, res) => {
    const refreshToken = req.cookies.smooth;
    if (!refreshToken) {
        res.status(401).json({
            status: 401,
            message: 'Unauthorized request. Credentials missing.'
        });
    }
    try {
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_SECRET, async (err, decoded) => {
            if (err) {
                if (err.name == 'TokenExpiredError') {
                    res.status(401).redirect('http://localhost:3001/');
                }
                else {
                    res.status(401).json({
                        status: 401,
                        message: 'Ivalid token supplied.'
                    }).redirect('http://localhost:3001/login');
                }
            }
            const user = await User_1.default.query().findById(decoded.user);
            if (user) {
                const accessToken = jsonwebtoken_1.default.sign({ user: user.id }, process.env.LOGIN_SECRET, {
                    expiresIn: "1d"
                });
                res.status(200).send(accessToken);
            }
            else {
                res.status(404).json({
                    status: 404,
                    message: 'User was not found.'
                });
            }
        });
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error occured. Please, try again later.'
        });
    }
});
module.exports = UsersRouter;
