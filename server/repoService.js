// 'use strict';
//
// var Git = require('nodegit');
// // TODO: use advanced file system handling, e.g. fs-extra
// var fs = require('fs');
// var auth = require('./auth.json');
// var repoPath = __dirname + '/cn-data';
// var documentFile = __dirname + '/cn-data/document-dev';
//
// function clone() {
//     // TODO: check, if repo is already there and not empty
//
//     // if (fs.readdirSync(repoPath).length === 0) {
//     return Git.Clone('https://github.com/cn-data/cn-data.git', repoPath);
//     // }
// }
//
// function pull() {
//     var repo;
//
//     return Git.Repository.open(repoPath).then(function(r) {
//             repo = r;
//             return repo.fetchAll();
//         }).then(function() {
//             return repo.mergeBranches('master', 'origin/master');
//         })
//         /*.then(function(index) {
//                 if (index.hasConflicts()) {
//                     console.log('Conflict time!');
//                 }
//             })*/
//         .catch(function(reason) {
//             console.log(reason);
//         });
// }
//
// // function push() {
// //     var repo;
// //
// //     return Git.Repository.open(repoPath)
// //         .then(function(r) {
// //             repo = r;
// //             return repo.getRemote('origin');
// //         }).then(function(remote) {
// //             return remote.push(['refs/heads/master:refs/heads/master'], {
// //                 callbacks: {
// //                     credentials: function() {
// //                         return Git.Cred.userpassPlaintextNew(auth.username, auth.password);
// //                     }
// //                 }
// //             });
// //         }).then(function() {
// //             console.log('remote Pushed!');
// //         })
// //         .catch(function(reason) {
// //             console.log(reason);
// //         });
// // }
//
// function addCommit() {
//     var repo, oid;
//
//
//     return Git.Repository.open(repoPath)
//         .then(function(r) {
//             repo = r;
//             return repo.openIndex();
//         })
//         .then(function(index) {
//             index.addByPath('document-dev');
//             index.write();
//             return index.writeTree();
//
//         }).then(function(oidResult) {
//
//             oid = oidResult;
//             return Git.Reference.nameToId(repo, 'HEAD');
//
//         }).then(function(head) {
//
//             return repo.getCommit(head);
//
//         }).then(function(parent) {
//
//             var author = Git.Signature.now('Dev-Author', 'author@email.com');
//             var committer = Git.Signature.now('Dev-Commiter', 'commiter@email.com');
//
//             return repo.createCommit('HEAD', author, committer, 'dev dummy commit', oid, [parent]);
//         }).then(function(commitId) {
//             return console.log('New Commit: ', commitId);
//         })
//         .catch(function(reason) {
//             console.log(reason);
//         });
// }
//
// clone().then(addCommit).then(pull).then(push);
