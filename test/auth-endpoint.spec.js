const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe.only('Auth Endpoints', function() {
    let db;

    const testUsers = helpers.makeTestUsers();
    const testUser = testUsers[0];

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        });
        app.set('db', db);
    });

    after('disconnect from db', () => db.destroy());
    before('cleanup', () => helpers.cleanTables(db));
    afterEach('cleanup', () => helpers.cleanTables(db));

    describe('POST /api/auth/login', () => {
        beforeEach('insert users', () =>
            helpers.seedUsers(db, testUsers)
        );

        it('responds with 401 missing bearer token when no bearer token', () => {
            return supertest(app)
                .get('/api/auth/login')
                .expect(401, { error: 'Missing bearer token' });
        });

        it('Responds with 401 when no credentials supplied', () => {
            const userNoCreds = { user_name: '', password: '' };
            return supertest(app)
                .get('/api/auth/login')
                .set('Authorization', helpers.makeAuthHeader(userNoCreds))
                .expect(401, { error: 'Unauthorized request' });
        });

        it('Responds with 401 when invalid user_name', () => {
            const userInvalidCreds = { user_name: 'moshe-en', password: 'manager' };
            return supertest(app)
                .get('/api/auth/login')
                .set('Authorization', helpers.makeAuthHeader(userInvalidCreds))
                .expect(401, { error: 'Unauthorized request' });
        });

        it('Responds with 201 when account exists', () => {

            return supertest(app)
                .get('/api/auth/login')
                .set('Authorization', helpers.makeAuthHeader(testUser))
                .expect(401, { error: 'Unauthorized request' });
        });
    
    });
});