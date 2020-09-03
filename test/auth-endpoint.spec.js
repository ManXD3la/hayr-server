const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Auth Endpoints', function() {
    let db;

    
    before('make knex instance', () => {
        db = helpers.makeKnexInstance();
    });
    
    after('disconnect from db', () => db.destroy());
    before('cleanup', () => helpers.cleanTables(db));
    afterEach('cleanup', () => helpers.cleanTables(db));

    const testUsers = helpers.makeTestUsers();
    const testUser = testUsers[0];
    
    describe('POST /api/auth/login', () => {
        beforeEach('insert users', () =>
            helpers.seedUsers(db, testUsers)
        );

        it.skip('responds with 401 missing bearer token when no bearer token', () => {
            return supertest(app)
                .post('/api/auth/login')
                .expect(401, { error: 'Missing basic token' });
        });

        // it('Responds with 401 when no credentials supplied', () => {
        //     const userNoCreds = { user_name: '', password: '' };
        //     return supertest(app)
        //         .post('/api/auth/login')
        //         .set('Authorization', helpers.makeAuthHeader(userNoCreds))
        //         .expect(401, { error: 'Unauthorized request' });
        // });

        it.skip('Responds with 401 when invalid user_name', () => {
            const userInvalidCreds = { user_name: 'moshe-en', password: 'manager' };
            return supertest(app)
                .post('/api/auth/login')
                .set('Authorization', helpers.makeAuthHeader(userInvalidCreds))
                .expect(401, { error: 'Unauthorized request' });
        });

        it.skip('Responds with 201 when account exists', () => {

            return supertest(app)
                .post('/api/auth/login')
                .set('Authorization', helpers.makeAuthHeader(testUser))
                .expect(401, { error: 'Unauthorized request' });
        });
    
    });
});