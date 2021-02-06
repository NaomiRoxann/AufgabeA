namespace AufgabeA {
    window.addEventListener("load", handleLoad); //js wird direkt mit dem laden der Seite gestartet // ruft funktion handleload auf
    let form: HTMLFormElement; //es gebe ein form für alle funktionen zugänglich
    // let url: string = "index.html";
    //export let url: string = "https://aufgabea.herokuapp.com"; //serveradresse
    export let url: string = "http://localhost:8000";
    export let formData = <HTMLFormElement>document.querySelector("FormArtikel");

    export async function handleLoad(_event: Event): Promise<void> { //async liefert promise -- was passiert wenn die Seite geladen ist? folgendes:
        console.log("Init"); //x
        //aus db??
        // let url: string = "https://aufgabea.herokuapp.com/getArtikel";
        // let url: string = "http://localhost:8000/getArtikel";
        let response: Response = await fetch(url + "/allArtikel"); //warten bis Daten gefetched sind
        let data: string = await response.text(); //json parse kann nur strings zu arrays parsen, deshalb muss die response erst in eine variable vom typ string gepackt werden
        ArtikelLaden(JSON.parse(data)); //Daten übersetzen
        console.log("1"); //x

        //        let button: HTMLButtonElement = document.querySelector("button[type=button]"); //variable für type button Button einfügen
        //
        console.log("2"); //x

        //verändert sich die Auswahl?
        //        button.addEventListener("click", submitAuswahl); //wurde der button geklickt?

        console.log("xxxtoxxx"); //x

    }

    export interface Artikel { //Definiert was wo im array, weshalb man .this.price,... machen kann 
        titel: string;
        description: string;
        pic: string;
        price: number;
        Status: string;
        Name: string;
    }
    function ArtikelLaden(data: Artikel[]): void { //funktions paramter vom typ Data bzw. Artikel Array

        let artikelDiv = document.getElementById("Artikel");

        let tableFrame = document.createElement("table");

        let HeadingFrame = document.createElement("tr");

        let firstRow = document.createElement("th");
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

        HeadingFrame.appendChild(firstRow);
        HeadingFrame.appendChild(Heading1);
        HeadingFrame.appendChild(Heading2);
        HeadingFrame.appendChild(Heading3);
        HeadingFrame.appendChild(Heading4);
        HeadingFrame.appendChild(Heading5);

        tableFrame.appendChild(HeadingFrame);
        //console.log(data);

        for (let i: number = 0; i < data.length; i++) { //geht über Artikel

            let DataFrame = document.createElement("tr");
            //Checkbox
            let checkbox: HTMLInputElement = document.createElement("input");
            if (data[i].Status == "Frei") {
                checkbox.type = "checkbox";
                checkbox.setAttribute("price", data[i].price.toFixed(2)); //Attribut price einführen, Fixed(2) macht 2 Nachkommastellen
                checkbox.value = data[i].titel;
            }
            let Data1 = document.createElement("td");
            Data1.innerText = data[i].titel;
            let Data2 = document.createElement("td");
            Data2.innerText = data[i].description;
            let Data3 = document.createElement("td");
            let picOfArtikel = document.createElement("img");
            picOfArtikel.src = url + "/" + data[i].pic;
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


            DataFrame.appendChild(checkbox);
            DataFrame.appendChild(Data1);
            DataFrame.appendChild(Data2);
            DataFrame.appendChild(Data3);
            DataFrame.appendChild(Data4);
            DataFrame.appendChild(Data5);

            tableFrame.appendChild(DataFrame);
        }

        artikelDiv.appendChild(tableFrame);
        artikelDiv.addEventListener("change", handleChange);
    }

    function handleChange(_event: Event): void {
        showAuswahl();
        console.log("summe =" + getSumme())
    }

    // async function submitAuswahl(_event: Event): Promise<void> { //async liefert promise --
    //     console.log("submit Auswahl"); //x
    //     let formData: FormData = new FormData(form); //form info für submitAuswahl
    //     let query: URLSearchParams = new URLSearchParams(<any>formData); //query string "erstellen"/abrufen als Array
    //     let response: Response = await fetch(url + "?" + query.toString()); //Daten senden, danach gehts erst hier weiter
    //     let responseText: string = await response.text(); //brauch ich das alles überhaupt?
    //     alert(responseText);
    // }

    function getSumme(): number {
        let summe = 0;
        let alleArtikelForm = document.getElementById("Artikel");
        for (let i = 1; i < alleArtikelForm.children[0].children.length; i++) {
            let elementAuswahl = alleArtikelForm.children[0].children[i];
            if (elementAuswahl != null) {
                let checkBox = elementAuswahl.children[0] as HTMLInputElement;
                if (checkBox.checked) {

                    var price = parseFloat(elementAuswahl.children[0].getAttribute("price"));
                    summe = summe + price;
                }

            }
        }

        return summe;
    }

    function showAuswahl(): void {
        console.log("showauswahl");
        let price: number = 0; //wir fangen bei 0 an
        let auswahl: HTMLDivElement = <HTMLDivElement>document.querySelector("div#Auswahl"); //div für die ausgewählten Elemente
        auswahl.innerHTML = ""; //wir fangen leer an

        let formData: FormData = new FormData(form); //form info für showAuswahl

        for (let entry of formData) { //durchläuft das formular
            let selector: string = "[value='" + entry + "']"; // "[name='" + entry[0] + "'][value='" + entry[1] + "']"; //i dont understand
            let artikel: HTMLInputElement = <HTMLInputElement>document.querySelector(selector); //selected artikel aus form
            let artikelPrice: number = Number(artikel.getAttribute("price")); //preis abfragen //Number() macht aus string number, parseFloat didnt work??

            auswahl.innerHTML += artikel.value + ": " + artikelPrice.toFixed(2) + " €" + "<br>"; //Preis ausgeben

            price += artikelPrice;
            localStorage.setItem("selected", JSON.stringify(auswahl.innerHTML)); //speichert als string weil an den local storage nur ein string übergeben werden kann //Storage speicher is key //json.stringify is value

        }

        auswahl.innerHTML += "Summe: : €" + price.toFixed(2); //Summe ausgeben
        localStorage.setItem("Summe", "Summe: " + JSON.stringify(price.toFixed(2) + " €"));
    }



}