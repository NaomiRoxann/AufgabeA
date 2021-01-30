"use strict";
// siehe EIA L04 Implementation
var AufgabeA;
(function (AufgabeA) {
    function ArtikelLaden(_artikel) {
        for (let allartikel in _artikel) { //geht über Artikel
            // console.log(allartikel);
            let artikel = _artikel[allartikel];
            let group = createMultiple(artikel); //group in func (return) wird group in Schleife zugewiesen
            let fieldset = document.querySelector("fieldset#" + allartikel); //verbindet mit HTML
            fieldset.appendChild(group);
        }
        function createMultiple(_artikel) {
            let group = document.createElement("div"); //neue group in func
            for (let artikel of _artikel) {
                let checkbox = document.createElement("input"); //Auswahl Kästchen erstellen, unten: mit . definieren
                checkbox.type = "checkbox";
                checkbox.setAttribute("price", artikel.price.toFixed(2)); //Attribut price einführen, Fixed(2) macht 2 Nachkommastellen
                checkbox.value = artikel.name;
                checkbox.id = artikel.name; //verbindet Kästchen mit Inhalt
                let label = document.createElement("label"); //generiert die Infos vom Artikel
                label.textContent = artikel.name;
                label.textContent = artikel.description;
                label.textContent = artikel.pic;
                label.htmlFor = artikel.name; //verbindet Inhalt mit Kästchen
                group.appendChild(checkbox); //verbindet Kästchen mit group in func
                group.appendChild(label); //verbindet Infos mit group in func
            }
            return group;
        }
    }
    AufgabeA.ArtikelLaden = ArtikelLaden;
})(AufgabeA || (AufgabeA = {}));
//# sourceMappingURL=ArtikelLaden.js.map