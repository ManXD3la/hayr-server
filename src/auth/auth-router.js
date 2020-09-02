const express = require('express');
const AuthService = require('./Authservice');
const {requireAuth} = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const { json } = require('express');

const authRouter = express.Router();
const jsonBodyParser = express.json();


authRouter
    .post('/', requireAuth, jsonBodyParser, (req, res, next) => {
        console.log('all user info to share', req.user)
        res.send('ok')
        .then (() =>
        console.log('all user info to share', req.user)
        )
        
        // const { user_name, password} = req.body;
        // const loginUser = { user_name, password};

        // for (const [key, value] of Object.entries(loginUser))
        //     if (value == null)
        //         return res.status(400).json({
        //             error: `Missing '${key}' in request body`
        //         })
        
        // AuthService.getUserWithUserName( req.app.get('db'),
        //     loginUser.user_name
        // )
        //     .then( dbUser => {
        //         if (!dbUser)
        //             return res.status(400).json({
        //                 error: 'Incorrect user name or password'
        //             })
        //         return AuthService.comaparePasswords(loginUser.password, dbUser.password)
        //             .then(compareSame => {
        //                 if (!compareSame)
        //                     return res.status(400).json({
        //                         error: 'Incorrect user name or password',
        //                     })
        //                 res.send('Login success');
        //             })
        //     })
            .catch((err) => {
                console.log(err);
                next();
            });
    });

module.exports = authRouter;