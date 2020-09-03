const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Entries Endpoints', () => {
    let db;
    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        });
        app.set('db', db);
    });
    after('disconnect from db', () => db.destroy());
    before('clean the table', () => helpers.cleanTables(db));
    beforeEach('clean the tables',() => helpers.cleanTables(db));
    afterEach('clean the tables', () => helpers.cleanTables(db));

    const testUsers = helpers.makeTestUsers();
    const [testUser1, testUser2] = testUsers;

    const testEntries = helpers.makeTestEntries(testUser1, testUser2);
    const specEntry = testEntries[0];
    const newEntry = helpers.newEntry;

    describe('Protected Endpoints', () => {
        beforeEach('insert entries', () =>
            helpers.seedEntries(db, testUsers, testEntries)
        );

        describe('GET /api/entry/public', () => {
            //run this suite.  Errors running the whole suite, but individually, they work.
            it('responds with 401 missing bearer token when no bearer token', () => {
                return supertest(app)
                    .get('/api/entry/public')
                    .expect(401, { error: 'Missing basic token' });
            });
            it('Responds with 401 when no credentials supplied', () => {
                const userNoCreds = { user_name: '', password: '' };
                return supertest(app)
                    .get('/api/entry/public')
                    .set('Authorization', helpers.makeAuthHeader(userNoCreds))
                    .expect(401, { error: 'Unauthorized request' });
            });
            it('Responds with 401 when invalid user_name', () => {
                const userInvalidCreds = { user_name: 'karen', password: 'manager' };
                return supertest(app)
                    .get('/api/entry/public')
                    .set('Authorization', helpers.makeAuthHeader(userInvalidCreds))
                    .expect(401, { error: 'Unauthorized request' });
            });
            context('Given no entries', () => {
                beforeEach('seed users', () => helpers.seedUsers(db, testUsers));
                it('Responds with 200 and empty list', () => {
                    return supertest(app)
                        .get('/api/entry/public')
                        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                        .expect(200, []);
                });
            });
            context('Given entries', () => {
                beforeEach('seed entries', () =>
                    helpers.seedEntries(db, testUsers, testEntries)
                );
                it('responds with 200 and all public entries the user has in the database', () => {
                    const expectedEntries = testEntries.filter(
                        (entry) => entry.entry_share === 'public'
                    );
                    return supertest(app)
                        .get('/api/entry/public')
                        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                        .expect(200, expectedEntries);
                });
            });
        });


        describe('GET /api/entry', () => {
            //run this suite.  Errors running the whole suite, but individually, they work.
            context('Given no entries', () => {
                beforeEach('seed users', () => helpers.seedUsers(db, testUsers));
                it('Responds with 200 and empty list', () => {
                    return supertest(app)
                        .get('/api/entries')
                        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                        .expect(200, []);
                });
            });
            context('Given entries', () => {
                beforeEach('seed entries', () =>
                    helpers.seedEntries(db, testUsers, testEntries)
                );
                it('responds with 200 and all entries the user has in the database', () => {
                    const expectedEntries = testEntries.filter(
                        (entry) => entry.id_user === testUsers[0].id
                    );
                    return supertest(app)
                        .get('/api/entry')
                        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                        .expect(200, expectedEntries);
                });
                it('responds with 400 when user inputs an invalid client_id', () => {
                    return supertest(app)
                        .get('/api/entries?client_id=bad')
                        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                        .expect(400, {error: 'Query string must include a client_id and client_id must be a number'});
                });
                it('responds with 401 when trying to access unauthorized entries by id', () => {
                    return supertest(app)
                        .get('/api/entries?client_id=1')
                        .set('Authorization', helpers.makeAuthHeader(testUsers[1]))
                        .expect(401, { error: 'Unauthorized request'});
                });
            });
        });
            
        describe('POST /api/entry', () => {
            it('creates an entry, responding with 201 and the entry', () => {
                return supertest(app)
                    .post('/api/entry')
                    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .send(newEntry)
                    .expect(201)
                    .expect((res) => {
                        expect(res.body.reflection).to.eql(newEntry.reflection);
                        expect(res.body.mood_pleasant).to.eql(newEntry.mood_pleasant);
                        expect(res.body.mood_energy).to.eql(newEntry.mood_energy);
                    });
            });
        });
            
        describe('GET /api/entry/:entryId', () => {
            it('responds with 401 missing bearer token when no bearer token', () => {
                return supertest(app)
                    .get('/api/entry/123')
                    .expect(401, { error: 'Missing basic token' });
            });

            it('Responds with 401 when no credentials supplied', () => {
                const userNoCreds = { user_name: '', password: '' };
                return supertest(app)
                    .get('/api/entry/123')
                    .set('Authorization', helpers.makeAuthHeader(userNoCreds))
                    .expect(401, { error: 'Unauthorized request' });
            });

            it('Responds with 401 when invalid user_name', () => {
                const userInvalidCreds = { user_name: 'karen', password: 'manager' };
                return supertest(app)
                    .get('/api/entry/123')
                    .set('Authorization', helpers.makeAuthHeader(userInvalidCreds))
                    .expect(401, { error: 'Unauthorized request' });
            });

            context('Given entries', () => {
                beforeEach('seed entries', () =>
                    helpers.seedEntries(db, testUsers, testEntries)
                );
                it('responds with 200 and entry requested', () => {
                    const entryId = specEntry.id;
                    const expectedEntry = testEntries.filter(
                        (entry) => entry.id === entryId
                    );
                    return supertest(app)
                        .get(`/api/entry/${entryId}`)
                        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                        .expect(200, expectedEntry);
                });
            });
        });

        describe('DELETE /api/entry/:entryId', () => {
            it('responds with 401 missing bearer token when no bearer token', () => {
                return supertest(app)
                    .delete('/api/entry/123')
                    .expect(401, { error: 'Missing basic token' });
            });

            it('Responds with 401 when no credentials supplied', () => {
                const userNoCreds = { user_name: '', password: '' };
                return supertest(app)
                    .delete('/api/entry/123')
                    .set('Authorization', helpers.makeAuthHeader(userNoCreds))
                    .expect(401, { error: 'Unauthorized request' });
            });

            it('Responds with 401 when invalid user_name', () => {
                const userInvalidCreds = { user_name: 'karen', password: 'manager' };
                return supertest(app)
                    .delete('/api/entry/123')
                    .set('Authorization', helpers.makeAuthHeader(userInvalidCreds))
                    .expect(401, { error: 'Unauthorized request' });
            });

            context('Given entries', () => {
                beforeEach('seed entries', () =>
                    helpers.seedEntries(db, testUsers, testEntries)
                );
                it('responds with 204', () => {
                    const entryId = specEntry.id;
                    return supertest(app)
                        .delete(`/api/entry/${entryId}`)
                        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                        .expect(204);
                });
            });
        });    
    });
});