"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AufgabeA = void 0;
const Http = require("http");
const Url = require("url"); //url kommt mit request
const Mongo = require("mongodb");
var AufgabeA;
(function (AufgabeA) {
    let ausgewählt;
    let port = process.env.PORT; //port anlegen
    if (port == undefined) { //just in case
        port = 8000;
    }
    startServer(port);
    let dbUrl = "";
    //local oder remote
    let args = process.argv.slice(2);
    if (args[0] == "local")
        dbUrl = "mongodb://localhost:27017";
    else // default: remote
        dbUrl = "mongodb+srv://Naomi:bitch2021@cluster0.stmjt.mongodb.net/<gisAufgabe>?retryWrites=true&w=majority";
    connectToDatabase(dbUrl);
    function startServer(_port) {
        let server = Http.createServer(); //server in variable anlegen
        console.log("Server starting on port:" + _port); //x
        server.listen(_port); //passiert im port was?
        server.addListener("request", handleRequest); //kam ein request vom server?
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true }; // GOOGLE
        let mongoClient = new Mongo.MongoClient(_url, options); //neues Mongo Objekt OPTIONS GOOGLEN
        await mongoClient.connect(); //Promise zu verbinden
        ausgewählt = mongoClient.db("Artikel").collection("Ausgewählt");
        console.log("Database connection ", ausgewählt != undefined); //x
    }
    function handleRequest(_request, _response) {
        console.log("What's up?"); //x
        _response.setHeader("content-type", "text/html; charset=utf-8"); //metadata (siehe html header)
        _response.setHeader("Access-Control-Allow-Origin", "*"); //metadata (siehe html header)
        if (_request.url) {
            let url = Url.parse(_request.url, true); //url übersetzen in Array -- WARUM DURCHGESTRICHEN
            //for (let key in url.query) {
            //  _response.write(url.query[key] + "<br/>"); //wird angezeigt
            // }
            let json = JSON.stringify(url.query); //übersetzt Array in Json
            _response.write(json); //KANN ICH DIE OBERE ZEILE WEGLASSEN UND HIER EINFACH DATA.JSON ALS RESPONSE WRITEN?
            storeauswahl(url.query);
        }
        _response.end(); //request response braucht end um abzuschicken
    }
    function storeauswahl(_auswahl) {
        //     // ausgewählt.insert(_auswahl);
        //     // insert is depricated, use insertOne instead (Jirka Dell'Oro-Friedl, 2020)
        ausgewählt.insert(_auswahl);
    }
})(AufgabeA = exports.AufgabeA || (exports.AufgabeA = {}));
//# sourceMappingURL=server.js.map