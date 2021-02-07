import * as Http from "http"; //Laden des Modules (Erweiterung) HTTP, um einen Server zu bauen. * = sämtliche Funktionalität laden
import * as Url from "url"; //url kommt mit request //Aufgabe des Url Moduls ist die Aufsplittung der URl in lesbare Teile. Muss importiert werden zur Verwendung
import { Collection, MongoClient, MongoClientOptions } from "mongodb";
import * as fs from "fs";


export namespace AufgabeA {

    let port: number | string | undefined = process.env.PORT; //port anlegen //Port ist wie ein Hafen, dann können Informationen rein und raus //process.env gibt mir Informationen über meinen node Prozess,über meine Maschine/meinen Rechner | in dem Fall über den Port
    if (port == undefined) { //just in case //Hat die Maschine mir einen port zugeteilt? - suche nach port, variable
        port = 8000; //Wenn nicht dann weise den Port 8000 zu
    }

    let server: Http.Server = Http.createServer(); //server in variable anlegen und erstelle server in ihr, rufe funktion auf
    console.log("Server starting on port:" + port); //x
    server.listen(port); //passiert im port was? //Höre auf die Port nummer und schau ob eine Nachricht reinkommt
    server.addListener("request", handleRequest); //kam ein request vom server? //Wenn Server eine Request erhält, dann rufe handleRequest() auf

    let dbUrl = "mongodb+srv://Naomi:bitch2021@cluster0.stmjt.mongodb.net/gisAufgabe?retryWrites=true&w=majority";
    let allartikel: Collection;
    connectDB(dbUrl); //extra funktion weil async



    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> { //request gibt 2 Parameter, incoming&response

        console.log("What's up?"); //x //wird plötzlich 3 mal ausgegeben???

        _response.setHeader("content-type", "text/html; charset=utf-8"); //metadata (siehe html header) //Füllen der Response mit leerem Text
        _response.setHeader("Access-Control-Allow-Origin", "*"); //metadata (siehe html header) //Erlaubt dass man von überall anfragen darf, sonst motzt Browser

        if (_request.url) { //URL Modul hilfe die request weiterzuverarbeiten //erst wird überprüft ob eine verarbetinare URL da ist
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true); //"parse" "urlwithparsedquery" macht die url leserlich, durch wandel in anderes format //Parameter "true" macht ein assoziatives array draus, welches sich leichter lesen lässt

            if (url.pathname.endsWith(".js") || url.pathname.endsWith(".css")) {
                let html: Buffer = fs.readFileSync("./" + url.pathname,);
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

            if (url.pathname == "/allArtikel") { // Name für Reservierung in die DB
                let allartikeldb = allartikel.find(); //liest die einzelnen Dokumente der DB aus
                let allartikelArray: string[] = await allartikeldb.toArray(); //The toArray() method loads into RAM all documents returned by the cursor; the toArray() method exhausts the cursor.
                let allartikelString: string = JSON.stringify(allartikelArray);
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

            if (url.pathname == "/makeReserviert") { // Name für Reservierung in die DB
                let ids: string = <string>url.query.ids; // 1,2,3,5
                let name = url.query.name; //Peter
                console.log("makeReserviert", ids, name);
                let idArray = ids.split(","); // ["1", "2", "3", "5"]
                for (let id of idArray) {
                    console.log("loop", id);
                    await allartikel.updateOne(
                        { _id: parseInt(id) }, { $set: { Status: "Reserviert", Name: name } });
                }

            }

            if (url.pathname == "/makeAusgeliehen") { // Name für Reservierung in die DB
                let id: number = parseInt(<string>url.query.id);
                await allartikel.updateOne(
                    { "_id": id }, { $set: { Status: "Ausgeliehen" } });
            }

            if (url.pathname == "/makeFrei") { // Name für Reservierung in die DB
                let id: number = parseInt(<string>url.query.id);
                await allartikel.updateOne(
                    { "_id": id }, { $set: { Status: "Frei", Name: "" } });
            }
        }
        _response.end();
    }


    async function connectDB(_url: string): Promise<void> {
        let options: MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true }; // GOOGLE
        let Client: MongoClient = new MongoClient(_url, options); //neues Mongo Objekt OPTIONS GOOGLEN
        await Client.connect(); //Promise zu verbinden
        allartikel = Client.db("gisAufgabe").collection("Artikel");
        console.log("Database connection ", allartikel != undefined); //x

    }
}