/* eslint-disable indent */
const xss = require('xss');
const { v4: uuidv4 } = require('uuid');
const EntriesService = {
    // Validations
    validateUserisOwner(db, entryId,userId) {
        return db('entries')
            .where({
                id: entryId,
                id_user: userId})
            .first()
            .then((user) => !!user);
    },


    // C
    makeEntry(db, entryInfo) {
        return db('entries')
            .insert({
                id_user: entryInfo.userId,
                reflection: `${entryInfo.reflection}`,
                mood_pleasant: entryInfo.mood_pleasant,
                mood_energy: entryInfo.mood_energy
            })
            .returning('*');
    },

    // R
    getAllEntries(db) {
        return db('entries')
            .select('*')
            // .where('share_type','public');
    },

    getSpecEntry(db, entryId) {
        return db('entries')
            .select('*')
            .where('id', entryId)
    },

    getAllUserEntries(db, userId) {
        return db('entries')
                .select('*')
                .where('id_user',`${userId}`);
    },

    getUserEntriesMonth(db, month, year) {
        return null;
    },

    // getUserEntriesWeek(db, userId, month, week) {
    //     return null;
    // },

    getSimilarEntries(db, simEntryInfo) {
        return db('entries')
        .select('id','refelction','mood_pleasant','mood_energy')
        .where('id', simEntryInfo.id)
        .where('share_type','public')
        .where('mood_pleasant',[simEntryInfo.mood_pleasant - 25, simEntryInfo.mood_pleasant + 25])
        .where('mood_energy',[simEntryInfo.mood_energy - 25, simEntryInfo.mood_energy + 25])
        .orderby('created','desc')
        .limit(10);
    },

    getRecentPublicEntries(db) {
        return db('entries')
            .select('id','refelction','mood_pleasant','mood_energy')
            .where('share_type','public')
            .orderby('created','desc')
            .limit(30);
    },

    // U
    updateEntry(db, entryId, entryInfo) {
        return null;
    },
    
    // D
    deleteEntry(db, entryId) {
        return db('entries')
            .del()
            .where('id',`${entryId}`);
    },

    serializeEntry(entryInfo) {
        return {
            id: entryInfo.id,
            user_id: entryInfo.id_user,
            date_created: entryInfo.date_created,
            reflection: xss(entryInfo.reflection),
            mood_pleasant: entryInfo.mood_pleasant,
            mood_energy: entryInfo.mood_energy
        };
    }

};

module.exports = EntriesService;