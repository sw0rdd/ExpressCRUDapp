import express from 'express'

import * as snippetController from '../controller/snippetController.js'

const snippetRouter = express.Router()

/**
 * Middleware to check if the user is authenticated.
 * If the user is authenticated, it proceeds to the next middleware.
 * Otherwise, it sends a 403 Forbidden status response.
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {Function} next - next function
 */
function isAuthenticated (req, res, next) {
  if (req.session.user) {
    next()
  }
  res.status(403).send('You are not authorized to access this page FORBIDDEN')
}

// route to display all snippets (to all users)
snippetRouter.get('/', snippetController.getAllSnippets)

// route to display form to create a new snippet (for authenticated users only)
snippetRouter.get('/create', isAuthenticated, snippetController.createSnippetForm)

// route to create a new snippet (for authenticated users only)
snippetRouter.post('/', isAuthenticated, snippetController.createSnippet)

// route to display a form to edit a snippet (for authenticated users only)
snippetRouter.get('/edit/:id', isAuthenticated, snippetController.editSnippetForm)

// route to update a snippet (for authenticated users only)
snippetRouter.put('/update/:id', isAuthenticated, snippetController.updateSnippet)

// route to delete a snippet (for authenticated users only)
snippetRouter.delete('/delete/:id', isAuthenticated, snippetController.deleteSnippet)

export default snippetRouter
