"use strict";
var AufgabeA;
(function (AufgabeA) {
    window.addEventListener("load", handleLoad); //js wird direkt mit dem laden der Seite gestartet // ruft funktion handleload auf
    let form; //es gebe ein form für alle funktionen zugänglich
    // let url: string = "index.html";
    let url = "https://aufgabea.herokuapp.com"; //serveradresse
    async function handleLoad(_event) {
        console.log("Init"); //x
        let response = await fetch("data.json"); //warten bis Daten gefetched sind
        let allArtikel = await response.text(); //warten bis Daten greifbar sind
        let data = JSON.parse(allArtikel); //Daten übersetzen
        AufgabeA.ArtikelLaden(data);
        form = document.querySelector("form"); //form für handleLoad
        let button = document.querySelector("button[type=button]"); //variable für type button Button einfügen
        console.log(button); //x
        form.addEventListener("change", handleChange); //verändert sich die Auswahl?
        button.addEventListener("click", submitAuswahl); //wurde der button geklickt?
        showAuswahl();
    }
    async function submitAuswahl(_event) {
        console.log("submit Auswahl"); //x
        let formData = new FormData(form); //form info für submitAuswahl
        let query = new URLSearchParams(formData); //query string "erstellen"/abrufen als Array
        let response = await fetch(url + "?" + query.toString()); //Daten senden, danach gehts erst hier weiter
        let responseText = await response.text(); //brauch ich das alles überhaupt?
        alert(responseText);
    }
    function handleChange(_event) {
        showAuswahl();
    }
    function showAuswahl() {
        let price = 0; //wir fangen bei 0 an
        let auswahl = document.querySelector("div#Auswahl"); //div für die ausgewählten Elemente
        auswahl.innerHTML = ""; //wir fangen leer an
        let formData = new FormData(form); //form info für showAuswahl
        for (let entry of formData) { //durchläuft das formular
            let selector = "[value='" + entry[1] + "']"; // "[name='" + entry[0] + "'][value='" + entry[1] + "']"; //i dont understand
            let artikel = document.querySelector(selector); //selected artikel aus form
            let artikelPrice = Number(artikel.getAttribute("price")); //preis abfragen //Number() macht aus string number, parseFloat didnt work??
            auswahl.innerHTML += artikel.value + ": €" + artikelPrice.toFixed(2) + "<br>"; //Preis ausgeben
            price += artikelPrice;
        }
        auswahl.innerHTML += "Total: : €" + price.toFixed(2); //Summe ausgeben
    }
})(AufgabeA || (AufgabeA = {}));
//# sourceMappingURL=script.js.map