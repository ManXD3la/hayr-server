/* eslint-disable indent */
const express = require('express');
const {requireAuth} = require('../middleware/auth');
const UsersService = require('./users-service');
const bcrypt = require('bcryptjs');
const { json } = require('express');

const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter
    .post('/', jsonBodyParser, async (req, res, next) => {
        console.log(req.body);
        const {name, user_name, email, password} =req.body;

        
        for (const field of ['user_name', 'email', 'password'])
            if (!req.body[field])
                return res.status(400).json({
            error: `Missing '${field}' in request body`,
        });

        // validate user_name and email is unique/not taken, validate password is secure* 
        try {
            const passwordError = UsersService.validatePassword(password);

            if (passwordError) {
                return res.status(400).json({ error: passwordError });
            }

            const duplicateUserError = await UsersService.validateUser(req.app.get("db"),
                user_name
            );

            if (duplicateUserError) {
                return res.status(400).json({ error: "Username already exists" });
            }

            const emailInDatabase = await UsersService.getUserWithEmail(req.app.get("db"),
                email
            );
            if (emailInDatabase) {
                return res.status(400).json({ error: `User with that email already exists` });
            }

            const newUserInfo = {
                name,
                user_name,
                email,
                password: bcrypt.hashSync(password,10),
                admin_y: false
            };
            
            await UsersService.createUser(
                req.app.get('db'),
                newUserInfo)
            .then(userName => {
                console.log(userName);
                res
                    .status(200)
                    .json(userName);
            })
        }
        catch(err) {
            console.log(err);
            next(err);
        };
    });

    usersRouter
    .get('/', (req, res, next) => {
        UsersService.getAllUserInfo(req.app.get('db'))
        .then( users => {
            res.status(200).json(users)
        })
        .catch((err) => {
            console.log(err);
            next();
        });
    });


usersRouter.route('/:user_name')
    .all(requireAuth)
    .get((req, res, next) => {
    // check if user requesting info is same user
        const {user_name} =req.params;
        
        // service for getting singular user info
        UsersService.getUserInfo(req.app.get('db'),
        req.params.user_name)
        .then( userInfo => {
            // check to see empty userInfo is empty, then send no user exist with code
            console.log('userInfo from service:',userInfo[0]);
            res.status(200).json(userInfo);
        })
        //make all catches like below
        .catch((err) => {
            console.log(err);
            next();
        });
    })

    // .patch(jsonBodyParser, (req, res, next) => {
    //     const {user_name, password} =req.body;
    //     const loginUser = {user_name, password};
        
    //     for (const [key, value] of Object.entries(loginUser))
    //         if (value === null)
    //             return res.status(400).json({
    //                 error: `Mising '${key}' in request body`
    //             });
        
    //     // Auth
        
    //     res.send('ok');
    // })

    .delete((req, res, next) => {
        //check if user requesting delete is same user deleting
        UsersService.deleteUser(req.app.get('db'),
            req.params.user_name)
        .then( userDeleted => {
            // check to see empty userInfo is empty, then send no user exist with code
            console.log('userDeleted number from service:',userDeleted);
            if (userDeleted === 1) {
                res.status(204).end();
            }
            else {
                res.status(404).json({error: `User ${req.params.user_name} does not exist`})
            }
        })
        //make all catches like below
        .catch((err) => {
            console.log(err);
            next();
        });
    });

module.exports = usersRouter;