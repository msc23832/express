import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import { CompanyController } from './controller/company'

const app: express.Application = express();

const port: string = process.env.PORT || '3200';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/company', CompanyController);

app.listen(port, () => {
    console.log(`listen PORT : ${port}` );
});

