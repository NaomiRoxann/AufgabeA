import * as Http from "http";
import * as Url from "url";
import { Collection, MongoClient, MongoClientOptions } from "mongodb";
import * as fs from "fs";


export namespace AufgabeA {

    let port: number | string | undefined = process.env.PORT;
    if (port == undefined) {
        port = 8000;
    }

    let server: Http.Server = Http.createServer();
    server.listen(port);
    server.addListener("request", handleRequest);

    let dbUrl = "mongodb+srv://Naomi:bitch2021@cluster0.stmjt.mongodb.net/gisAufgabe?retryWrites=true&w=majority";
    let allartikel: Collection;
    connectDB(dbUrl);



    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {

        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);

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

            if (url.pathname == "/allArtikel") {
                let allartikeldb = allartikel.find();
                let allartikelArray: string[] = await allartikeldb.toArray();
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

            if (url.pathname == "/makeReserviert") {
                let ids: string = <string>url.query.ids;
                let name = url.query.name;
                let idArray = ids.split(",");
                for (let id of idArray) {
                    await allartikel.updateOne(
                        { _id: parseInt(id) }, { $set: { Status: "Reserviert", Name: name } });
                }

            }

            if (url.pathname == "/makeAusgeliehen") {
                let id: number = parseInt(<string>url.query.id);
                await allartikel.updateOne(
                    { "_id": id }, { $set: { Status: "Ausgeliehen" } });
            }

            if (url.pathname == "/makeFrei") {
                let id: number = parseInt(<string>url.query.id);
                await allartikel.updateOne(
                    { "_id": id }, { $set: { Status: "Frei", Name: "" } });
            }
        }
        _response.end();
    }


    async function connectDB(_url: string): Promise<void> {
        let options: MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let Client: MongoClient = new MongoClient(_url, options);
        await Client.connect();
        allartikel = Client.db("gisAufgabe").collection("Artikel");

    }
}