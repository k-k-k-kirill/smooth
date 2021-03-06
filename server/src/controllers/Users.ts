import { Router, Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
const UsersRouter: Router = require("express").Router();
const mailer = require("../services/mailer/mailer");
const { UniqueViolationError } = require("objection-db-errors");
const passport = require("../middleware/auth/passport");

//Dotenv configuration
require("dotenv").config();

//Utils
import createAccessToken from "../utils/createAccessToken";
import createRefreshToken from "../utils/createRefreshToken";
import createEmailToken from "../utils/createEmailToken";

//New user registration route
UsersRouter.post("/signup/", async (req: Request, res: Response) => {
  try {
    const user: User = await User.query().insert({
      password: req.body.password,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
    });

    const token: string = createEmailToken(user.id);

    const message = {
      from: "vitchenko.kirill@gmail.com",
      to: user.email,
      subject: "Confirm your e-mail address",
      text: `To complete your registration, please, confirm you e-mail address by clicking this link http://localhost:3000/user/email/confirm/${token}`,
      html: `<p>To complete your registration, please, confirm you e-mail address by clicking this link http://localhost:3000/user/email/confirm/${token}</p>`,
    };

    await mailer.send(message);

    res.status(200).json({
      message: "User created successfully.",
    });
  } catch (err) {
    if (err instanceof UniqueViolationError) {
      res.status(500).json({
        status: 500,
        message: err.constraint,
      });
    } else {
      res.status(500).json({
        status: 500,
        message: "Internal server error occured. Please, try again later.",
      });
    }
  }
});

//Email confirmation route
UsersRouter.get("/email/confirm/:token", (req: Request, res: Response) => {
  try {
    jwt.verify(
      req.params.token,
      process.env.EMAIL_SECRET!,
      async (err: any, decoded: any) => {
        if (err) {
          if (err.name == "TokenExpiredError") {
            res
              .status(403)
              .redirect("http://localhost:3001/signup?expired=true");
          } else {
            res.status(401).json({
              status: 401,
              message: "Error verifying your account.",
            });
          }
        }

        const user: User = await User.query()
          .findById(decoded.user)
          .patch({ email_confirmed: true });
        res.status(200).redirect("http://localhost:3001/login?confirmed=true");
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      message: "Internal server error occured. Please, try again later.",
    });
  }
});

//Route for checking if user email is unique
UsersRouter.get("/email/unique/:email", async (req: Request, res: Response) => {
  try {
    if (req.params.email) {
      let user_email: User = await User.query()
        .select("email")
        .where("email", req.params.email);

      if (user_email.length > 0) {
        res.status(200).send(false);
      } else {
        res.status(200).send(true);
      }
    } else {
      res.status(200).send(true);
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error occured. Please, try again later.",
    });
  }
});

//Login route
UsersRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req: any, res: Response) => {
    const accessToken: string = createAccessToken(req.user.id);

    const refreshToken: string = createRefreshToken(req.user.id);

    res
      .cookie("smooth", refreshToken, {
        maxAge: 60 * 60 * 24 * 7 * 1000,
        httpOnly: true,
      })
      .send(accessToken);
  }
);

//Route for refreshing bearer token
UsersRouter.post("/auth/refresh", async (req: any, res: Response) => {
  const refreshToken: string = req.cookies.smooth;

  if (!refreshToken) {
    res.status(401).json({
      status: 401,
      message: "Unauthorized request. Credentials missing.",
    });
  }

  try {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET!,
      async (err: any, decoded: any) => {
        if (err) {
          if (err.name == "TokenExpiredError") {
            res.status(401).redirect("http://localhost:3001/");
          } else {
            res
              .status(401)
              .json({
                status: 401,
                message: "Ivalid token supplied.",
              })
              .redirect("http://localhost:3001/login");
          }
        }

        const user: User = await User.query().findById(decoded.user);

        if (user) {
          const accessToken: string = jwt.sign(
            { user: user.id },
            process.env.LOGIN_SECRET!,
            {
              expiresIn: "1d",
            }
          );
          res.status(200).send(accessToken);
        } else {
          res.status(404).json({
            status: 404,
            message: "User was not found.",
          });
        }
      }
    );
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error occured. Please, try again later.",
    });
  }
});

module.exports = UsersRouter;
