import { Router, Request, Response } from 'express';
import { MongoClient, ObjectID } from 'mongodb';
import * as myConfig from 'Config';
import { mongodb } from '../helpers/mongodb';

let config: any = myConfig.get('Config');
var jwt = require("jwt-simple");

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    if (req.body.email && req.body.password) {
        let data = req.body;
        mongodb.collection("user").find({
            email: data.email,
            password: data.password
        }).then((results) => {
            var userInfo = results;
            if (userInfo) {
                var token = jwt.encode(userInfo, config.auth.jwtSecret);
                res.json({
                    success: false,
                    message: 'Login fail.'
                });
            }
        }).catch((err) => {
            res.sendStatus(401);
        });
    } else {
        res.sendStatus(401);
    }
});

export const LoginController: Router = router;