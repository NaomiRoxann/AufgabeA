"use strict";
var AufgabeA;
(function (AufgabeA) {
    window.addEventListener("load", handleLoad); //js wird direkt mit dem laden der Seite gestartet // ruft funktion handleload auf
    // let url: string = "index.html";
    //export let url: string = "https://aufgabea.herokuapp.com"; //serveradresse
    AufgabeA.url = "http://localhost:8000";
    //async function erhalteJSON(_url: RequestInfo): Promise<void> {
    async function handleLoad(_event) {
        console.log("Init"); //x
        //aus db??
        // let url: string = "https://aufgabea.herokuapp.com/getArtikel";
        // let url: string = "http://localhost:8000/getArtikel";
        let response = await fetch(AufgabeA.url + "/allArtikel"); //warten bis Daten gefetched sind
        let data = await response.text(); //json parse kann nur strings zu arrays parsen, deshalb muss die response erst in eine variable vom typ string gepackt werden
        ArtikelLaden(JSON.parse(data)); //Daten übersetzen
        AufgabeA.form = document.querySelector("FormArtikel"); //form für handleLoad
        //        let button: HTMLButtonElement = document.querySelector("button[type=button]"); //variable für type button Button einfügen
        //
        AufgabeA.form.addEventListener("change", handleChange); //verändert sich die Auswahl?
        //        button.addEventListener("click", submitAuswahl); //wurde der button geklickt?
        console.log("xxxtonaomixxx"); //x
    }
    AufgabeA.handleLoad = handleLoad;
    // export interface Data {
    //     [key: string]: Artikel[];
    // }
    //let data: Artikel[];
    function ArtikelLaden(data) {
        let artikelDiv = document.getElementById("Artikel");
        let tableFrame = document.createElement("table");
        let HeadingFrame = document.createElement("tr");
        let Heading1 = document.createElement("th");
        Heading1.innerText = "Titel";
        let Heading2 = document.createElement("th");
        Heading2.innerText = "Description";
        let Heading3 = document.createElement("th");
        Heading3.innerText = "Pic";
        let Heading4 = document.createElement("th");
        Heading4.innerText = "Price";
        let Heading5 = document.createElement("th");
        Heading5.innerText = "Status";
        HeadingFrame.appendChild(Heading1);
        HeadingFrame.appendChild(Heading2);
        HeadingFrame.appendChild(Heading3);
        HeadingFrame.appendChild(Heading4);
        HeadingFrame.appendChild(Heading5);
        tableFrame.appendChild(HeadingFrame);
        //console.log(data);
        for (let i = 0; i < data.length; i++) { //geht über Artikel
            let DataFrame = document.createElement("tr");
            //Checkbox
            if (data[i].Status == "Frei") {
                let checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.setAttribute("price", data[i].price.toFixed(2)); //Attribut price einführen, Fixed(2) macht 2 Nachkommastellen
                checkbox.value = data[i].titel;
                checkbox.id = data[i].titel;
                DataFrame.appendChild(checkbox);
            }
            let Data1 = document.createElement("td");
            Data1.innerText = data[i].titel;
            let Data2 = document.createElement("td");
            Data2.innerText = data[i].description;
            let Data3 = document.createElement("td");
            let picOfArtikel = document.createElement("img");
            picOfArtikel.src = AufgabeA.url + "/" + data[i].pic;
            picOfArtikel.width = 100;
            picOfArtikel.height = 100;
            Data3.appendChild(picOfArtikel);
            let Data4 = document.createElement("td");
            Data4.innerText = "€ " + data[i].price;
            let Data5 = document.createElement("td");
            Data5.innerText = data[i].Status;
            DataFrame.appendChild(Data1);
            DataFrame.appendChild(Data2);
            DataFrame.appendChild(Data3);
            DataFrame.appendChild(Data4);
            DataFrame.appendChild(Data5);
            tableFrame.appendChild(DataFrame);
        }
        artikelDiv.appendChild(tableFrame);
    }
    function handleChange(_event) {
        showAuswahl();
    }
    // async function submitAuswahl(_event: Event): Promise<void> { //async liefert promise --
    //     console.log("submit Auswahl"); //x
    //     let formData: FormData = new FormData(form); //form info für submitAuswahl
    //     let query: URLSearchParams = new URLSearchParams(<any>formData); //query string "erstellen"/abrufen als Array
    //     let response: Response = await fetch(url + "?" + query.toString()); //Daten senden, danach gehts erst hier weiter
    //     let responseText: string = await response.text(); //brauch ich das alles überhaupt?
    //     alert(responseText);
    // }
    function showAuswahl() {
        console.log("showauswahl");
        let price = 0; //wir fangen bei 0 an
        let auswahl = document.querySelector("div#Auswahl"); //div für die ausgewählten Elemente
        auswahl.innerHTML = ""; //wir fangen leer an
        let formData = new FormData(AufgabeA.form); //form info für showAuswahl
        for (let entry of formData) { //durchläuft das formular
            let selector = "[value='" + entry + "']"; // "[name='" + entry[0] + "'][value='" + entry[1] + "']"; //i dont understand
            let artikel = document.querySelector(selector); //selected artikel aus form
            let artikelPrice = Number(artikel.getAttribute("price")); //preis abfragen //Number() macht aus string number, parseFloat didnt work??
            auswahl.innerHTML += artikel.value + ": " + artikelPrice.toFixed(2) + " €" + "<br>"; //Preis ausgeben
            price += artikelPrice;
            localStorage.setItem("selected", JSON.stringify(auswahl.innerHTML)); //speichert als string weil an den local storage nur ein string übergeben werden kann //Storage speicher is key //json.stringify is value
        }
        auswahl.innerHTML += "Summe: : €" + price.toFixed(2); //Summe ausgeben
        localStorage.setItem("Summe", "Summe: " + JSON.stringify(price.toFixed(2) + " €"));
    }
})(AufgabeA || (AufgabeA = {}));
//# sourceMappingURL=script.js.map