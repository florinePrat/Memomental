/* user bcrypt package to has password with salt */

const bcrypt = require("bcrypt");
const saltRounds = 10;
/* passwordEncryption :
params :  uncrypted password
return : encrypted password
 */
const passwordEncryption = async(password) => {
    try {
        const hash = await bcrypt.hash(password, saltRounds)
        return hash
    } catch (error) {
        console.log(error);
        throw error
    }
};
module.exports = {
    passwordEncryption
};
