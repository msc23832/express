import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as auth from './helpers/auth';


import { CompanyController } from './controller/company'
import { CustomerController } from './controller/customer'
import { LoginController } from './controller/login'
import { UserController } from './controller/user'

const app: express.Application = express();

const port: string = process.env.PORT || '3200';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(auth.initialize());
app.use('/company', CompanyController);
app.use('/customer', CustomerController);
app.use('/login', LoginController);
app.use('/user', UserController);

app.listen(port, () => {
    console.log(`listen PORT : ${port}` );
});

