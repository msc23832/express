"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongodb_1 = require("mongodb");
var myConfig = require("Config");
var config = myConfig.get('Config');
var router = express_1.Router();
var mongodb;
router.get('/', function (req, res) {
    mongodb.collection('company').find().toArray().then(function (result) {
        res.json(result);
    });
    //res.json(mongodb);
});
router.post('/', function (req, res) {
    //let data = req.body;  /*  Send Post Data  */
    var company = [{
            code: "004",
            name: "Test CompName #4"
        }, {
            code: "005",
            name: "Test CompName #5"
        }];
    mongodb.collection('company').insertMany(company).then(function (data) {
        res.json(data);
    });
});
router.delete('/:id', function (req, res) {
    //var id = new ObjectID(req.params.id);
    var Code = req.params.id;
    mongodb.collection('company').deleteOne({ code: Code }).then(function (data) {
        res.json({ 'Delete Success': data });
    });
});
router.put('/:id', function (req, res) {
    //var id = new ObjectID(req.params.id);
    var Code = req.params.id;
    var company = {
        code: "004",
        name: "Test CompName #4"
    };
    mongodb.collection('company').updateOne({ code: Code }, company).then(function (data) {
        res.json({ 'Update Success': data });
    });
});
mongodb_1.MongoClient.connect(config.mongodbUrl, function (err, db) {
    //console.log(err);
    if (err) {
        console.log(err);
    }
    else {
        mongodb = db;
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