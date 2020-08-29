const { v4: uuidv4 } = require('uuid');
const UsersService = {

    // C
    createUser(db, newUserInfo) {
        
        return db
            .into('users')
            .insert(newUserInfo);
            // .returning('*'); // last
    },
    // R
    getUserInfo(db) {
        return null;
    },
    // U
    updateUserInfo(db) {
        return null;
    },
    // D
    deleteUser(db) {
        return null;
    },
};

module.exports = UsersService;