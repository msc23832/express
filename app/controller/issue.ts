import { Router, Request, Response } from 'express';
import { MongoClient, ObjectID } from 'mongodb';


const router: Router = Router();
var mongodb;

router.get('/', (req: Request, res: Response) => {
    mongodb.collection("issue").find().toArray().then((data) => {  // find ได้ค่ามาเป็น Array
        res.json(data);
    });
});

router.get('/findById/:id', (req: Request, res: Response) => {
    let id = new ObjectID(req.params.id);
    mongodb.collection("issue").findOne({ _id: id }) // findone การหามา 1 object ( _id: id = where )
        .then((data) => {
            res.json(data);
        });
});

router.post('/', (req: Request, res: Response) => {   //insert
    let data = req.body;
    mongodb.collection("issue").insertOne(data).then((data) => {
        res.json(data);
    });
});

router.delete('/:id', (req: Request, res: Response) => {  //delete
    let id = new ObjectID(req.params.id);
    mongodb.collection("issue").deleteOne({ _id: id }).then((data) => {
        res.json(data);
    });
});

router.put('/:id', (req: Request, res: Response) => {  //update
    let id = new ObjectID(req.params.id);
    let data = req.body;
    mongodb.collection("issue").updateOne({ _id: id }, data).then((data) => {
        res.json(data);
    });
});


router.post('/search', (req: Request, res: Response) => {   //insert
    let ret = {
        rows: [],
        total: 0
    }
    let data = req.body;
    mongodb.collection("issue").find({

        issueCode: new RegExp(`${data.searchText}`)

    }).skip(data.numPage * data.rowPerPage)
        .limit(data.rowPerPage)
        .toArray().then((rows) => {
            ret.rows = rows;
            mongodb.collection("issue").find({

                issueCode: new RegExp(`${data.searchText}`)

            }).count()
                .then((data) => {
                    ret.total = data;
                    res.json(ret);
                });
        });
});



MongoClient.connect(
    "mongodb://localhost:27017/issuedb", (err, db) => {
        if (err) {
            console.log(err);
        } else {
            mongodb = db;
        }
    });

export const IssueController: Router = router;