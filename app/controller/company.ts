import { Router, Request, Response } from 'express';
import { MongoClient, ObjectID } from 'mongodb';
import * as myConfig from 'Config';
import { mongodb } from '../helpers/mongodb';
import * as auth from '../helpers/auth';
import * as async from 'async';

let config: any = myConfig.get('Config');


const router: Router = Router();

router.use(auth.authenticate());

//var mongodb;

router.get('/', auth.authenticate(), (req: Request, res: Response) => {
    mongodb.collection('company').find().toArray().then((result) => {
        res.json(result);
    });
    //res.json(mongodb);
});

router.get('/findById/:id', (req: Request, res: Response) => {
    let id = new ObjectID(req.params.id);
    mongodb.collection("company").findOne({ _id: id })
        .then((data) => {
            res.json(data);
        }
        );
});

router.delete('/:id', (req: Request, res: Response) => {
    //var id = new ObjectID(req.params.id);
    var Code = req.params.id;
    mongodb.collection('company').deleteOne({ code: Code }).then((data) => {
        res.json({ 'Delete Success': data });
    });
});

router.put('/:id', (req: Request, res: Response) => {

    let id = new ObjectID(req.params.id);
    let data = req.body;
    // var Code = req.params.id;

    // var company = {
    //     code: "004",
    //     name: "Test CompName #4"
    // };

    mongodb.collection('company').updateOne({ _id: id }, data).then((data) => {
        res.json({ 'Update Success': data });
    });
});

router.post('/search', (req: Request, res: Response) => {
    let ret = {
        rows: [],
        total: 0
    };
    let data = req.body;
    mongodb.collection("company").find(
        {
            name: new RegExp(`${data.name}`)
        }
    ).skip(data.numPage * data.rowPerPage)
        .limit(data.rowPerPage)
        .toArray().then((rows) => {
            ret.rows = rows;
            mongodb.collection("company").find(
                {
                    name: new RegExp(`${data.name}`)
                }
            ).count().then((data) => {
                ret.total = data;
                res.json(ret);
            })
        });
});

router.post('/find', (req: Request, res: Response) => {

    let data = req.body;

    async.parallel([
        function (callback) {
            mongodb.collection("company").find({
                name: new RegExp(`${data.searchText}`)
            }).skip(data.numPage * data.rowPerPage)
                .limit(data.rowPerPage)
                .toArray().then((rows) => {
                    callback(null, rows);
                })
        },
        function (callback) {
            mongodb.collection("company").find({
                name: new RegExp(`${data.searchText}`)
            }).count().then((data) => {
                callback(null, data);
            })
        }
    ],
        // optional callback
        function (err, results) {
            let ret = {
                rows: results[0],
                total: results[1]
            };
            res.json(ret);
        });
});

MongoClient.connect(config.mongodbUrl, (err, db) => {
    //console.log(err);
    if (err) {
        console.log(err);
    } else {
        this.mongodb = db;
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

export const CompanyController: Router = router;