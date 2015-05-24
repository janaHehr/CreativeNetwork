var api = require("./api");

module.exports = function(app)
{
    app.post('/api/create_blogEntry', api.createBlogEntry);
    app.get('/api/blogEntries', api.getAllBlogEntries);
};
