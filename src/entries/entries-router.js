const express = require('express');
const {requireAuth} = require('../middleware/auth');
const EntriesService = require('./entries-service');

const entriesRouter = express.Router();
const jsonBodyParser = express.json();

//res.status(200) = success get & patch
//res.status(204) = success delete
//res.status(404) = unsuccessful not found
//res.status(400) = bad request

entriesRouter.route('/')
    .all(requireAuth)
    .post(jsonBodyParser, (req, res, next) => {
        const {reflection, mood_pleasant, mood_energy} =req.body;
        
        for (const field of ['mood_pleasant','mood_energy'])
            if (!req.body[field])
                return res.status(400).json({
                    error: `Mising '${field}' in request body`
                });
        
        
        const entryInfo = {
            userId: req.user.id,
            reflection,
            mood_pleasant,
            mood_energy};
        console.log('entryInfo into servce:',entryInfo);
        
        EntriesService.makeEntry(req.app.get('db'),
            entryInfo
        )
        .then( newEntryData =>{
            console.log('from make entry service',newEntryData);
        res
            .status(200)
            .json(newEntryData);
        })
        .catch((err) => {
            console.log(err);
            next();
        });
    })

    .get((req, res, next) => {
        // get user_name from token, then userid from user service with user name and save
        EntriesService.getAllUserEntries(req.app.get('db'),
            req.user.id
        )
        .then(entries => {
            res.status(200).json(entries);
        })
        .catch((err) => {
            console.log(err);
            next();
        });
    });

entriesRouter
    .get('/public', requireAuth, (req, res, next) => {
        EntriesService.getRecentPublicEntries(req.app.get('db'))
        .then(entries => {
            res
                .status(200)
                .json(entries);
        
        })
        .catch((err) => {
            console.log(err);
            next();
        });
    });    

    // SECONDARY
    // entriesRouter
    // .get('/:entryId/community', requireAuth, (req, res, next) => {
        // get entry info(id and both moods) set in object
        // run similar entry service to send back 

        // .then(entries => {
            //     res.send('ok');
        // })        
    // });


// for specific entries
entriesRouter.route('/:entryId')
    .all(requireAuth)
    .get((req, res, next) => {
        // service for getting specific entry info
        EntriesService.getSpecEntry(req.app.get('db'),
            req.params.entryId)
            .then( entryInfo => {
                console.log('userInfo from service:',entryInfo);
                // check to see empty userInfo is empty, then send no user exist with code
                if (!entryInfo[0]) {
                    res.status(404).json({error: 'Entry does not exist'});
                }
                else {
                    res.status(200).json(entryInfo);
                }
            })
            //make all catches like below
            .catch((err) => {
                console.log(err);
                next();
            });
    })

    .patch(jsonBodyParser, (req, res, next) => {
        // need to check to see if user requesting patch is owner

        const {user_name, password} =req.body;
        const loginUser = {user_name, password};
        
        for (const [key, value] of Object.entries(loginUser))
            if (value === null)
                return res.status(400).json({
                    error: `Mising '${key}' in request body`
                });
        
        // Auth
        
        res.send('ok');
    })

    .delete((req, res, next) => {
        // need to check to see if user requesting delete is owner
        EntriesService.deleteEntry(req.app.get('db'),
            req.params.entryId)
        .then( entryDeleted => {
            // check to see empty userInfo is empty, then send no user exist with code
            console.log('etnryDeleted number from service:',entryDeleted);
            if (entryDeleted === 1) {
                res.status(204).end();
            }
            else {
                res.status(404).json({error: 'Entry does not exist'});
            }
        })
        //make all catches like below
        .catch((err) => {
            console.log(err);
            next();
        });
    });


module.exports = entriesRouter;