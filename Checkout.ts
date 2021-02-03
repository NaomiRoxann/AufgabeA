namespace AufgabeA {

    let auswahlDiv: HTMLElement = <HTMLElement>document.getElementById("Auswahl"); //gibt die auswahl von artikel.html
    auswahlDiv.innerHTML = ""; //wieder leer anfangen

    let auswahl: string = <string>localStorage.getItem("selected");

    let gesamtpreis: string = <string>localStorage.getItem("Summe");

    let inhalt: HTMLElement = document.createElement("Reservierung");
    // if (auswahl == null) { // damit nicht "NaN" angezeigt wird
    //     inhalt.innerHTML = "Keine auswahl vorhanden";
    // }
    // else {
    inhalt.innerHTML = auswahl + "<br>" + gesamtpreis;
    //}
    auswahlDiv.appendChild(inhalt); //inhalt in das gefundene div

    let submitButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submitbutton");
    submitButton.addEventListener("click", handleSubmit);

    async function handleSubmit(): Promise<void> { // auswahl aus LocalStorage in DB speichern, Formulardaten mitsenden

        let auswahl: string = "";

        //gibt selected und summe
        for (let index: number = 0; index < localStorage.length; index++) {
            let localKey: string = <string>localStorage.key(index); // key aus LocalStorage
            let localValue: string = <string>localStorage.getItem(localKey); // value aus LocalStorage

            auswahl += localKey + "=" + localValue + "&";  // LocalStorage in URL Form
        }

        /// irgendwas das name ändert ?
        let formData: FormData = new FormData(document.forms[0]);
        // let serverURL: string = "https://aufgabea.herokuapp.com";
        // let serverURL: string = "http://localhost:8100";
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url += "/addName" + "?" + auswahl + query.toString(); // Formular in URL + localstorage

        //irgendwas das Status ändert
        url += "/makeReserviert" + "?" + auswahl + query.toString(); // Formular in URL + localstorage


        let formular: HTMLFormElement = <HTMLFormElement>document.getElementById("formCheckout"); // Formular nach dem Absenden zurücksetzen
        if (formular)
            formular.reset();

        //await fetch(url);

        alert("Wir sehen uns im ASTA Büro!"); // Benachrichtigung an Nutzer
    }

}