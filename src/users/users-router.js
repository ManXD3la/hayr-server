/* eslint-disable indent */
const express = require('express');
const UsersService = require('./users-service');
const { json } = require('express');

const usersRouter = express.Router();
const jsonBodyParser = express.json();

console.log('user');

usersRouter
    .post('/', jsonBodyParser, (req, res, next) => {
        console.log(req.body);
        const {userName, emailAddress, userPassword} =req.body;
        const newAccount = {emailAddress, userPassword};
        const newUserInfo = {userName, emailAddress, userPassword};

        for (const [key, value] of Object.entries(newAccount))
            if (value === null)
                return res.status(400).json({
                    error: `Mising '${key}' in request body`
                });
        
        console.log(newUserInfo);

        UsersService.createUser(
            req.app.get('db'),
            newUserInfo)
        .then(userName => {
            console.log(userName);
            res
                .status(201)
                .json( {userName: userName});
        })
        .catch(console.error);
    });

usersRouter
    .get('/', jsonBodyParser, (req, res, next) => {
        const {user_name, password} =req.body;
        const loginUser = {user_name, password};
        
        for (const [key, value] of Object.entries(loginUser))
            if (value === null)
                return res.status(400).json({
                    error: `Mising '${key}' in request body`
                });
        
        // Auth
        
        res.status(200).send('ok');
    });

usersRouter
    .patch('/', jsonBodyParser, (req, res, next) => {
        const {user_name, password} =req.body;
        const loginUser = {user_name, password};
        
        for (const [key, value] of Object.entries(loginUser))
            if (value === null)
                return res.status(400).json({
                    error: `Mising '${key}' in request body`
                });
        
        // Auth
        
        res.send('ok');
    });

usersRouter
    .delete('/', jsonBodyParser, (req, res, next) => {
        const {user_name, password} =req.body;
        const loginUser = {user_name, password};
        
        for (const [key, value] of Object.entries(loginUser))
            if (value === null)
                return res.status(400).json({
                    error: `Mising '${key}' in request body`
                });
        
        // Auth
        
        res.send('User account deleted');
    });

module.exports = usersRouter;