const bcrypt = require('bcrypt');
const saltRounds = 10;
const config = require('../config/dev');
const jwt = require('jsonwebtoken');

const utilFuncs = {
  async generateHashPassword(tPass) {
      return await bcrypt.hash(tPass , saltRounds);
  },
    async checkPassword(tPass, hash) {
        return await bcrypt.compare(tPass, hash);
    },
    createJWTToken(user) {
        return jwt.sign({ id: user._id, email: user.email, picture: user.picture }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
    }
};

module.exports = utilFuncs;
