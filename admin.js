"use strict";
var AufgabeA;
(function (AufgabeA) {
    window.addEventListener("load", getArtikel);
    // gibt Artikel aus der Datenbank aus
    async function getArtikel(_event) {
        //let url: string = "https://aufgabea.herokuapp.com/getArtikel";
        // let url: string = "http://localhost:8000/getArtikel";
        let response = await fetch(AufgabeA.url);
        let data = await response.text(); //JSON String enthält alle DB-Einträge
        //let data: string = await response.json(); //so kann anscheinend diekt überetzt werden
        //let Artikel: Artikel[] = await response.json(); //oder so
        ArtikelLaden(JSON.parse(data)); // String formatieren in Array
    }
    function ArtikelLaden(data) {
        for (let i = 0; i < data.length; i++) { //geht über Artikel
            console.log(data); //x
            // let artikel: Artikel[] = _data[data];
            let artikelDiv = document.getElementById("div#Artikel" + data);
            // artikelDiv.classList.add("artikel");
            //Titel
            let artikelTitel = document.createElement("div");
            artikelTitel.innerText = data[i].titel;
            // artikelTitel.classList.add("artikel-name");
            artikelDiv.appendChild(artikelTitel);
            //Status
            let ausgeliehen = document.createElement("button"); // Button, um einen DB-Eintrag zu bearbeiten
            ausgeliehen.addEventListener("click", makeAusgeliehen);
            ausgeliehen.setAttribute("Artikelname", data[i].titel);
            // ausgeliehen.setAttribute("src", "../images/abgehakt.png");
            // ausgeliehen.setAttribute("alt", "abgehakt");
            // ausgeliehen.setAttribute("class", "ArtikelDiv");
            let frei = document.createElement("button"); // Button, um einen DB-Eintrag zu bearbeiten
            frei.addEventListener("click", makeFrei);
            frei.setAttribute("Artikelname", data[i].titel);
            // frei.setAttribute("src", "../images/abgehakt.png");
            // frei.setAttribute("alt", "abgehakt");
            // frei.setAttribute("class", "ArtikelDiv");
            artikelDiv.appendChild(ausgeliehen);
            artikelDiv.appendChild(frei);
        }
    }
    async function makeAusgeliehen(_event) {
        let clickedButton = _event.target;
        let ArtikelID = clickedButton.getAttribute("Artikelname");
        //let url: string = "https://aufgabea.herokuapp.com";
        // let url: string = "http://localhost:8000";
        AufgabeA.url += "/makeAusgeliehen" + "?" + "id=" + ArtikelID;
        await fetch(AufgabeA.url);
        //update();
    }
    async function makeFrei(_event) {
        let clickedButton = _event.target;
        let ArtikelID = clickedButton.getAttribute("Artikelname");
        //let url: string = "https://aufgabea.herokuapp.com";
        // let url: string = "http://localhost:8000";
        AufgabeA.url += "/makeFrei" + "?" + "id=" + ArtikelID;
        await fetch(AufgabeA.url);
        //update();
    }
    // async function update(): Promise<void> { // Datenbankanzeige aktualisieren
    //     while (artikelDiv.hasChildNodes()) {
    //         artikelDiv.removeChild(<Node>artikelDiv.firstChild);
    //     }
    //     if (document.getElementById("buttonRetrieve") != null) {
    //         document.getElementById("formular")?.removeChild(<Node>document.getElementById("buttonRetrieve"));
    //     }
    //     getArtikel();
    // }
})(AufgabeA || (AufgabeA = {}));
//# sourceMappingURL=admin.js.map