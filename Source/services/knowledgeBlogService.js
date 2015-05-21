"use strict";

exports.createBlogEntry = function(title, author, content)
{

};

exports.getAllBlogEntries = function()
{

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
