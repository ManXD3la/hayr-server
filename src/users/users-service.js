const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const UsersService = {
    // Validations
    validatePassword(password) {
        if (password.length < 8) {
            return 'Password be longer than 8 characters';
        }
        if (password.length > 72) {
            return 'Password be less than 72 characters';
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
            return 'Password must not start or end with empty spaces';
        }
        if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
            return 'Password must contain one upper case, lower case, number and special character';
        }
        return null;
    },

    validateUser(db, user_name) {
        return db('users')
            .where({ user_name })
            .first()
            .then((user) => !!user);
    },
    
    getUserWithEmail(db, email) {
        return db('users')
            .where({ email })
            .first();
    },

    validatePassword(password) {
        if (password.length < 8) {
            return 'Password be longer than 8 characters';
        }
        if (password.length > 72) {
            return 'Password be less than 72 characters';
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
            return 'Password must not start or end with empty spaces';
        }
        if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
            return 'Password must contain one upper case, lower case, number and special character';
        }
        return null;
    },

    validateUser(db, user_name) {
        return db('users')
            .where({ user_name })
            .first()
            .then((user) => !!user);
    },
    
    getUserWithEmail(db, email) {
        return db('users')
            .where({ email })
            .first();
    },

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
        return db('users')
            .select(['id','name','user_name','email']);
    }
};

module.exports = UsersService;