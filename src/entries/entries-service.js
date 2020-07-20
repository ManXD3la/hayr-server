/* eslint-disable indent */
const { v4: uuidv4 } = require('uuid');
const EntriesService = {


    // C
    makeEntry(db, entryInfo) {
        return db('hayr_entries')
            .insert({
                id: `${uuidv4}`,
                user_created: `${entryInfo.userId}`,
                mood: `${entryInfo.mood}`,
                reflection: `${entryInfo.reflection}`,
                share_type: `${entryInfo.shareType}`

            });
    },

    // R
    // getAllUserEntries(db, userId) {
    //     return null;
    // },

    // getEntrybyId(db, id)
    //     return db
    //         .select('*') //just entry with id
    //         .from('hayr_entries')

    // },
    getAllEntries(db) {
        return db
                .select('*')
                .from('hayr_entries')

    },

    getUserEntriesMonth(db, month, year) {
        return null;
    },

    // getUserEntriesWeek(db) {
    //     return null;
    // },

    getSimilarEntries(db, entryId) {
        return null;
    },

    getRandomPublicEntries(db) {
        return db
            .from('hayr_entries')
            .select('created','mood','reflection')
            .where({
              share_type: 'public'
            })
            .orderby('created','desc') //may need to be reveresed
            
            
            .then(data => {
              console.log(data);
            });
    },

    // U
    updateEntry(db, entryId, entryInfo) {
        return null;
    },
    
    // D
    deleteEntry(db, entryId) {
        return db
            .from('hayr_entries')
            .where('id',`${entryId}`);
    },

    // serializeComment(comment) {
    //     const { user } = comment
    //     return {
    //       id: comment.id,
    //       text: xss(comment.text),
    //       article_id: comment.article_id,
    //       date_created: new Date(comment.date_created),
    //       user: {
    //         id: user.id,
    //         user_name: user.user_name,
    //         full_name: user.full_name,
    //         nickname: user.nickname,
    //         date_created: new Date(user.date_created),
    //         date_modified: new Date(user.date_modified) || null
    //       },
    //     }
    //   }

};

module.exports = EntriesService;