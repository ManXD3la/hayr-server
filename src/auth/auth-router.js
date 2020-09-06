const express = require('express');
const {requireAuth} = require('../middleware/auth');


const authRouter = express.Router();


authRouter
    .post('/login', requireAuth, (req, res) => {
        res.status(201).send('ok');
        
    });

module.exports = authRouter;