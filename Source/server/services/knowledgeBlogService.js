"use strict";

var nano = require('nano')('https://admin:f7760a334e60@couchdb-ef42ae.smileupps.com');
var db = nano.use('knowledgebase');
//console.log(db);

exports.createBlogEntry = function(entry, callback)
{
    db.insert(entry, null, function(err, body, header)
    {
        if (err)
        {
            callback(err);
            return;
        }
        entry._id = body.id;
        callback(null, entry);
    });
};

exports.deleteBlogEntry = function(id, callback)
{
    //delete only with correct rev
    console.log('start');
    db.destroy(id, function(err)
    {
        console.log('2');
        if (err)
        {
            callback(err);
            return;
        }
        console.log(err);
        callback(null);
    });
};

exports.updateBlogEntry = function(id, entry, callback)
{
    //TODO compare Request ID and id of dataset
    db.get(id, null, function(err, loadedEntry)
    {
        if (err)
        {
            callback(err);
            return;
        }

        loadedEntry.author = entry.author;
        loadedEntry.title = entry.title;
        loadedEntry.content = entry.content;

        //TODO handle revision conflicts?
        db.insert(loadedEntry, id, function(err, body)
        {
            if (err)
                callback(err);
            else
                callback(null, entry);
        })
    });
};

exports.getAllBlogEntries = function(callback)
{
    db.list(
    {
        include_docs: true
    }, function(err, body)
    {
        if (!err)
        {
            callback(body.rows.map(function(row)
            {
                return row.doc;
            }));
        }
    });
};

exports.getBlogEntry = function(id, callback)
{
    db.get(id, function(err, body)
    {
        if (err)
            callback(err);
        else
            callback(body);
    });
};

//CouchDB stuff
//create database
// nano.db.create("test", function(err)
// {
//     console.log(err);
// });

//add document
// db.insert({blubb:42}, "blubb", function (err) {
//     console.log(err);
// });

//update document (_rev is necessary!)
// db.insert({blubb:43, _rev: "1-..."}, "blubb", function (err) {
//     console.log(err);
// });

//get document
// db.get("blubb", function(err, body)
// {
//     console.log(body._rev);
// });
