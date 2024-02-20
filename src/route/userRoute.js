import express from "express";

const userRouter = express.Router();

import * as userController from "../controller/userController";

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.status(403).send("You are not authorized to access this page FORBIDDEN");
}

// route to display all users (to all users)
userRouter.get("/", userController.getAllUsers);

// route to display form to create a new user (for authenticated users only)
userRouter.get("/create", userController.createUserForm);

// route to create a new user (for authenticated users only)
userRouter.post("/", isAuthenticated, userController.createUser);

// Display form to edit a user (for authenticated users only)
userRouter.get("/:id/edit", isAuthenticated, userController.editUserForm);

// Update a user (for authenticated users only)
userRouter.put("/:id", isAuthenticated, userController.updateUser);

// Delete a user (for authenticated users only)
userRouter.delete("/:id", isAuthenticated, userController.deleteUser);

export default userRouter;

