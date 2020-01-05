const Wiki = require("./models").Wiki;
const User = require("./models").User;
const Authorizer = require("../policies/wiki");

module.exports = {

    getWiki(id, callback) {
        return Wiki.findById(id)
            .then((wiki) => {
                callback(null, wiki)
            })
            .catch((err) => {
                callback(err);
            })
    },

    getWikisByUserId(id, callback) {
        console.log("In wiki queries getWikisByUserId fxn") 
        return Wiki.findAll({
            where: {
                userId: id
            }
        })
        .then((wiki) => {
            console.log("In wiki queries getWikisByUserId fxn, then block")
            callback(null, wiki)
        })
        .catch((err) => {
            console.log("In wiki queries getWikisByUserId fxn, catch block")
            callback(err);
        })
    },

    getAllWikis(callback) {
        console.log("In getAllWikis ")
        return Wiki.all()
            .then((wikis) => {
                callback(null, wikis);
            })
            .catch((err) => {
                callback(err);
            })
    },

    addWiki(newWiki, callback) {
        return Wiki.create({
                title: newWiki.title,
                body: newWiki.body,
                userId: newWiki.userId,
                private: newWiki.private
            })
            .then((wiki) => {
                callback(null, wiki);
            })
            .catch((err) => {
                callback(err);
            })
    },

    deleteWiki(id, callback) {

        return Wiki.destroy({
                where: { id }
            })
            .then((deletedRecordsCount) => {
                callback(null, deletedRecordsCount)
            })
            .catch((err) => {
                callback(err);
            })
    },

    updateWiki(id, updatedWiki, callback) {

        return Wiki.findById(id)
            .then((wiki) => {
                if (!wiki) {
                    return callback("Wiki not found");
                }
                wiki.update(updatedWiki, {
                        fields: Object.keys(updatedWiki)
                    })
                    .then(() => {
                        callback(null, wiki);
                    })
                    .catch((err) => {
                        callback(err);
                    });
            });
    },
}