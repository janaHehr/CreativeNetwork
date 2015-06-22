'use strict';

var knowledgeBlogService = require('./services/knowledgeBlogService');

exports.createBlogEntry = function(request, response)
{
    var newEntry = request.body;

    knowledgeBlogService.createBlogEntry(newEntry, function(err, entries)
    {
      if(err){
        response.status(err.statusCode).end();
      }
      else {
        response.json(entries);
      }
    });
};

exports.getAllBlogEntries = function(request, response)
{
    knowledgeBlogService.getAllBlogEntries(function(err, entries)
    {
      if(err){
        response.status(err.statusCode).end();
      }
      else {
        response.json(entries);
      }
    });
};

exports.getBlogEntry = function(request, response)
{
    knowledgeBlogService.getBlogEntry(request.params.id, function(err, entry)
    {
      if(err){
        response.status(err.statusCode).end();
      }
      else {
        response.json(entry);
      }
    });
};

exports.updateBlogEntry = function(request, response)
{
    knowledgeBlogService.updateBlogEntry(request.params.id, request.body, function(err, entry)
    {
      if(err){
        response.status(err.statusCode).end();
      }
      else {
        response.json(entry);
      }
    });
};

exports.deleteBlogEntry = function(request, response)
{
    knowledgeBlogService.deleteBlogEntry(request.params.id, function(err)
    {
        if (err) {
            response.status(err.statusCode);
        }
        else {
            response.status(200);
        }
        response.end();
    });
};
