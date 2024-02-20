import Snippet from "../model/snippet.js";



/**
 * show all snippets
 * @param {object} req - request object 
 * @param {object} res - response object 
 */
export const showSnippets = async (req, res) => {
    try {
        const snippets = await Snippet.find().populate('user', 'username');
        res.render('snippets/index', {snippets})
    } catch (error) {
        console.error('Error fetching snippets: ', error);
        res.status(500).send('Internal server error')
    }
};


/**
 * display form to create a new snippet
 * @param {object} req - request object 
 * @param {object} res - response object
 */
export const createSnippetForm = async (req, res) => {
    res.render('snippets/create')
}


/**
 * handle creating a new snippet
 * @param {object} req - request object
 * @param {object} res - response object 
 */
export const createSnippet = async (req, res) => {
    const {title, content} = req.body;
    try {
        const newSnippet = await Snippet.create({
            title,
            content,
            user: req.session.user._id
        });
        res.redirect('/snippets')
    } catch (error) {
        console.error('Error creating snippet: ', error);
        res.status(500).send('Internal server error')
    } 
};


/**
 * display form to edit snippet
 * @param {object} req - request object
 * @param {object} res - response object  
 * @returns {object} - response object
 */
export const editSnippetForm = async (req, res) => {
    try {
        const snippet = await Snippet.findById(req.params.id);
        if (!snippet) {
            return res.status(404).send('Snippet not found')
        }
        if (snippet.user.toString() !== req.session.user._id.toString()) {
            return res.status(403).send('You are not authorized to edit this snippet')
        }
        res.render('snippets/edit', {snippet})
    } catch (error) {
        console.error('Error fetching snippet: ', error);
        res.status(500).send('Internal server error')
    }
};


/**
 * handle updating a snippet
 * @param {object} req - request object 
 * @param {object} res - response object 
 * @returns 
 */
export const updateSnippet = async (req, res) => {
    const {title, content} = req.body;
    try {
        const snippet = await Snippet.findById(req.params.id);
        if (!snippet) {
            return res.status(404).send('Snippet not found')
        }
        if (snippet.user.toString() !== req.session.user._id.toString()) {
            return res.status(403).send('You are not authorized to edit this snippet')
        }
        snippet.title = title;
        snippet.content = content;
        await snippet.save();
        res.redirect('/snippets')
    } catch (error) {
        console.error('Error updating snippet: ', error);
        res.status(500).send('Internal server error')
    }
};


/**
 * handle deleting a snippet
 * @param {object} req - request object
 * @param {object} res - response object 
 */

export const deleteSnippet = async (req, res) => {
    try {
        const snippet = await Snippet.findById(req.params.id);
        if (!snippet) {
            return res.status(404).send('Snippet not found')
        }
        if (snippet.user.toString() !== req.session.user._id.toString()) {
            return res.status(403).send('You are not authorized to delete this snippet')
        }
        await snippet.remove();
        res.redirect('/snippets')
    } catch (error) {
        console.error('Error deleting snippet: ', error);
        res.status(500).send('Internal server error')
    }
};