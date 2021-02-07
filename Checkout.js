"use strict";
var AufgabeA;
(function (AufgabeA) {
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        let auswahlDiv = document.getElementById("Auswahl");
        auswahlDiv.innerHTML = "";
        let auswahl = localStorage.getItem("selected");
        let gesamtpreis = localStorage.getItem("Summe");
        let inhalt = document.createElement("Reservierung");
        inhalt.innerHTML = auswahl + "<br>" + gesamtpreis;
        auswahlDiv.appendChild(inhalt);
        let submitButton = document.getElementById("submitbutton");
        submitButton.addEventListener("click", handleSubmit);
    }
    async function handleSubmit(evt) {
        evt.preventDefault();
        let url = "https://aufgabea.herokuapp.com";
        let checkoutName = document.getElementById("checkout-name");
        let query = new URLSearchParams();
        query.append("ids", localStorage.getItem("ids"));
        query.append("name", checkoutName.value);
        url += "/makeReserviert?" + query.toString();
        let formular = document.getElementById("formCheckout");
        if (formular)
            formular.reset();
        localStorage.removeItem("selected");
        localStorage.removeItem("Summe");
        await fetch(url);
        alert("Wir sehen uns im ASTA Büro!");
    }
})(AufgabeA || (AufgabeA = {}));
//# sourceMappingURL=Checkout.js.map