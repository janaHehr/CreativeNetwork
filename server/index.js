'use strict';

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var socketIo = require('socket.io')(http);


var fs = require('fs-promise');
var auth = require('./auth.json');
var repoPath = path.resolve(__dirname + '/cn-data');
var postsPath = repoPath + '/posts';
var cachedPosts = {};

var repo = require('./repoService.js')(auth, repoPath);
var config = require('./config.json')[process.env.NODE_ENV || 'production'];
var port = process.env.PORT || config.port;
console.log('using ' + config.publicFilePath + ' to serve public files');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use(express.static(path.resolve(__dirname + config.publicFilePath)));
app.get('/*', function(req, res) {
    res.sendFile(path.resolve(__dirname + config.publicFilePath + '/index.html'));
});

function existsFile(file) {
    try {
        fs.statSync(file);
        return true;
    } catch (ex) {
        if (ex.code === 'ENOENT') { //file not found
            return false;
        } else {
            throw ex;
        }
    }
}

function existsDirectory(directory) {
    try {
        fs.statSync(directory).isDirectory();
        return true;
    } catch (ex) {
        if (ex.code === 'ENOENT') { //file not found
            return false;
        } else {
            throw ex;
        }
    }
}

//write cache to file, every 2 minutes
setInterval(function() {
    for (var key in cachedPosts) {
        if (cachedPosts.hasOwnProperty(key)) {
            fs.writeFileSync(postsPath + '/' + key, cachedPosts[key].text);
        }
    }
}, 2 * 60 * 1000);



socketIo.on('connection', function(socket) {
    var clientIp = socket.request.connection.remoteAddress;
    console.log('Client connected:\t' + clientIp);
    socket.on('disconnect', function() {
        console.log('Client disconnected:\t' + clientIp);
    });

    //client functions
    socket.on('getPostList', function(callback) {
        fs.readdir(postsPath).then(function(files) {
            callback(files);
        });
    });

    socket.on('createOrUpdatePost', function(post, callback) {
        var file = postsPath + '/' + post.name;
        if (!existsFile(file)) {
            // TODO: replace spaces from name to dashes?
            fs.writeFile(file, post.text).then(function() {
                callback(post);
                socket.broadcast.emit('postCreatedOrUpdated', post);
            });
        } else {
            cachedPosts[post.name] = post;
            callback(post);
            socket.broadcast.emit('postCreatedOrUpdated', post);
        }
    });

    socket.on('renamePost', function(oldName, newName) {
        fs.rename(postsPath + '/' + oldName, postsPath + '/' + newName).then(function() {
            cachedPosts[newName] = cachedPosts[oldName];
            delete cachedPosts[oldName];
            socket.broadcast.emit('postRenamed', oldName, newName);
        });
    });

    socket.on('commitPost', function(post, callback) {
        var file = postsPath + '/' + post.name;
        fs.writeFileSync(file, post.text);
        delete cachedPosts[post.name];
        repo.commitFile(file).then(repo.push).then(function () {
            callback();
        });
        // TODO: when push?
        socket.broadcast.emit('postCommitted', post);
    });

    socket.on('deletePost', function(name) {
        // TODO: delete from cachedPosts
        // TODO: delete post
        socket.broadcast.emit('postDeleted', name);
    });

    socket.on('getPost', function(name, callback) {
        if (typeof cachedPosts[name] !== 'undefined') {
            callback(cachedPosts[name]);
        } else {
            fs.readFile(postsPath + '/' + name, 'utf8').then(function(text) {
                callback({
                    name: name,
                    text: text
                });
            });
        }
    });
});


//clone data repo if necessary and creating posts directory if no posts exist yet

// TODO: is async, ensure, that no post can be created until cloning is done
if (!existsDirectory(repoPath)) {
    repo.clone().then(function() {
        if (!existsDirectory(postsPath)) {
            fs.mkdirSync(postsPath);
        }
    });
} else if (!existsDirectory(postsPath)) {
    fs.mkdirSync(postsPath);
}

http.listen(port, function() {
    console.log('listening on *:' + port);
});


// app.get('/load', function(request, response) {
//
//     // TODO: pull
//
//     var data = null;
//     try {
//         data = fs.readFileSync(__dirname + '/doc-repo/document', 'utf8');
//     } catch (ex) {
//         if (ex.code === 'ENOENT') { //file not found
//             data = '';
//         } else {
//             throw ex;
//         }
//     }
//
//     response.json(data);
// });
//
// app.post('/apply', function(request, response) {
//     fs.writeFileSync(__dirname + '/doc-repo/document', request.body.text);
//     // git.add(__dirname + '/doc-repo/document')
//     //     .then()
//     //     .commit('edit document')
//     //     .then()
//     //     .push('origin', 'master')
//     //     .then(function() {
//     //         return response.json(true);
//     //     });
// });
