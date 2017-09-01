"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var auth = require("./helpers/auth");
var company_1 = require("./controller/postgres/company");
//import { CustomerController } from './controller/postgres/customer';
// import { CustomerController } from './controller/customer';
var login_1 = require("./controller/login");
var user_1 = require("./controller/user");
var issue_1 = require("./controller/issue");
var app = express();
var port = process.env.PORT || '3000';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(auth.initialize());
app.use('/company', company_1.CompanyController);
//app.use('/customer', CustomerController);
app.use('/login', login_1.LoginController);
app.use('/user', user_1.UserController);
app.use('/issue', issue_1.IssueController);
// app.listen(port, () => {
//     console.log(`listen PORT : ${port}` );
// });
// Serve the application at the given port
var server = app.listen(port, function () {
    // Success callback
    console.log("Listening at http://localhost:" + port + "/");
});
/*
* Socket.IO server section
*/
var io = require('socket.io')(server);
io.on('connection', function (socket) {
    socket.on('hello', function (data) {
        socket.emit('news', "xxxxxx");
    });
    socket.on('add-message', function (data) {
        socket.emit('message', data);
    });
});
//# sourceMappingURL=C:/Users/Administrator/Desktop/express/server.js.map