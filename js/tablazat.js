document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const nevInput = document.getElementById("nev");
    const eletkorInput = document.getElementById("eletkor");
    const tablazatBody = document.getElementById("tablazat-body");
    const keresInput = document.getElementById("keres");
    let szerkesztesIndex = null;

    let adatok = JSON.parse(localStorage.getItem("adatok")) || [];

    function frissitTabla() {
        tablazatBody.innerHTML = "";
        const keresesiSzoveg = keresInput.value.toLowerCase();

        adatok.forEach((elem, index) => {
            // Minden oszlop adatát keresés szerint szűrjük
            if (
                elem.nev.toLowerCase().includes(keresesiSzoveg) ||
                elem.eletkor.toString().includes(keresesiSzoveg)
            ) {
                const sor = document.createElement("tr");
                sor.innerHTML = `
                    <td>${elem.nev}</td>
                    <td>${elem.eletkor}</td>
                    <td>
                        <button class="edit" onclick="szerkeszt(${index})">Szerkesztés</button>
                        <button class="delete" onclick="torol(${index})">Törlés</button>
                    </td>
                `;
                tablazatBody.appendChild(sor);
            }
        });

        localStorage.setItem("adatok", JSON.stringify(adatok));
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Validálás
        if (!form.checkValidity()) {
            alert("Hibás adatbevitel! Kérlek, ellenőrizd a mezőket.");
            return;
        }

        const ujAdat = {
            nev: nevInput.value,
            eletkor: eletkorInput.value
        };

        if (szerkesztesIndex === null) {
            // Új adat hozzáadása
            adatok.push(ujAdat);
        } else {
            // Meglévő adat frissítése
            adatok[szerkesztesIndex] = ujAdat;
            szerkesztesIndex = null;
        }

        frissitTabla();
        form.reset();
    });

    window.szerkeszt = (index) => {
        szerkesztesIndex = index;
        nevInput.value = adatok[index].nev;
        eletkorInput.value = adatok[index].eletkor;
    };

    window.torol = (index) => {
        adatok.splice(index, 1);
        frissitTabla();
    };

    window.rendez = (oszlop) => {
        adatok.sort((a, b) => {
            let ertekA = Object.values(a)[oszlop].toString().toLowerCase();
            let ertekB = Object.values(b)[oszlop].toString().toLowerCase();
            return ertekA.localeCompare(ertekB, "hu", { numeric: true });
        });
        frissitTabla();
    };

    keresInput.addEventListener("input", frissitTabla); // Keresés frissítése

    frissitTabla();
});
