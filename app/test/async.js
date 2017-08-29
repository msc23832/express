"use strict";
exports.__esModule = true;
var async = require("async");
async.waterfall([
    function (callback) {
        callback(null, 'one', 'two');
    },
    function (arg1, arg2, callback) {
        // arg1 now equals 'one' and arg2 now equals 'two'
        callback("Error", 'three');
        console.log(arg1, arg2);
    },
    function (arg1, callback) {
        // arg1 now equals 'three'
        callback(null, 'done');
        console.log(arg1);
    }
], function (err, result) {
    // result now equals 'done'
    console.log('Error : ' + err);
    console.log('Result : ' + result);
});
