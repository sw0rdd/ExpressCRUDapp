import express from "express";

const userRouter = express.Router();

import * as userController from "../controller/userController.js";

function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    res.status(403).send("You are not authorized to access this page FORBIDDEN");
}



// Display form to register
userRouter.get("/register", userController.registerForm);

// register post
userRouter.post("/register", userController.handleRegister);

// Display form to login
userRouter.get("/login", userController.loginForm);

// Login
userRouter.post("/login", userController.handleLogin);

// Logout
userRouter.get("/logout", userController.logout);

export default userRouter;
