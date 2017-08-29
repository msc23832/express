"use strict";
exports.__esModule = true;
var async = require("async");
async.parallel([
    function (callback) {
        setTimeout(function () {
            console.log('one');
            callback(null, 'one');
        }, 200);
    },
    function (callback) {
        setTimeout(function () {
            console.log('two');
            callback('Error', 'two');
        }, 100);
    }
], 
// optional callback
function (err, results) {
    console.dir('Results : ' + results);
});
