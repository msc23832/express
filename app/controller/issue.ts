import { Router, Request, Response } from 'express';
import { MongoClient, ObjectID } from 'mongodb';
import * as myConfig from 'Config';
import { mongodb } from '../helpers/mongodb';
import * as auth from '../helpers/auth';
import * as shortid from 'shortid';
import * as multer from 'multer';
import * as fs from 'fs';
var nodemailer = require("nodemailer");


let config: any = myConfig.get('Config');
const router: Router = Router();
//router.use(auth.authenticate());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = config.uploadPath + req.params.folderName;
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

var upload = multer({
    storage: storage
});

router.post('/attach/:folderName', upload.single('attach'), (req: Request, res: Response) => {
    res.json({
        success: true
    });
})

router.post('/attach/remove/:folderName', (req: Request, res: Response) => {
    let folder = config.uploadPath + req.params.folderName;
    fs.unlink(`${folder}/${req.body}`, (err) => {
        if (err) {
            res.json(err);
        } else {
            res.json('File is remove Success');
        }
    });

});

router.post('/send', function (req, res) {
    var smtpTransport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secure: true,
        port: 465, 
        auth: {
            user: 'xonyfirst1@gmail.com',
            pass: 'Rata2810'
        }
    });

    var mailOptions = {
        from: 'xonyfirst1@gmail.com' + "<arnomainf@arnoma.com>", // sender address
        to: `sivaccha@metrosystems.co.th`, // list of receivers
        subject: 'Get this responsive email template',//req.body.subject, // Subject line
        html: `Hello`
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {
        smtpTransport.close();
        if (error) {
            console.log(error);
            res.json(error.message);
        } else {
            console.log("Email has been sent successfully");
            res.json(response);
        }
    });
});

router.get('/attach/:folderName', (req: Request, res: Response) => {
    let folder = config.uploadPath + req.params.folderName;
    if (fs.existsSync(folder)) {
        fs.readdir(folder, (err, files) => {
            res.json(files);
        });
    } else {
        res.json([]);
    }

})

router.get('/view-attach/:folderName/:fileName', (req: Request, res: Response) => {
    fs.readFile(`${config.uploadPath}${req.params.folderName}/${req.params.fileName}`, (err, data) => {
        if (!err) {
            res.write(data);
            res.end();
        } else {
            res.end();
        }
    });
})

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
    data.no = shortid.generate();
    mongodb.collection("issue").insertOne(data).then((data) => {
        console.log(data.ops[0]);
        res.json(data.ops[0]);
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



MongoClient.connect(config.mongodbUrl, (err, db) => {
    //console.log(err);
    if (err) {
        console.log(err);
    } else {
        this.mongodb = db;
    }
});

export const IssueController: Router = router;