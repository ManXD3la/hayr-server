const { v4: uuidv4 } = require('uuid');
const UsersService = {

    // C
    createUser(db, newUserInfo) {
        
        return db
            .into('hayr_users')
            .insert({user_name:`${newUserInfo.user_name}`,
                    email_address:`${newUserInfo.email_address}`,
                    user_password:`${newUserInfo.user_password}`,
                    id:`${uuidv4}`})
            .returning('user_name','email_address'); // last
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