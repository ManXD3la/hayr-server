const UsersService = {

    // C
    createUser(db, newUserInfo) {
        return db
            .into('users')
            .insert(newUserInfo)
            .returning(['id','name','user_name','email']); // last
    },
    // R
    getUserInfo(db, userName) {
        return db
            .from('users')
            .select(['id','name','user_name','email','admin_y'])
            .where('user_name',`${userName}`);
    },
    // U
    updateUserInfo(db) {
        return null;
    },
    // D
    deleteUser(db, userName) {
        return db('users')
            .del()
            .where('user_name', `${userName}`);
    },

    getAllUserInfo(db) {
        return db
            .from('users')
            .select(['id','name','user_name','email']);
    }
};

module.exports = UsersService;