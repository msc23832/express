import { Router, Request, Response } from 'express';
import { MongoClient, ObjectID } from 'mongodb';
import * as myConfig from 'Config';
import { mongodb } from '../helpers/mongodb';

let config: any = myConfig.get('Config');

const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
    let data = req.body;
     mongodb.collection("user").insertOne(data).then((data) => {
        res.json(data);
     });
});

router.get('/', (req: Request, res: Response) => {
    let data = req.body;
     mongodb.collection("user").find().toArray().then((data) => {
        res.json(data);
     });
});

router.delete('/:id', (req:Request, res:Response) => {
    var id = new ObjectID(req.params.id);
    console.log(req.params.id);
    //var Code = req.body._id;
    console.log(id);
    mongodb.collection('user').deleteOne({_id: id}).then((data) => {
        res.json({ 'Delete Success': data });
    });
});

export const UserController: Router = router;
