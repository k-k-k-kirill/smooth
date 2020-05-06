"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsersRouter = require('express').Router();
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailer_1 = __importDefault(require("../services/mailer/mailer"));
//Dotenv configuration
require('dotenv').config();
//Environment variables
const es = process.env.ES;
UsersRouter.get('/', (req, res) => {
    res.send('Router works!');
});
UsersRouter.post('/signup/', async (req, res) => {
    try {
        const user = await User_1.default.query().insert({
            username: req.body.username,
            password: req.body.password,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        });
        const token = jsonwebtoken_1.default.sign({ user: user.id }, es, {
            expiresIn: "1h"
        });
        const message = {
            to: req.body.email,
            from: 'vitchenko.kirill@gmail.com',
            subject: 'Confirm your email address',
            text: `Please, confirm your e-mail address by clicking this link localhost:3000/user/confirm/?t=${token}`,
            html: `<p>Please, confirm your e-mail address by clicking this link localhost:3000/user/confirm/?t=${token}</p>`,
        };
        console.log(mailer_1.default);
        const mail = mailer_1.default.send(message).then((res) => {
            console.log(res);
        }).catch((err) => console.log(err));
        res.send(token);
    }
    catch (err) {
        res.send('Error creating user!');
    }
});
module.exports = UsersRouter;
