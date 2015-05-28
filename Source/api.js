"use strict";

var knowledgeBlogService = require("./services/knowledgeBlogService");

exports.createBlogEntry = function(request, response)
{
    var newEntry ={};
    newEntry.title = request.body.title || '';
    newEntry.author = request.body.author || '';
    newEntry.content = request.body.content || '';

    knowledgeBlogService.createBlogEntry(newEntry, function(err,entry){
        response.json(entry);
      });
};

exports.getAllBlogEntries = function(request, response)
{
    knowledgeBlogService.getAllBlogEntries(function(entries){
      response.json(entries);
    });
};

exports.updateBlogEntry = function(request, response){
  knowledgeBlogService.updateBlogEntry(request.params.id, request.body, function(err,entry){
      response.json(entry);
    });
};

exports.deleteBlogEntry = function(request, response){
  knowledgeBlogService.deleteBlogEntry(request.params.id, function(err){
    if(err){
      response.status(500);
    }
    else {
      response.status(200);
    }
    response.end();
    });
};
