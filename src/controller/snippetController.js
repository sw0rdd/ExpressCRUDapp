import Snippet from '../model/snippet.js'

/**
 * show all snippets, fetch from database, oldest first
 * @param {object} req - request object
 * @param {object} res - response object
 */
export const getAllSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find().sort({ createdAt: -1 }).populate('user', 'username');
    res.render('snippets/index', { snippets, user: req.session.user });
  } catch (error) {
    console.error('Error fetching snippets:', error);
    req.flash('error', 'Error fetching snippets.');
    res.redirect('/');
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
  const { title, content } = req.body
  try {
    await Snippet.create({
      title,
      content,
      user: req.session.user._id
    })
    req.flash('success', 'Snippet created successfully!')
    res.redirect('/snippets')
  } catch (error) {
    console.error('Error creating snippet:', error)
    req.flash('error', 'Error creating snippet.')
    res.redirect('/snippets/create')
  }
}

/**
 * display form to edit snippet
 * @param {object} req - request object
 * @param {object} res - response object
 * @returns {object} - response object
 */
export const editSnippetForm = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id)
    if (!snippet) {
      return res.status(404).send('Snippet not found')
    }
    if (snippet.user.toString() !== req.session.user._id.toString()) {
      return res.status(403).send('You are not authorized to edit this snippet')
    }
    res.render('snippets/edit', { snippet })
  } catch (error) {
    console.error('Error fetching snippet: ', error)
    res.status(500).send('Internal server error')
  }
}

/**
 * handle updating a snippet
 * @param {object} req - request object
 * @param {object} res - response object
 * @returns {Promise} - promise
 */
export const updateSnippet = async (req, res) => {
  const { title, content } = req.body
  try {
    const snippet = await Snippet.findById(req.params.id)
    if (!snippet) {
      req.flash('error', 'Snippet not found.')
      return res.redirect('/snippets')
    }
    if (snippet.user.toString() !== req.session.user._id.toString()) {
      req.flash('error', 'You are not authorized to edit this snippet.')
      return res.redirect('/snippets')
    }
    snippet.title = title
    snippet.content = content
    await snippet.save()
    req.flash('success', 'Snippet updated successfully!')
    res.redirect('/snippets')
  } catch (error) {
    console.error('Error updating snippet:', error)
    req.flash('error', 'Error updating snippet.')
    res.redirect(`/snippets/edit/${req.params.id}`)
  }
}

/**
 * handle deleting a snippet
 * @param {object} req - request object
 * @param {object} res - response object
 * @returns {Promise} - promise
 */

export const deleteSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id)
    if (!snippet) {
      req.flash('error', 'Snippet not found.')
      return res.redirect('/snippets')
    }
    if (snippet.user.toString() !== req.session.user._id.toString()) {
      req.flash('error', 'You are not authorized to delete this snippet.')
      return res.redirect('/snippets')
    }

    // Use deleteOne instead of remove
    await Snippet.deleteOne({ _id: snippet._id })

    req.flash('success', 'Snippet deleted successfully!')
    res.redirect('/snippets')
  } catch (error) {
    console.error('Error deleting snippet:', error)
    req.flash('error', 'Error deleting snippet.')
    res.redirect('/snippets')
  }
}
