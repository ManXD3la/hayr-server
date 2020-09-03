const express = require('express');
const {requireAuth} = require('../middleware/auth');


const authRouter = express.Router();


authRouter
    .post('/login', requireAuth, (req, res) => {
        res.status(201).send('ok');
        
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
        // .catch((err) => {
        //     console.log(err);
        //     next();
        // });
    });

module.exports = authRouter;