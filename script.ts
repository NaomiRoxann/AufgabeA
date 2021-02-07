namespace AufgabeA {
    window.addEventListener("load", handleLoad); auf
    export let url: string = "https://aufgabea.herokuapp.com";
    export let form: HTMLFormElement;

    export async function handleLoad(_event: Event): Promise<void> {
        let response: Response = await fetch(url + "/allArtikel");
        let data: string = await response.text();
        ArtikelLaden(JSON.parse(data));
        form = <HTMLFormElement>document.getElementById("FormArtikel");
    }

    export interface Artikel {
        _id: string;
        titel: string;
        description: string;
        pic: string;
        price: number;
        Status: string;
        Name: string;
    }
    function ArtikelLaden(data: Artikel[]): void {

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

        for (let i: number = 0; i < data.length; i++) {

            let DataFrame = document.createElement("tr");

            let checkbox: HTMLInputElement;
            if (data[i].Status == "Frei") {
                checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.setAttribute("price", data[i].price.toFixed(2));
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

    function handleChange(_event: Event): void {
        showAuswahl();

    }

    function showAuswahl(): void {
        let price: number = 0;
        let auswahl: HTMLDivElement = <HTMLDivElement>document.querySelector("div#Auswahl");
        auswahl.innerHTML = "";

        let formData: FormData = new FormData(AufgabeA.form);
        localStorage.setItem("selected", "");
        localStorage.setItem("ids", "");
        let ids = [];
        let selected = [];
        for (let entry of formData.values()) {
            let selector: string = "[value='" + entry + "']";
            let artikel: HTMLInputElement = <HTMLInputElement>document.querySelector(selector);
            let artikelPrice: number = Number(artikel.getAttribute("price"));
            let id = Number(artikel.getAttribute("id"));
            ids.push(id);
            selected.push(entry);

            price += artikelPrice;


        }
        localStorage.setItem("ids", ids.join(", "));
        localStorage.setItem("selected", selected.join(", "));
        auswahl.innerHTML += selected.join(", ") + "<br>";
        auswahl.innerHTML += "Summe: €" + price.toFixed(2);
        localStorage.setItem("Summe", "Summe: " + JSON.stringify(price.toFixed(2) + " €"));
    }


}