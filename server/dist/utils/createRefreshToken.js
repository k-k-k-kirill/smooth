"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createRefreshToken = (user_id) => {
    const token = jsonwebtoken_1.default.sign({ user: user_id }, process.env.REFRESH_SECRET, {
        expiresIn: "7d"
    });
    return token;
};
exports.default = createRefreshToken;
