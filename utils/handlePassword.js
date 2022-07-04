const bcrypt = require("bcrypt")
const saltRounds = 10;

const encrypt = async(userPass) => {
 return await bcrypt.hash(userPass,saltRounds)
};

const compare = async(userPass, hashedPassword) => {
    return await bcrypt.compare(userPass,hashedPassword)
}

module.exports = {encrypt,compare}