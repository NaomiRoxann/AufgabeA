"use strict";
var AufgabeA;
(function (AufgabeA) {
    window.addEventListener("load", handleLoad); //js wird direkt mit dem laden der Seite gestartet // ruft funktion handleload auf
    AufgabeA.url = "https://aufgabea.herokuapp.com";
    async function handleLoad(_event) {
        let response = await fetch(AufgabeA.url + "/allArtikel"); //warten bis Daten gefetched sind
        let data = await response.text(); //json parse kann nur strings zu arrays parsen, deshalb muss die response erst in eine variable vom typ string gepackt werden
        ArtikelLaden(JSON.parse(data)); //Daten übersetzen
        AufgabeA.form = document.getElementById("FormArtikel");
    }
    AufgabeA.handleLoad = handleLoad;
    function ArtikelLaden(data) {
        let artikelDiv = document.getElementById("Artikel");
        let tableFrame = document.createElement("table");
        tableFrame.classList.add("table");
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
        for (let i = 0; i < data.length; i++) { //geht über Artikel
            let DataFrame = document.createElement("tr");
            let checkbox;
            if (data[i].Status == "Frei") {
                checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.setAttribute("price", data[i].price.toFixed(2)); //Attribut price einführen, Fixed(2) macht 2 Nachkommastellen
                checkbox.setAttribute("id", data[i]._id);
                checkbox.setAttribute("name", "cb" + data[i].titel);
                checkbox.value = data[i].titel;
                checkbox.classList.add("checkbox");
            }
            let Data1 = document.createElement("td");
            Data1.innerText = data[i].titel;
            let Data2 = document.createElement("td");
            Data2.innerText = data[i].description;
            let Data3 = document.createElement("td");
            let picOfArtikel = document.createElement("img");
            picOfArtikel.src = AufgabeA.url + "/" + data[i].pic;
            Data3.appendChild(picOfArtikel);
            let Data4 = document.createElement("td");
            Data4.innerText = "€ " + data[i].price;
            let Data5 = document.createElement("td");
            if (data[i].Status == "Frei")
                Data5.classList.add("frei");
            if (data[i].Status == "Reserviert")
                Data5.classList.add("reserviert");
            if (data[i].Status == "Ausgeliehen")
                Data5.classList.add("ausgeliehen");
            Data5.innerText = data[i].Status;
            DataFrame.appendChild(Data1);
            DataFrame.appendChild(Data2);
            DataFrame.appendChild(Data3);
            DataFrame.appendChild(Data4);
            DataFrame.appendChild(Data5);
            if (checkbox) {
                DataFrame.appendChild(checkbox);
            }
            tableFrame.appendChild(DataFrame);
        }
        artikelDiv.appendChild(tableFrame);
        artikelDiv.addEventListener("change", handleChange);
    }
    function handleChange(_event) {
        showAuswahl();
    }
    function showAuswahl() {
        console.log("showauswahl");
        let price = 0; //wir fangen bei 0 an
        let auswahl = document.querySelector("div#Auswahl"); //div für die ausgewählten Elemente
        auswahl.innerHTML = ""; //wir fangen leer an
        let formData = new FormData(AufgabeA.form); //form info für showAuswahl
        console.log("form:", AufgabeA.form);
        console.log(formData);
        localStorage.setItem("selected", "");
        localStorage.setItem("ids", "");
        let ids = [];
        let selected = [];
        for (let entry of formData.values()) { //durchläuft das formular
            console.log(entry);
            let selector = "[value='" + entry + "']"; // "[name='" + entry[0] + "'][value='" + entry[1] + "']"; //i dont understand
            let artikel = document.querySelector(selector); //selected artikel aus form
            let artikelPrice = Number(artikel.getAttribute("price")); //preis abfragen //Number() macht aus string number, parseFloat didnt work??
            let id = Number(artikel.getAttribute("id"));
            ids.push(id);
            selected.push(entry);
            price += artikelPrice;
        }
        localStorage.setItem("ids", ids.join(", "));
        localStorage.setItem("selected", selected.join(", "));
        auswahl.innerHTML += selected.join(", ") + "<br>";
        auswahl.innerHTML += "Summe: €" + price.toFixed(2); //Summe ausgeben
        localStorage.setItem("Summe", "Summe: " + JSON.stringify(price.toFixed(2) + " €"));
    }
})(AufgabeA || (AufgabeA = {}));
//# sourceMappingURL=script.js.map