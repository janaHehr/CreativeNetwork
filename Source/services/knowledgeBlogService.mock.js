"use strict";

exports.createBlogEntry = function(title, author, content) {


};


exports.getAllBlogEntries = function()
{
    var mock = [];

    mock.push(
    {
        title: "Ein super langer Titel, der nichts sagend daher kommt und  blubb blubb möglicherweise alle Grenzen sprengt oder auch einfach abgeschnitten oder 'ellipsiert' wird (dann fehlt hat was vom langen Text)",
        author: "Thomas Klepzig",
        content: "Blubberbrause1"
    });
    mock.push(
    {
        title: "Hier haben wir einen etwas längeren Titel, der immer noch hinpasst",
        author: "Thomas Klepzig",
        content: "Blubberbrause2"
    });
    mock.push(
    {
        title: "Was kurzes",
        author: "Thomas Klepzig",
        content: "Blubberbrause3"
    });


    return mock;
};
