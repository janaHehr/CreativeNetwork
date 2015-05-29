var api = require("./api");

module.exports = function(app)
{
    app.post('/api/blog', api.createBlogEntry);
    app.get('/api/blog', api.getAllBlogEntries);
    app.put('/api/blog/:id', api.updateBlogEntry);
    app.delete('/api/blog/:id', api.deleteBlogEntry);
};
