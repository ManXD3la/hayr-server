/* eslint-disable indent */
const express = require('express');
const {requireAuth} = require('../middleware/auth');
const UsersService = require('./users-service');
const { json } = require('express');

const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter
    .post('/', jsonBodyParser, (req, res) => {
        console.log(req.body);
        const {name, user_name, email, password} =req.body;

        
        for (const field of ['user_name', 'password', 'email'])
            if (!req.body[field])
                return res.status(400).json({
            error: `Missing '${field}' in request body`,
        });
        
        const newUserInfo = {
            name,
            user_name,
            email,
            password,
            admin_y: false
        };
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
    .get('/',jsonBodyParser, (req, res, next) => {
    // .get('/', requireAuth,jsonBodyParser, (req, res, next) => {
        const {userName} =req.body;
        ;
        
        for (const [key, value] of Object.entries(loginUser))
            if (value === null)
                return res.status(400).json({
                    error: `Mising '${key}' in request body`
                });
        
        // Auth
        
        res.status(200).send('ok');
    });

usersRouter
    .patch('/', requireAuth, jsonBodyParser, (req, res, next) => {
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
    .delete('/', requireAuth, jsonBodyParser, (req, res, next) => {
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