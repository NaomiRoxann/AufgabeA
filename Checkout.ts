namespace AufgabeA {

    window.addEventListener("load", handleLoad);

    function handleLoad() {
        let auswahlDiv: HTMLElement = <HTMLElement>document.getElementById("Auswahl");
        auswahlDiv.innerHTML = "";

        let auswahl: string = <string>localStorage.getItem("selected");

        let gesamtpreis: string = <string>localStorage.getItem("Summe");

        let inhalt: HTMLElement = document.createElement("Reservierung");
        inhalt.innerHTML = auswahl + "<br>" + gesamtpreis;
        auswahlDiv.appendChild(inhalt);

        let submitButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submitbutton");
        submitButton.addEventListener("click", handleSubmit);
    }



    async function handleSubmit(evt: MouseEvent): Promise<void> {
        evt.preventDefault();
        let url: string = "https://aufgabea.herokuapp.com";

        let checkoutName: HTMLInputElement = document.getElementById("checkout-name") as HTMLInputElement;
        let query: URLSearchParams = new URLSearchParams();

        query.append("ids", localStorage.getItem("ids"));
        query.append("name", checkoutName.value);
        url += "/makeReserviert?" + query.toString();

        let formular: HTMLFormElement = <HTMLFormElement>document.getElementById("formCheckout");
        if (formular)
            formular.reset();
        localStorage.removeItem("selected");
        localStorage.removeItem("Summe");

        await fetch(url);

        alert("Wir sehen uns im ASTA Büro!");
    }

}