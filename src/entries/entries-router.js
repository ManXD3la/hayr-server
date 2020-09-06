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
                    error: `Missing '${field}' in request body`
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
entriesRouter
    .get('/:entryId/community', requireAuth, (req, res, next) => {
        EntriesService.getSimilarEntries(req.app.get('db'),
            req.params.entryId)
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
        EntriesService.validateUserisOwner(req.app.get('db'), req.params.entryId, req.user.id)
            .then(UserOwner => {
                console.log('userOnwer?',UserOwner);
                if (UserOwner) {
                    console.log('into userOwner', UserOwner);
                    EntriesService.getSpecUserEntry(req.app.get('db'),
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
                        .catch((err) => {
                            console.log(err);
                            next();
                        })
                }
                else  {
                    EntriesService.getSpecCommunityEntry(req.app.get('db'),
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
                        .catch((err) => {
                            console.log(err);
                            next();
                        })
                }
            })
    })

    .patch(jsonBodyParser, (req, res, next) => {
        // need to check to see if user requesting patch is owner
        EntriesService.validateUserisOwner(req.app.get('db'), req.params.entryId, req.user.id)
            .then(UserOwner => {
                if (UserOwner) {

                    for (const field of ['entry_share'])
                    if (!req.body[field])
                        return res.status(400).json({
                            error: 'Missing new share type in request body'
                        });

                    const {entry_share} =req.body;
                    EntriesService.updateEntryShare(req.app.get('db'),
                        req.params.entryId,
                        entry_share)
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
                }
                else {
                    res.status(404).json({error: 'Unauthorized request by user'});
                }
            });
    })

    .delete((req, res, next) => {
        // need to check to see if user requesting delete is owner
        EntriesService.validateUserisOwner(req.app.get('db'), req.params.entryId, req.user.id)
            .then(UserOwner => {
                if (UserOwner) {
                    EntriesService.deleteEntry(req.app.get('db'),
                        req.params.entryId)
                        .then( entryDeleted => {
                            // check to see empty userInfo is empty, then send no user exist with code
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
                }
                else {
                    res.status(404).json({error: 'Unauthorized request by user'});
                }
            });
    });

module.exports = entriesRouter;