"use strict";
var AufgabeA;
(function (AufgabeA) {
    window.addEventListener("load", getArtikel);
    // gibt Artikel aus der Datenbank aus
    async function getArtikel(_event) {
        //let url: string = "https://aufgabea.herokuapp.com/getArtikel";
        // let url: string = "http://localhost:8000/getArtikel";
        let response = await fetch(AufgabeA.url + "./allArtikel");
        let data = await response.text(); //JSON String enthält alle DB-Einträge
        //let data: string = await response.json(); //so kann anscheinend diekt überetzt werden
        //let Artikel: Artikel[] = await response.json(); //oder so
        ArtikelLaden(JSON.parse(data)); // String formatieren in Array
    }
    function ArtikelLaden(data) {
        let artikelDiv = document.getElementById("Artikel");
        let tableFrame = document.createElement("table");
        let HeadingFrame = document.createElement("tr");
        let Heading1 = document.createElement("th");
        Heading1.innerText = "Titel";
        let Heading5 = document.createElement("th");
        Heading5.innerText = "Status";
        HeadingFrame.appendChild(Heading1);
        HeadingFrame.appendChild(Heading5);
        tableFrame.appendChild(HeadingFrame);
        for (let i = 0; i < data.length; i++) { //geht über Artikel
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
            let Data6 = document.createElement("td");
            let Data7 = document.createElement("td");
            if (data[i].Status == "Reserviert") {
                Data6.innerHTML = data[i].Name;
                let ausgeliehen = document.createElement("button"); // Button, um einen DB-Eintrag zu bearbeiten
                ausgeliehen.addEventListener("click", makeAusgeliehen);
                Data7.appendChild(ausgeliehen);
            }
            if (data[i].Status == "Ausgeliehen") {
                let frei = document.createElement("button"); // Button, um einen DB-Eintrag zu bearbeiten
                frei.addEventListener("click", makeFrei);
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
    async function makeAusgeliehen(_event) {
        let clickedButton = _event.target;
        let ArtikelID = clickedButton.getAttribute("Data6");
        //let url: string = "https://aufgabea.herokuapp.com";
        // let url: string = "http://localhost:8000";
        AufgabeA.url += "/makeAusgeliehen" + "?" + "id=" + ArtikelID;
        await fetch(AufgabeA.url);
        //update();
    }
    async function makeFrei(_event) {
        let clickedButton = _event.target;
        let ArtikelID = clickedButton.getAttribute("Data6");
        //let url: string = "https://aufgabea.herokuapp.com";
        // let url: string = "http://localhost:8000";
        AufgabeA.url += "/makeFrei" + "?" + "id=" + ArtikelID;
        await fetch(AufgabeA.url);
        //update();
    }
})(AufgabeA || (AufgabeA = {}));
//# sourceMappingURL=admin.js.map