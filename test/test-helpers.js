const bcrypt = require('bcryptjs');
const knex = require('knex');

function makeKnexInstance() {
    return knex({
        client: 'pg',
        connection: process.env.TEST_DATABASE_URL
    })
}

function seedUsers(db, users) {
    const preppedUsers = users.map(users => ({
        ...user,
        password: bcrypt.hashSync(user.password, 10)
    }))
    return db.transaction(async trx => {
        await trx.into('users').insert(preppedUsers)
        await trx.raw(
            `SELECT setval('myclientele_user_id_seq', ?)`,
            [users[users.length - 1].id],
        ) 
    })
}

function makeTestUsers() {
    return [
        {
        id: 1,
        name: 'test-user-1',
        user_name: 'test-user-name-1',
        email: 'test@email.com',
        password: 'p@ssw0rd1!',
        admin_y: true
        },
        {
        id: 2,
        name: 'test-user-2',
        user_name: 'test-user-name-2',
        email: 'test2@email.com',
        password: 'p@ssw0rd1!',
        admin_y: false
        }
    ]
}

function makeTestEntries(user1,user2) {
    return [
        {
            id: 1,
            id_user: user1.id,
            reflection: `Okay, so here''s a reflection.`,
            mood_pleasant: 250,
            mood_energy: 50,
            entry_share: 'private',
        },
        {
            id: 2,
            id_user: user2.id,
            reflection: `Okay, so here''s another reflection.`,
            mood_pleasant: 150,
            mood_energy: 150,
            entry_share: 'public',
        },
        {
            id: 3,
            id_user: null,
            reflection: `Okay, so here''s the first reflection.`,
            mood_pleasant: 50,
            mood_energy: 250,
            entry_share: 'public',
        }
    ]
}

const newEntry = {

    reflection: `Okay, so here''s a fourth reflection.`,
    mood_pleasant: 1,
    mood_energy: 2
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

function cleanTables(db) {
    return db.transaction(trx => 
        trx.raw(
            `TRUNCATE
            entries,
            users`
        )
        .then(() => 
            Promise.all([
            trx.raw(`ALTER SEQUENCE entries_id_seq minvalue 0 START WITH 1`),
            trx.raw(`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`),
            trx.raw(`SELECT setval('entries_id_seq', 0)`),
            trx.raw(`SELECT setval('users_id_seq', 0)`),
            ])
        )
    )
}


module.export ={
    makeKnexInstance,
    makeTestUsers,
    seedUsers,
    makeTestEntries,
    seedEntries,
    makeAuthHeader,
    cleanTables
};