namespace AufgabeA {

    window.addEventListener("load", handleLoad); //js wird direkt mit dem laden der Seite gestartet // ruft funktion handleload auf
    export let form: HTMLFormElement; //es gebe ein form für alle funktionen zugänglich
    // let url: string = "index.html";
    //export let url: string = "https://aufgabea.herokuapp.com"; //serveradresse
    export let url: string = "http://localhost:8000";

    //async function erhalteJSON(_url: RequestInfo): Promise<void> {
    export async function handleLoad(_event: Event): Promise<void> { //async liefert promise -- was passiert wenn die Seite geladen ist? folgendes:
        console.log("Init"); //x

        //aus db??
        // let url: string = "https://aufgabea.herokuapp.com/getArtikel";
        // let url: string = "http://localhost:8000/getArtikel";
        let response: Response = await fetch(url); //warten bis Daten gefetched sind
        let data: string = await response.text(); //json parse kann nur strings zu arrays parsen, deshalb muss die response erst in eine variable vom typ string gepackt werden
        ArtikelLaden(JSON.parse(data)); //Daten übersetzen

        form = <HTMLFormElement>document.querySelector("FormArtikel"); //form für handleLoad
        //        let button: HTMLButtonElement = document.querySelector("button[type=button]"); //variable für type button Button einfügen
        //
        form.addEventListener("change", handleChange); //verändert sich die Auswahl?
        //        button.addEventListener("click", submitAuswahl); //wurde der button geklickt?

        showAuswahl();
    }


    export interface Artikel { //Definiert was wo im array, weshalb man .this.price,... machen kann 
        titel: string;
        description: string;
        pic: string;
        price: number;
        Status: string;
        Name: string;
    }
    // export interface Data {
    //     [key: string]: Artikel[];
    // }
    //let data: Artikel[];
    function ArtikelLaden(data: Artikel[]): void { //funktions paramter vom typ Data bzw. Artikel Array

        for (let i: number = 0; i < data.length; i++) { //geht über Artikel
            console.log(data);//x

            // let artikel: Artikel[] = _data[data];


            let artikelDiv: HTMLElement = document.createElement("div#Artikel" + data);
            // artikelDiv.classList.add("artikel");

            //Checkbox
            if (data[i].Status == "Frei") {
                let checkbox: HTMLElement = checkboxen(data);
                // let fieldset: HTMLFieldSetElement = document.querySelector("fieldset" + data); //verbindet mit HTML
                // fieldset.appendChild(checkbox);
                // checkbox.innerText = "In die Tüte";
                // checkbox.classList.add("artikel-btn");
                artikelDiv.appendChild(checkbox);
                // checkbox.addEventListener("click", zaehler.bind(data)); //Ermöglicht zugriff auf datenarray an stelle in FUnktion zähler, weil wir ja gerade an dieser stelle i in der funktion sind
                // checkbox.addEventListener("click", pushLocal.bind(data)); //.bind ermöglicht dass man auf; 
                // checkbox.setAttribute("preis", data.price.toString());
            }
            //? document.getElementById(data.category + "-content")?.appendChild(artikelDiv);

            //Titel
            let artikelTitel: HTMLDivElement = document.createElement("div");
            artikelTitel.innerText = data[i].titel;
            // artikelTitel.classList.add("artikel-name");
            artikelDiv.appendChild(artikelTitel);

            //Description
            let artikelDesc: HTMLDivElement = document.createElement("div");
            artikelDesc.innerText = data[i].description;
            // artikelDesc.classList.add("artikel-desc");
            artikelDiv.appendChild(artikelDesc);

            //Pic
            let artikelPic: HTMLImageElement = document.createElement("img");
            artikelPic.src = data[i].pic;
            // artikelPic.alt = data[i].titel;
            // artikelPic.classList.add("artikel-Pic");
            artikelDiv.appendChild(artikelPic);

            //Price
            let artikelPrice: HTMLDivElement = document.createElement("div");
            artikelPrice.innerHTML = data[i].price.toFixed(2); //.toLocaleString("de-DE", { currency: "EUR", style: "currency" });
            // artikelPrice.classList.add("artikel-price");
            artikelDiv.appendChild(artikelPrice);

            //Status
            let artikelStatus: HTMLDivElement = document.createElement("div");
            artikelStatus.innerHTML = data[i].Status; //.toLocaleString("de-DE", { currency: "EUR", style: "currency" });
            // artikelPrice.classList.add("artikel-price");
            artikelDiv.appendChild(artikelStatus);

            //Checkbox
            if (data[i].Status == "Frei") {
                let checkbox: HTMLElement = checkboxen(data);
                // let fieldset: HTMLFieldSetElement = document.querySelector("fieldset" + data); //verbindet mit HTML
                // fieldset.appendChild(checkbox);
                // checkbox.innerText = "In die Tüte";
                // checkbox.classList.add("artikel-btn");
                artikelDiv.appendChild(checkbox);
                // checkbox.addEventListener("click", zaehler.bind(data)); //Ermöglicht zugriff auf datenarray an stelle in FUnktion zähler, weil wir ja gerade an dieser stelle i in der funktion sind
                // checkbox.addEventListener("click", pushLocal.bind(data)); //.bind ermöglicht dass man auf; 
                // checkbox.setAttribute("preis", data.price.toString());
            }

        }
    }
    //let group: HTMLElement = checkboxen(data);
    function checkboxen(data: Artikel[]): HTMLElement {
        let group: HTMLDivElement = document.createElement("div"); //neue group in func
        for (let artikel of data) {
            let checkbox: HTMLInputElement = document.createElement("input"); //Auswahl Kästchen erstellen, unten: mit . definieren
            checkbox.type = "checkbox";
            checkbox.setAttribute("price", artikel.price.toFixed(2)); //Attribut price einführen, Fixed(2) macht 2 Nachkommastellen
            checkbox.value = artikel.titel;
            checkbox.id = artikel.titel; //verbindet Kästchen mit Inhalt

            let label: HTMLLabelElement = document.createElement("label"); //generiert die Infos vom Artikel
            label.title = artikel.titel;
            label.textContent = artikel.description;
            label.textContent = artikel.pic;
            label.textContent = artikel.price.toFixed(2);
            label.textContent = artikel.Status;
            label.htmlFor = artikel.titel; //verbindet Inhalt mit Kästchen

            group.appendChild(checkbox); //verbindet Kästchen mit group in func
            group.appendChild(label); //verbindet Infos mit group in func

            // let PicURL: HTMLImageElement = document.createElement("Pic");
            // PicURL.setAttribute("src", auswahl.url);
            // PicURL.setAttribute("alt", auswahl.titel);
            // label.appendChild(PicURL);
        }
        return group;
    }

    function handleChange(_event: Event): void {
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

    function showAuswahl(): void {
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