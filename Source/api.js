"use strict";

var knowledgeBlogService = require("./services/knowledgeBlogService.mock");

exports.createBlogEntry = function(request, response)
{
    var title = request.body.title;
    var author = request.body.author;
    var content = request.body.content;

    knowledgeBlogService.createBlogEntry(title, author, content);

    response.json(
    {
        success: true
    });
};

exports.getAllBlogEntries = function(request, response)
{
    response.json(knowledgeBlogService.getAllBlogEntries());
};
