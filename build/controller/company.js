"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongodb_1 = require("mongodb");
var myConfig = require("Config");
var mongodb_2 = require("../helpers/mongodb");
var auth = require("../helpers/auth");
var async = require("async");
var config = myConfig.get('Config');
var router = express_1.Router();
router.use(auth.authenticate());
//var mongodb;
router.get('/', auth.authenticate(), function (req, res) {
    mongodb_2.mongodb.collection('company').find().toArray().then(function (result) {
        res.json(result);
    });
    //res.json(mongodb);
});
router.get('/findById/:id', function (req, res) {
    var id = new mongodb_1.ObjectID(req.params.id);
    mongodb_2.mongodb.collection("company").findOne({ _id: id })
        .then(function (data) {
        res.json(data);
    });
});
router.delete('/:id', function (req, res) {
    //var id = new ObjectID(req.params.id);
    var Code = req.params.id;
    mongodb_2.mongodb.collection('company').deleteOne({ code: Code }).then(function (data) {
        res.json({ 'Delete Success': data });
    });
});
router.put('/:id', function (req, res) {
    var id = new mongodb_1.ObjectID(req.params.id);
    var data = req.body;
    // var Code = req.params.id;
    // var company = {
    //     code: "004",
    //     name: "Test CompName #4"
    // };
    mongodb_2.mongodb.collection('company').updateOne({ _id: id }, data).then(function (data) {
        res.json({ 'Update Success': data });
    });
});
router.post('/search', function (req, res) {
    var ret = {
        rows: [],
        total: 0
    };
    var data = req.body;
    mongodb_2.mongodb.collection("company").find({
        name: new RegExp("" + data.name)
    }).skip(data.numPage * data.rowPerPage)
        .limit(data.rowPerPage)
        .toArray().then(function (rows) {
        ret.rows = rows;
        mongodb_2.mongodb.collection("company").find({
            name: new RegExp("" + data.name)
        }).count().then(function (data) {
            ret.total = data;
            res.json(ret);
        });
    });
});
router.post('/find', function (req, res) {
    var data = req.body;
    async.parallel([
        function (callback) {
            mongodb_2.mongodb.collection("company").find({
                name: new RegExp("" + data.searchText)
            }).skip(data.numPage * data.rowPerPage)
                .limit(data.rowPerPage)
                .toArray().then(function (rows) {
                callback(null, rows);
            });
        },
        function (callback) {
            mongodb_2.mongodb.collection("company").find({
                name: new RegExp("" + data.searchText)
            }).count().then(function (data) {
                callback(null, data);
            });
        }
    ], 
    // optional callback
    function (err, results) {
        var ret = {
            rows: results[0],
            total: results[1]
        };
        res.json(ret);
    });
});
mongodb_1.MongoClient.connect(config.mongodbUrl, function (err, db) {
    //console.log(err);
    if (err) {
        console.log(err);
    }
    else {
        _this.mongodb = db;
    }
    //db.collection('company').find().toArray((err, result) => {
    //    if (err) {
    //        console.log(err);
    //    }else{
    //        console.log(result);
    //        mongodb = result;
    //    }
    //});
    //console.log(db.collection("company").find().toArray());  
});
exports.CompanyController = router;
//# sourceMappingURL=C:/Users/Administrator/Desktop/express/controller/company.js.map