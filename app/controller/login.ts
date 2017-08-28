import { Router, Request, Response } from 'express';
import { MongoClient, ObjectID } from 'mongodb';
import * as myConfig from 'Config';
import { mongodb } from '../helpers/mongodb';

let config: any = myConfig.get('Config');
var jwt = require("jwt-simple");

const router: Router = Router();

router.post('/doLogin', function (req, res) {
    if (req.body.email && req.body.password) {
        let data = req.body;
        mongodb.collection("user").findOne({
            email: data.email,
            password: data.password
        }).then((results) => {
            var userInfo = results;
            if (userInfo) {
                var token = jwt.encode(userInfo, config.auth.jwtSecret);
                res.json({
                    success : true,
                    token: token
                });
            }else{
                res.json({
                    success : false,
                    message : 'Login fail.'
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