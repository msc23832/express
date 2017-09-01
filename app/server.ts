import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as auth from './helpers/auth';


import { CompanyController } from './controller/postgres/company';
//import { CustomerController } from './controller/postgres/customer';
// import { CustomerController } from './controller/customer';
import { LoginController } from './controller/login';
import { UserController } from './controller/user';
import { IssueController } from './controller/issue';

const app: express.Application = express();

const port: string = process.env.PORT || '3000';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(auth.initialize());
app.use('/company', CompanyController);
//app.use('/customer', CustomerController);
app.use('/login', LoginController);
app.use('/user', UserController);
app.use('/issue', IssueController);

// app.listen(port, () => {
//     console.log(`listen PORT : ${port}` );
// });

// Serve the application at the given port
var server = app.listen(port, () => {
  // Success callback
  console.log(`Listening at http://localhost:${port}/`);
});

/*
* Socket.IO server section 
*/
var io = require('socket.io')(server);
io.on('connection', function (socket) {

  socket.on('hello', function (data) {
    socket.emit('news', "xxxxxx");
  });

  socket.on('add-message', (data) => {
    socket.emit('message', data);
  });

});

