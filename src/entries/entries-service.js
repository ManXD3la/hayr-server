/* eslint-disable indent */
const xss = require('xss');
const { v4: uuidv4 } = require('uuid');
const EntriesService = {


    // C
    makeEntry(db, entryInfo) {
        return db('entries')
            .insert({
                id_user: entryInfo.userId,
                reflection: `${entryInfo.userId}`,
                mood_pleasant: entryInfo.mood,
                mmod_energy: entryInfo.reflection
            })
            .returning('*');
    },

    // R
    getAllEntries(db, userId) {
        return db('entries')
            .select('*')
            // .where('share_type','public');
    },

    // getEntrybyId(db, id)
    //     return db
    //         .select('*') //just entry with id
    //         .from('hayr_entries')

    // },
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

    getRandomPublicEntries(db) {
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