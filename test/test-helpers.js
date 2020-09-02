const bcrypt = require('bcryptjs');

function seedUsers(db, users) {
    const preppedUsers = users.map(users => ({
        ...user,
        password: bcrypt.hashSync(user.password, 10)
    }))
    return db.into('users').insert(preppedUsers)
        .then(() =>
            db(raw(
                `SELECT setval('users_id_seq', ?)`,
                [users[users.length - 1].id],
            ))
        )
}

function seedEntries(db, users, entries) {
    return db.transaction(async trx => {
        await seedUsers(trx, users)
        await trx.into('entries').insert(entries)
        await trx.raw(
            `SELECT setval('entries_id_seq', ?)`,
            [entries[entries.length - 1].id],
        )
    })
}

function makeAuthHeader(user) {
    const token = Buffer.from(`${user.user_name}:${user.password}`).toString('base64')
    return `Basic ${token}`;
}



module.export ={
    seedUsers,
    seedEntries,
    makeAuthHeader
};