import express from "express";

const snippetRouter = express.Router();

import * as snippetController from "../controller/snippetController.js";

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.status(403).send("You are not authorized to access this page FORBIDDEN");
}   

// route to display all snippets (to all users)
snippetRouter.get("/", snippetController.getAllSnippets);

// route to display form to create a new snippet (for authenticated users only)
snippetRouter.get("/create", isAuthenticated, snippetController.createSnippetForm);

// route to create a new snippet (for authenticated users only)
snippetRouter.post("/", isAuthenticated, snippetController.createSnippet);

// route to display a form to edit a snippet (for authenticated users only)
snippetRouter.get("/edit/:id", isAuthenticated, snippetController.editSnippetForm);

// route to update a snippet (for authenticated users only)
snippetRouter.put("/update/:id", isAuthenticated, snippetController.updateSnippet);


// route to delete a snippet (for authenticated users only)
snippetRouter.delete("/delete/:id", isAuthenticated, snippetController.deleteSnippet);

export default snippetRouter;
