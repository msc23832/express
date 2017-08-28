import { Router, Request, Response } from 'express';
import { MongoClient, ObjectID } from 'mongodb';
import * as myConfig from 'Config';
import { mongodb } from '../helpers/mongodb';
import * as auth from '../helpers/auth';

let config:any = myConfig.get('Config');


const router: Router = Router();

//router.use(auth.authenticate());

//var mongodb;

router.get('/', auth.authenticate(), (req: Request, res: Response) => {
    mongodb.collection('company').find().toArray().then((result) => {
        res.json(result);
    });
    //res.json(mongodb);
});

router.post('/', (req: Request, res: Response) => {

    //let data = req.body;  /*  Send Post Data  */

    var company = [{
        code: "004",
        name: "Test CompName #4"
    }, {
        code: "005",
        name: "Test CompName #5"
    }];
    
    mongodb.collection('company').insertMany(company).then((data) => {
        res.json(data);
    });
});

router.delete('/:id', (req:Request, res:Response) => {
    //var id = new ObjectID(req.params.id);
    var Code = req.params.id;
    mongodb.collection('company').deleteOne({code: Code}).then((data) => {
        res.json({ 'Delete Success': data });
    });
});

router.put('/:id', (req: Request, res: Response) => {

    //var id = new ObjectID(req.params.id);
    var Code = req.params.id;

    var company = {
        code: "004",
        name: "Test CompName #4"
    };
    
    mongodb.collection('company').updateOne({code: Code}, company).then((data) => {
        res.json({ 'Update Success': data });
    });
});

MongoClient.connect(config.mongodbUrl, (err, db) => {
    //console.log(err);
        if (err) {
            console.log(err);
        }else{
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