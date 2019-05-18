/*
User Controller handle all action with user database object : getting user by it's id and adding a new user
 */

const User = require('../models/User');
const passwordEncryption = require('../encryption/passwordEncryption');

getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        return user
    } catch (error) {
        console.log("Impossible de trouver l'utilisateur");
        throw error
    }
};
const createUser = async (email, firstName, password) => {
    try {
        const hashedPassword = await passwordEncryption.passwordEncryption(password);
        const user = new User({
            firstName: firstName,
            email: email,
            password : hashedPassword,
        });
        console.log(user);
        const savedUser= await user.save();
        return savedUser
    } catch (error) {
        console.log(error.message);
        throw error
    }
};

const getUserByEmail = async(email) => {
    try {
        console.log(email);
        const user = await User.find({ email : email});
        console.log("user ",user);
        return user[0];
    } catch(error) {
        console.log("erreur lors de la recherche de l'utilisateur par email");
        return error;
    }
};

const addPoint = async(idUser,points) => {
    try {
        const updatedUser = await User.findOneAndUpdate({_id:idUser}, {$inc:{points : points}},{new: true})
        return updatedUser;
    } catch(error) {
        return error;
    }
};
const addPushKey = async(idUser,pushKey) => {
    try {
        const updatedUser = await User.findOneAndUpdate({_id:idUser}, {pushKey : pushKey},{new: true})
        return updatedUser;
    } catch(error) {
        return error;
    }
};


module.exports = {
    getUserById,
    createUser,
    getUserByEmail,
    addPoint,
    addPushKey
};
