/*
User Controller handle all action with user database object : getting user by it's id and adding a new user
 */

const User = require('../models/User')
const passwordEncryption = require('../encryption/passwordEncryption');

getUserById = async (id) => {
    try {
        const user = await User.findById(id)
        return user
    } catch (error) {
        console.log("Impossible de trouver l'utilisateur");
        throw error
    }
}
const createUser = async (email, firstName, lastName, password) => {
    try {
        /*@TODO : check if user email already exists in database */
        const hashedPassword = await passwordEncryption.passwordEncryption(password);
        const user = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password : hashedPassword,
        });
        const savedUser= await user.save()
        return savedUser
    } catch (error) {
        console.log(error.message)
        throw error
    }
}

module.exports = {
    getUserById,
    createUser,
};
