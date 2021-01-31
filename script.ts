namespace AufgabeA {
    window.addEventListener("load", handleLoad); //js wird direkt mit dem laden der Seite gestartet // ruft funktion handleload auf
    let form: HTMLFormElement; //es gebe ein form für alle funktionen zugänglich
    // let url: string = "index.html";
    let url: string = "https://localhost:8001"; //serveradresse

    async function handleLoad(_event: Event): Promise<void> { //async liefert promise -- was passiert wenn die Seite geladen ist? folgendes:
        console.log("Init"); //x

        let response: Response = await fetch("Data.json"); //warten bis Daten gefetched sind
        let allArtikel: string = await response.text(); //warten bis Daten greifbar sind
        let data: Artikel = JSON.parse(allArtikel); //Daten übersetzen

        ArtikelLaden(data);

        form = <HTMLFormElement>document.querySelector("form"); //form für handleLoad
        let button: HTMLButtonElement = document.querySelector("button[type=button]"); //variable für type button Button einfügen
        console.log(button); //x

        form.addEventListener("change", handleChange); //verändert sich die Auswahl?
        button.addEventListener("click", submitAuswahl); //wurde der button geklickt?

        showAuswahl();
    }

    async function submitAuswahl(_event: Event): Promise<void> { //async liefert promise --
        console.log("submit Auswahl"); //x
        let formData: FormData = new FormData(form); //form info für submitAuswahl
        let query: URLSearchParams = new URLSearchParams(<any>formData); //query string "erstellen"/abrufen als Array
        let response: Response = await fetch(url + "?" + query.toString()); //Daten senden, danach gehts erst hier weiter
        let responseText: string = await response.text(); //brauch ich das alles überhaupt?
        alert(responseText);
    }

    function handleChange(_event: Event): void {
        showAuswahl();
    }

    function showAuswahl(): void {
        let price: number = 0; //wir fangen bei 0 an
        let auswahl: HTMLDivElement = <HTMLDivElement>document.querySelector("div#Auswahl"); //div für die ausgewählten Elemente
        auswahl.innerHTML = ""; //wir fangen leer an

        let formData: FormData = new FormData(form); //form info für showAuswahl

        for (let entry of formData) { //durchläuft das formular
            let selector: string = "[value='" + entry[1] + "']"; // "[name='" + entry[0] + "'][value='" + entry[1] + "']"; //i dont understand
            let artikel: HTMLInputElement = <HTMLInputElement>document.querySelector(selector); //selected artikel aus form
            let artikelPrice: number = Number(artikel.getAttribute("price")); //preis abfragen //Number() macht aus string number, parseFloat didnt work??

            auswahl.innerHTML += artikel.value + ": €" + artikelPrice.toFixed(2) + "<br>"; //Preis ausgeben

            price += artikelPrice;
        }

        auswahl.innerHTML += "Total: : €" + price.toFixed(2); //Summe ausgeben
    }

}