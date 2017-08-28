"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var company_1 = require("./controller/company");
var app = express();
var port = process.env.PORT || '3200';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/company', company_1.CompanyController);
app.listen(port, function () {
    console.log("listen PORT : " + port);
});
//# sourceMappingURL=C:/Users/Administrator/Desktop/express/server.js.map