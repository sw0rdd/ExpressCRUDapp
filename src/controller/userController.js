import User from "../model/user.js";
import bcrypt from "bcrypt";


/**
 * render register form
 * @param {object} req 
 * @param {object} res 
 */
export const registerForm = (req, res) => {
    res.render('users/register');
};

/**
 * handle register
 * @param {object} req - request object 
 * @param {object} res - response object
 */
export const handleRegister = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        // Create and save the new user
        const newUser = new User({
            username,
            password: hashedPassword
        });
        await newUser.save();

        // Optionally log the user in and redirect to home or another page
        req.session.user = { _id: newUser._id.toString(), username: newUser.username };
        req.session.save(err => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).send("An error occurred during registration.");
            }
            res.redirect('/'); // Redirect to the homepage or dashboard
        });
    } catch (error) {
        console.error('Error registering user:', error);
        // Handle errors, e.g., username already taken
        if (error.code === 11000) {
            // Duplicate key error, username already exists
            res.status(400).send("Username is already taken.");
        } else {
            res.status(500).send("An error occurred during registration.");
        }
    }
};


/**
 * render login form
 * @param {object} req - request object
 * @param {object} res - response object
 */
export const loginForm = (req, res) => {
    res.render('users/login');
};

/**
 * handle login 
 * @param {object} req - request object
 * @param {object} res - response object
 * @returns 
 */
export const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            // Store only necessary information in the session
            req.session.user = {
                _id: user._id,
                username: user.username
            };

            // Explicitly save the session before redirecting
            req.session.save(err => {
                if (err) {
                    console.error('Session save error:', err);
                    req.flash('error', 'An error occurred during login.');
                    return res.redirect('/users/login');
                }
                return res.redirect('/');
            });
        } else {
            req.flash('error', 'Invalid username or passWord');
            res.redirect('/users/login');
        }
    } catch (error) {
        console.error('Login error:', error);
        req.flash('error', 'An error occurred during login.');
        res.redirect('/users/login');
    }
};


/**
 * logout
 * @param {object} req - request object
 * @param {object} res - response object 
 */
export const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};



/**
 * get all users
 * @param {object} req - request object
 * @param {object} res - response object 
 */
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render('users/index', {users});
    } catch (error) {
        console.error('Error fetching users: ', error);
        res.status(500).send('Internal server error');
    }
};


/**
 * display form to create a new user
 * @param {object} req - request object
 * @param {object} res - response object
 */
export const createUserForm = (req, res) => {
    res.render('users/create');
}



/**
 * display form to edit user
 * @param {object} req - request object
 * @param {object} res - response object
 */
export const editUserForm = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).send('User not found');
        }
        res.render('users/edit', {user});
    } catch (error) {
        console.error('Error fetching user: ', error);
        res.status(500).send('Internal server error');
    }
};


/**
 * update user
 * @param {object} req - request object
 * @param {object} res - response object
 */
export const updateUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Example for bcrypt
        const user = await User.findByIdAndUpdate(req.params.id, {
            username,
            password: hashedPassword
        }, { new: true });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.redirect('/users');
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal server error');
    }
};


export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).send('User not found');
        }
        res.redirect('/users');
    } catch (error) {
        console.error('Error deleting user: ', error);
        res.status(500).send('Internal server error');
    }
};

