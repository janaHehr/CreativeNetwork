'use strict';

module.exports = function(auth, repoPath) {

    var module = {};

    var Git = require('nodegit');

    module.clone = function() {
        return Git.Clone('https://github.com/cn-data/cn-data.git', repoPath);
    };

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

    module.push = function() {
        var repo;

        return Git.Repository.open(repoPath)
            .then(function(r) {
                repo = r;
                return repo.getRemote('origin');
            }).then(function(remote) {
                return remote.push(['refs/heads/master:refs/heads/master'], {
                    callbacks: {
                        credentials: function() {
                            return Git.Cred.userpassPlaintextNew(auth.username, auth.password);
                        }
                    }
                });
            }).then(function() {
                console.log('remote Pushed!');
            })
            .catch(function(reason) {
                console.log(reason);
            });
    };

    module.commitFile = function(filePath) {
        var repo, oid;

        return Git.Repository.open(repoPath)
            .then(function(r) {
                repo = r;
                return repo.openIndex();
            })
            .then(function(index) {
                filePath = filePath.replace(repoPath, '');
                if (filePath.charAt(0) === '/') {
                    filePath = filePath.substr(1);
                }

                index.addByPath(filePath);
                index.write();
                return index.writeTree();

            }).then(function(oidResult) {

                oid = oidResult;
                return Git.Reference.nameToId(repo, 'HEAD');

            }).then(function(head) {

                return repo.getCommit(head);

            }).then(function(parent) {

                var author = Git.Signature.now('Dev-Author', 'author@email.com');
                var committer = Git.Signature.now('Dev-Commiter', 'commiter@email.com');

                return repo.createCommit('HEAD', author, committer, 'dev dummy commit', oid, [parent]);
            }).then(function(commitId) {
                return console.log('New Commit: ', commitId);
            })
            .catch(function(reason) {
                console.log(reason);
            });
    };

    return module;
};
