const bcrypt = require('bcryptjs');

const AuthService = {
    getUserWithUserName(db, user_name) {
        return db('users')
            .where({ user_name })
            .first();
    },
    parseBasicToken(token) {
        return Buffer
            .from(token, 'base64')
            .toString()
            .split(':');
    },
    comaparePasswords(password, hash) {
        return bcrypt.compare(password, hash);
    }
};

module.exports = AuthService ;