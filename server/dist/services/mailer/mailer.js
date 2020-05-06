"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = __importDefault(require("@sendgrid/mail"));
//Dotenv configuration
require('dotenv').config();
const sg_key = process.env.SG_KEY;
mail_1.default.setApiKey(sg_key);
exports.default = mail_1.default;
