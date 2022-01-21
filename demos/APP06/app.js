const path = require("path");
require("dotenv").config();
require("./api/data/db");
const express=require("express");

const app = express();

const routes = require('./api/routes');
const req = require("express/lib/request");

app.use(function(req,res,next){
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", function(req, res, next){
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use("/api", routes);

const server=app.listen(process.env.PORT, function(){
    const port = server.address().port;
    console.log("listening on port"+port);
});


