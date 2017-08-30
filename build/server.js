"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var auth = require("./helpers/auth");
var company_1 = require("./controller/company");
var customer_1 = require("./controller/customer");
var login_1 = require("./controller/login");
var user_1 = require("./controller/user");
var app = express();
var port = process.env.PORT || '3200';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(auth.initialize());
app.use('/company', company_1.CompanyController);
app.use('/customer', customer_1.CustomerController);
app.use('/login', login_1.LoginController);
app.use('/user', user_1.UserController);
app.listen(port, function () {
    console.log("listen PORT : " + port);
});
//# sourceMappingURL=C:/Users/Administrator/Desktop/express/server.js.map