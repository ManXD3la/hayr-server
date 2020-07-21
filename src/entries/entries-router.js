const express = require('express');
const {requireAuth} = require('../middleware/auth');
const EntriesService = require('./entries-service');

const entriesRouter = express.Router();
const jsonBodyParser = express.json();

//res.status(200) = success get & patch
//res.status(201) = success post
//res.status(204) = success delete
//res.status(404) = unsuccessful not found
//res.status(400) = bad request

entriesRouter
    .post('/', jsonBodyParser, (req, res, next) => {
        const {userId, mood, reflection, shareType} =req.body;
        const entryInfo = {userId, mood, reflection, shareType};
        
        for (const [key, value] of Object.entries(entryInfo))
            if (value === null)
                return res.status(400).json({
                    error: `Mising '${key}' in request body`
                });
        
        // Auth
        EntriesService.makEntry(
            req.app.get('db'),
            entryInfo
        );
        
        res
            .status(201)
            .send('EntryCreated');
    });

    //for all entries
entriesRouter
    .get('/',requireAuth,(req, res, next) => {
        EntriesService.getAllEntries(req.app.get('db'))


        .then(entries => {
            res
                .status(200)
                .send('hello')
                .json( {entries: entries});
        
        })
        .catch(console.error)
    });

    //for specific entries
// entriesRouter
//     .get('/', jsonBodyParser, (req, res, next) => {

//         const { entryId } = req.query
//         const {user_name, password} =req.body;
//         const loginUser = {user_name, password};
//
//          //find pull entry data, if entry owner doesnt match user, retrun 403 permission denied
//         
//         for (const [key, value] of Object.entries(loginUser))
//             if (value === null)
//                 return res.status(400).json({
//                     error: `Mising '${key}' in request body`
//                 });
        
//         // Auth
        
//         res.send('ok');
//     });

entriesRouter
    .get('/public', jsonBodyParser, (req, res, next) => {
        for (const [key, value] of Object.entries(loginUser))
            if (value === null)
                return res.status(400).json({
                    error: `Mising '${key}' in request body`
                });
        
        // Auth
        
        res.send('ok');
    });


    // SECONDARY
entriesRouter
    .get('/like-entry', jsonBodyParser, (req, res, next) => {
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


entriesRouter
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

entriesRouter
    .delete('/', jsonBodyParser, (req, res, next) => {
        const {user_name, password} =req.body;
        const loginUser = {user_name, password};
        
        for (const [key, value] of Object.entries(loginUser))
            if (value === null)
                return res.status(400).json({
                    error: `Mising '${key}' in request body`
                });
        
        // Auth
        
        res.send('Entry dated __/__/__ xx:xx:xx deleted');
    });



module.exports = entriesRouter;