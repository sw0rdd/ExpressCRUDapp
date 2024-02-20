import User from "../model/user.js";


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
 * create a new user
 * @param {object} req - request object 
 * @param {object} res -  response object
 */
export const createUser = async (req, res) => {
    //TODO add hashing and validation
    const {username, password} = req.body;
    try {
        const newUser = new User({
            username,
            password
        })
        await newUser.save()
    } catch (error) {
        console.error('Error creating user: ', error);
        res.status(500).send('Internal server error')
    }
};


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

