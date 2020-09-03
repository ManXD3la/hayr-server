const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Users Endpoints', () => {
    let db;
    const testUsers = helpers.makeTestUsers();
    const testUser = testUsers[0];
    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        });
        app.set('db', db);
    });

    after('disconnect from db', () => db.destroy());
    before('clean table', () => helpers.cleanTables(db));
    afterEach('clean table', () =>helpers.cleanTables(db));

    describe('POST /api/user', () => {
        const reqBody = {
            name: testUser.name,
            user_name: testUser.user_name,
            password: testUser.password,
            email: testUser.email,
        };

        //returns 400 when missing part of the user
        it('400 resposne if user info is missing', () => {
            let userInfoMissReqBody = {
                name: testUser.name,
                user_name: testUser.user_name,
                password: testUser.password,
            };

            return supertest(app)
                .post('/api/user')
                .send(userInfoMissReqBody)
                .expect(400);
        });

        // returns 400 if password isnt' valid
        it('400 response if password is invalid', () => {
            const invalidPasswordReqBody = {
                name: testUser.name,
                user_name: testUser.user_name,
                password: 'password',
                email: testUser.email,
            };
            return supertest(app)
                .post('/api/user')
                .send(invalidPasswordReqBody)
                .expect(400);
        });

        // returns 400 if username exists
        context('Given users in the database', () => {
            before('seed databse with info', () => {
                return helpers.seedUsers(db, testUsers);
            });

            it('400 response if username exists', () => {
                return supertest(app)
                    .post('/api/user')
                    .send(reqBody)
                    .expect(400, {error:'Username already exists'});
            });

            it('400 response if email exists', () => {
                const invalidEmailInReqBody = {
                    name: testUser.name,
                    user_name: 'here-go-testUsername',
                    password: testUser.password,
                    email: testUser.email,
                };
                return supertest(app)
                    .post('/api/user')
                    .send(invalidEmailInReqBody)
                    .expect(400, {error:'User with that email already exists'});
            });
        });

        // returns 200 if is user is and company are inserted
        it('201 response when company info, user info, and valid password is sent', () => {
            return supertest(app)
                .post('/api/user')
                .send(reqBody)
                .expect(200);
        });
    });
});