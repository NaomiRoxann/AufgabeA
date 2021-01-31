import * as Http from "http";
import * as Url from "url"; //url kommt mit request
import * as Mongo from "mongodb";

export namespace AufgabeA {

    interface Auswahl {
        [type: string]: string | string[];
    }

    let ausgewählt: Mongo.Collection;

    let port: number | string | undefined = process.env.PORT; //port anlegen
    if (port == undefined) { //just in case
        port = 8000;
    }
    startServer(port);

    let dbUrl: string = "";
    //local oder remote
    let args: string[] = process.argv.slice(2);
    if (args[0] == "local")
        dbUrl = "mongodb://localhost:27017";
    else // default: remote
        dbUrl = "mongodb+srv://Naomi:bitch2021@cluster0.stmjt.mongodb.net/<gisAufgabe>?retryWrites=true&w=majority";
    connectToDatabase(dbUrl);

    function startServer(_port: number | string): void {
        let server: Http.Server = Http.createServer(); //server in variable anlegen
        console.log("Server starting on port:" + _port); //x

        server.listen(_port); //passiert im port was?
        server.addListener("request", handleRequest); //kam ein request vom server?
    }

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true }; // GOOGLE
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options); //neues Mongo Objekt OPTIONS GOOGLEN
        await mongoClient.connect(); //Promise zu verbinden
        let ausgewählt = mongoClient.db("Artikel").collection("Ausgewählt");
        console.log("Database connection ", ausgewählt != undefined); //x
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void { //request gibt 2 Parameter, incoming&response
        console.log("What's up?"); //x

        _response.setHeader("content-type", "text/html; charset=utf-8"); //metadata (siehe html header)
        _response.setHeader("Access-Control-Allow-Origin", "*"); //metadata (siehe html header)

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true); //url übersetzen in Array -- WARUM DURCHGESTRICHEN
            //for (let key in url.query) {
            //  _response.write(url.query[key] + "<br/>"); //wird angezeigt
            // }

            let json: string = JSON.stringify(url.query); //übersetzt Array in Json
            _response.write(json); //KANN ICH DIE OBERE ZEILE WEGLASSEN UND HIER EINFACH DATA.JSON ALS RESPONSE WRITEN?

            storeauswahl(url.query);
        }

        _response.end(); //request response braucht end um abzuschicken
    }


    function storeauswahl(_auswahl: Auswahl): void {
        //     // ausgewählt.insert(_auswahl);
        //     // insert is depricated, use insertOne instead (Jirka Dell'Oro-Friedl, 2020)
        ausgewählt.insert(_auswahl);
    }
}