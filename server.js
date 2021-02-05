"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AufgabeA = void 0;
const Http = require("http"); //Laden des Modules (Erweiterung) HTTP, um einen Server zu bauen. * = sämtliche Funktionalität laden
const Url = require("url"); //url kommt mit request //Aufgabe des Url Moduls ist die Aufsplittung der URl in lesbare Teile. Muss importiert werden zur Verwendung
const Mongo = require("mongodb");
var AufgabeA;
(function (AufgabeA) {
    // interface Auswahl {
    //     [key: string]: string | string[];
    // }
    // https://medium.com/@kellydsample/challenge-3-run-a-vanilla-js-project-in-your-browser-with-node-791e124aa2c6
    // let html;
    // let css;
    // let js;
    // fs.readFile('./Artikel.html', function (err, data) {
    //     if (err) {
    //         throw err;
    //     }
    //     html = data;
    // });
    // fs.readFile('./style.css', function (err, data) {
    //     if (err) {
    //         throw err;
    //     }
    //     css = data;
    // });
    // fs.readFile('./script.js', function (err, data) {
    //     if (err) {
    //         throw err;
    //     }
    //     js = data;
    // });
    let port = process.env.PORT; //port anlegen //Port ist wie ein Hafen, dann können Informationen rein und raus //process.env gibt mir Informationen über meinen node Prozess,über meine Maschine/meinen Rechner | in dem Fall über den Port
    if (port == undefined) { //just in case //Hat die Maschine mir einen port zugeteilt? - suche nach port, variable
        port = 8000; //Wenn nicht dann weise den Port 8000 zu
    }
    let server = Http.createServer(); //server in variable anlegen und erstelle server in ihr, rufe funktion auf
    console.log("Server starting on port:" + port); //x
    server.listen(port); //passiert im port was? //Höre auf die Port nummer und schau ob eine Nachricht reinkommt
    server.addListener("request", handleRequest); //kam ein request vom server? //Wenn Server eine Request erhält, dann rufe handleRequest() auf
    //createServer(port); //if extra function is neccesary
    // let dbUrl: string = "";
    // //local oder remote
    // let args: string[] = process.argv.slice(2);
    // if (args[0] == "local")
    //     dbUrl = "mongodb://localhost:27017";
    // else // default: remote
    let dbUrl = "mongodb+srv://Naomi:bitch2021@cluster0.stmjt.mongodb.net/gisAufgabe?retryWrites=true&w=majority";
    connectDB(dbUrl); //extra funktion weil async
    // function createServer(_port: number | string): void { //extra function
    //     let server: Http.Server = Http.createServer(); //server in variable anlegen
    //     console.log("Server starting on port:" + _port); //x
    //     server.listen(_port); //passiert im port was?
    //     server.addListener("request", handleRequest); //kam ein request vom server?
    // }
    let allartikel;
    async function handleRequest(_request, _response) {
        //Bei der Request(Anfrage) kommt ein Parameter vom Typ "IncomingMessage" herein und es wird eine Antwort zur Verüfung gestellt "ServerResponse", die aber noch leer ist
        console.log("What's up?"); //x
        _response.setHeader("content-type", "text/html; charset=utf-8"); //metadata (siehe html header) //Füllen der Response mit leerem Text
        _response.setHeader("Access-Control-Allow-Origin", "*"); //metadata (siehe html header) //Erlaubt dass man von überall anfragen darf, sonst motzt Browser
        if (_request.url) { //URL Modul hilfe die request weiterzuverarbeiten //erst wird überprüft ob eine verarbetinare URL da ist
            let url = Url.parse(_request.url, true); //"parse" "urlwithparsedquery" macht die url leserlich, durch wandel in anderes format //Parameter "true" macht ein assoziatives array draus, welches sich leichter lesen lässt
            //if (url.pathname == "/getArtikel") { // Artikel werden abgerufen
            let allartikeldb = allartikel.find(); //liest die einzelnen Dokumente der DB aus
            let allartikelArray = await allartikeldb.toArray(); //The toArray() method loads into RAM all documents returned by the cursor; the toArray() method exhausts the cursor.
            let allartikelString = JSON.stringify(allartikelArray);
            _response.write(allartikelString);
            //}
            // var readStream = fileserver.createReadStream("./Artikel.html");
            // // We replaced all the event handlers with a simple call to readStream.pipe()
            // readStream.pipe(_response);
            // _response.end(readStream);
            if (url.pathname == "/addName") { // Name für Reservierung in die DB
                let objectID = getID();
                allartikel.updateOne({ "_id": objectID }, { $addFields: { Name: "$name" } });
            }
            // { "_ID": OBJECTID }, { $SET: { "ANMERKUNGEN": "GESENDET" } }); // VERÄNDERT DEN WERT VON "ANMERKUNGEN" IN DER DB
            if (url.pathname == "/makeReserviert") { // Name für Reservierung in die DB
                let objectID = getID();
                allartikel.updateOne({ "_id": objectID }, { $set: { Status: "Reserviert" } });
            }
            if (url.pathname == "/makeAusgeliehen") { // Name für Reservierung in die DB
                let objectID = getID();
                allartikel.updateOne({ "_id": objectID }, { $set: { Status: "Ausgeliehen" } });
            }
            if (url.pathname == "/makeFrei") { // Name für Reservierung in die DB
                let objectID = getID();
                allartikel.updateOne({ "_id": objectID }, { $set: { Status: "Frei" } });
            }
            function getID() {
                let query = url.query;
                let id = query["id"]; // richtigen URL-Teil auswählen
                let objectID = new Mongo.ObjectID(id);
                return objectID;
            }
        }
        _response.end();
    }
    async function connectDB(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true }; // GOOGLE
        let Client = new Mongo.MongoClient(_url, options); //neues Mongo Objekt OPTIONS GOOGLEN
        await Client.connect(); //Promise zu verbinden
        allartikel = Client.db("gisAufgabe").collection("Artikel");
        console.log("Database connection ", allartikel != undefined); //x
    }
})(AufgabeA = exports.AufgabeA || (exports.AufgabeA = {}));
//# sourceMappingURL=server.js.map