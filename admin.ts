namespace AufgabeA {

    let url: string = "http://localhost:8000";
    window.addEventListener("load", getArtikel);

    // gibt Artikel aus der Datenbank aus
    async function getArtikel(): Promise<void> {

        //let url: string = "https://aufgabea.herokuapp.com/getArtikel";
        let url: string = "http://localhost:8000";
        let response: Response = await fetch(url + "/allArtikel");
        let data: string = await response.text(); //JSON String enthält alle DB-Einträge
        //let data: string = await response.json(); //so kann anscheinend diekt überetzt werden
        //let Artikel: Artikel[] = await response.json(); //oder so
        ArtikelLaden(JSON.parse(data)); // String formatieren in Array
    }
    function ArtikelLaden(data: Artikel[]): void {

        let artikelDiv = document.getElementById("Artikel");
        artikelDiv.innerHTML = ""; //Element leer machen, damit man es immer wieder neu erzeugen kann

        let tableFrame = document.createElement("table");

        let HeadingFrame = document.createElement("tr");

        let Heading1 = document.createElement("th");
        Heading1.innerText = "Titel";
        let Heading5 = document.createElement("th");
        Heading5.innerText = "Status";

        HeadingFrame.appendChild(Heading1);
        HeadingFrame.appendChild(Heading5);

        tableFrame.appendChild(HeadingFrame);
        for (let i: number = 0; i < data.length; i++) { //geht über Artikel

            let DataFrame = document.createElement("tr");

            let Data1 = document.createElement("td");
            Data1.innerText = data[i].titel;
            let Data5 = document.createElement("td");
            if (data[i].Status == "Frei")
                Data5.classList.add("frei");
            if (data[i].Status == "Reserviert")
                Data5.classList.add("reserviert");
            if (data[i].Status == "Ausgeliehen")
                Data5.classList.add("ausgeliehen");
            Data5.innerText = data[i].Status;
            let Data6: HTMLDivElement = document.createElement("td");
            let Data7 = document.createElement("td");
            if (data[i].Status == "Reserviert") {
                Data6.innerHTML = data[i].Name;
                let ausgeliehen: HTMLButtonElement = document.createElement("button"); // Button, um einen DB-Eintrag zu bearbeiten
                ausgeliehen.addEventListener("click", () => makeAusgeliehen(data[i]._id));
                ausgeliehen.innerHTML = "Auf ausgeliehen setzen";
                Data7.appendChild(ausgeliehen);
            }
            if (data[i].Status == "Ausgeliehen") {
                let frei: HTMLButtonElement = document.createElement("button"); // Button, um einen DB-Eintrag zu bearbeiten
                frei.addEventListener("click", () => makeFrei(data[i]._id));
                frei.innerHTML = "Auf frei setzen.";
                Data7.appendChild(frei);
            }

            DataFrame.appendChild(Data1);
            DataFrame.appendChild(Data5);
            DataFrame.appendChild(Data6);
            DataFrame.appendChild(Data7);

            tableFrame.appendChild(DataFrame);
        }
        artikelDiv.appendChild(tableFrame);

    }

    async function makeAusgeliehen(id: string): Promise<void> { // verändert DB-Eintrag - Status: gesendet
        let fetchUrl = url + "/makeAusgeliehen?" + "id=" + id;
        await fetch(fetchUrl);
        await getArtikel();
    }
    async function makeFrei(id: string): Promise<void> { // verändert DB-Eintrag - Status: gesendet
        //let url: string = "https://aufgabea.herokuapp.com";
        // let url: string = "http://localhost:8000";
        let fetchUrl = url + "/makeFrei?" + "id=" + id;
        await fetch(fetchUrl);
        await getArtikel();
    }
}
