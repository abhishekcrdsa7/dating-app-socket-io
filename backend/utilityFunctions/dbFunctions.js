const user = require('../database/dbModels/user');

const funcs = {
    async addUser(newUser) {
        const result = await user.findOne({ email : newUser.email });
        if(result) {
            return null;
        }else {
            return await user.create(newUser);
        }
    },
    async findUser(u) {
        const result = await user.findOne({ email : u.email });
        if(result) {
            return result;
        }else {
            return null;
        }
    },
    async findAllUsers() {
        return await user.find();
    }
};

module.exports = funcs;
