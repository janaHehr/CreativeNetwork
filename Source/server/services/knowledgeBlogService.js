'use strict';

// var nano = require('nano')('https://creativenetwork.iriscouch.com');
var nano = require('nano')('http://192.168.59.103:5984');
var db;
var dbName = 'knowledgebase';
nano.db.get(dbName,function(err,body){
  if(err){
    console.log('DB does not exist: create new');
    nano.db.create(dbName,function(err,body){
      if(!err){
        console.log('DB created');
         db = nano.use(dbName);
      }
      else{
        console.log('Could not create DB. '+err);
      }
    });
  }
  else{
    console.log('DB exists');
    db = nano.use(dbName);
  }
});



exports.createBlogEntry = function(entry, callback)
{
    db.insert(entry, null, function(err, body)
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

exports.deleteBlogEntry = function(id, callback) {
  //get current rev of dataset
  db.get(id, null, function(err, loadedEntry)
  {
      if (err)
      {
          callback(err);
          return;
      }
    //delete only with correct rev
    db.destroy(id,loadedEntry._rev, function(err)
    {
        if (err)
        {
            callback(err);
            return;
        }

        callback(null);
    });
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
        loadedEntry.tags = entry.tags;

        //TODO handle revision conflicts?
        db.insert(loadedEntry, id, function(err)
        {
            if (err){
                callback(err);
              }
            else {
                callback(null, entry);
              }
        });
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
        if (err) {
            callback(err);
        }
        else {
            callback(body);
        }
    });
};
