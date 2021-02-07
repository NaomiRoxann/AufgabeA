"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AufgabeA = void 0;
const Http = require("http");
const Url = require("url");
const mongodb_1 = require("mongodb");
const fs = require("fs");
var AufgabeA;
(function (AufgabeA) {
    let port = process.env.PORT;
    if (port == undefined) {
        port = 8000;
    }
    let server = Http.createServer();
    server.listen(port);
    server.addListener("request", handleRequest);
    let dbUrl = "mongodb+srv://Naomi:bitch2021@cluster0.stmjt.mongodb.net/gisAufgabe?retryWrites=true&w=majority";
    let allartikel;
    connectDB(dbUrl);
    async function handleRequest(_request, _response) {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            if (url.pathname.endsWith(".js") || url.pathname.endsWith(".css")) {
                let html = fs.readFileSync("./" + url.pathname);
                _response.writeHead(200, { 'Content-Type': url.pathname.endsWith(".js") ? 'text/javascript' : 'text/css' });
                _response.write(html);
            }
            if (url.pathname.endsWith(".jpg")) {
                let html = fs.readFileSync("./pic/" + url.pathname);
                if (html == null) {
                    _response.end();
                }
                _response.writeHead(200, { 'Content-Type': 'image/jpeg' }); //200 -> HTTP Statuscode
                _response.write(html);
            }
            if (url.pathname == "/allArtikel") {
                let allartikeldb = allartikel.find();
                let allartikelArray = await allartikeldb.toArray();
                let allartikelString = JSON.stringify(allartikelArray);
                _response.write(allartikelString);
            }
            if (url.pathname == "/") {
                let resp = fs.readFileSync("./Artikel.html");
                _response.write(resp);
            }
            if (url.pathname == "/Checkout") {
                let resp = fs.readFileSync("./Checkout.html");
                _response.write(resp);
            }
            if (url.pathname == "/Admin") {
                let resp = fs.readFileSync("./Admin.html");
                _response.write(resp);
            }
            if (url.pathname == "/makeReserviert") {
                let ids = url.query.ids;
                let name = url.query.name;
                let idArray = ids.split(",");
                for (let id of idArray) {
                    await allartikel.updateOne({ _id: parseInt(id) }, { $set: { Status: "Reserviert", Name: name } });
                }
            }
            if (url.pathname == "/makeAusgeliehen") {
                let id = parseInt(url.query.id);
                await allartikel.updateOne({ "_id": id }, { $set: { Status: "Ausgeliehen" } });
            }
            if (url.pathname == "/makeFrei") {
                let id = parseInt(url.query.id);
                await allartikel.updateOne({ "_id": id }, { $set: { Status: "Frei", Name: "" } });
            }
        }
        _response.end();
    }
    async function connectDB(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let Client = new mongodb_1.MongoClient(_url, options);
        await Client.connect();
        allartikel = Client.db("gisAufgabe").collection("Artikel");
    }
})(AufgabeA = exports.AufgabeA || (exports.AufgabeA = {}));
//# sourceMappingURL=server.js.map