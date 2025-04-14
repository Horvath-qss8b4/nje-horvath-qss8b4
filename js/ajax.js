const code = "BBBBBBefg456"; // A felhasználó egyedi kódja

// Read: Lekéri az adatokat és megjeleníti őket
function getData() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://gamf.nhely.hu/ajax2/", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            displayData(response);
        }
    };

    xhr.send(`op=read&code=${code}`);
}

function displayData(data) {
    const dataDisplay = document.getElementById("dataDisplay");
    const stats = document.getElementById("stats");

    dataDisplay.innerHTML = "";
    stats.innerHTML = "";

    let totalHeight = 0;
    let maxHeight = -Infinity;

    data.list.forEach(item => {
        dataDisplay.innerHTML += `
            <p>ID: ${item.id} | Név: ${item.name} | Magasság: ${item.height} | Súly: ${item.weight} | Kód: ${item.code}</p>
        `;
        totalHeight += parseFloat(item.height);
        if (parseFloat(item.height) > maxHeight) {
            maxHeight = parseFloat(item.height);
        }
    });

    const avgHeight = totalHeight / data.list.length;
    stats.innerHTML = `
        <p>Összeg: ${totalHeight}</p>
        <p>Átlag: ${avgHeight.toFixed(2)}</p>
        <p>Legnagyobb Magasság: ${maxHeight}</p>
    `;
}

// Create: Létrehoz egy új rekordot
function createData() {
    const name = document.getElementById("createName").value;
    const height = document.getElementById("createHeight").value;
    const weight = document.getElementById("createWeight").value;

    if (validateInput(name, height, weight)) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://gamf.nhely.hu/ajax2/", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                try {
                    const response = xhr.responseText.trim(); // Az egész választ nyers formában vesszük
                    console.log(response); // Kiíratjuk a válasz teljes tartalmát a konzolra

                    // Ha a válasz '1', akkor sikerült létrehozni a rekordot
                    if (response === "1") {
                        document.getElementById("createResult").innerText = "Rekord sikeresen létrehozva!";
                    } else {
                        document.getElementById("createResult").innerText = "Hiba történt a rekord létrehozásakor!";
                    }
                } catch (e) {
                    // Ha JSON parsing hiba történt
                    document.getElementById("createResult").innerText = "Hiba történt a válasz feldolgozása során!";
                }
            }
        };

        xhr.send(`op=create&name=${name}&height=${height}&weight=${weight}&code=${code}`);
    }
}

// Update: Módosítja a rekordot
function getDataForId() {
    const id = document.getElementById("updateId").value;

    if (id) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://gamf.nhely.hu/ajax2/", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                const item = response.list.find(item => item.id == id); // Az id alapján keres
                if (item) {
                    document.getElementById("updateName").value = item.name;
                    document.getElementById("updateHeight").value = item.height;
                    document.getElementById("updateWeight").value = item.weight;
                } else {
                    alert("Nem található adat ezzel az ID-val.");
                }
            }
        };
        xhr.send(`op=read&id=${id}&code=${code}`);
    }
}

// Update: Módosítja a rekordot
function updateData() {
    const id = document.getElementById("updateId").value;
    const name = document.getElementById("updateName").value;
    const height = document.getElementById("updateHeight").value;
    const weight = document.getElementById("updateWeight").value;

    if (validateInput(name, height, weight)) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://gamf.nhely.hu/ajax2/", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = xhr.responseText.trim();
                
                // Ha a válasz 1, akkor sikerült a módosítás
                if (response === "1") {
                    document.getElementById("updateResult").innerText = "Rekord sikeresen módosítva!";
                } else {
                    document.getElementById("updateResult").innerText = "Hiba történt a rekord módosításakor!";
                }
            }
        };

        xhr.send(`op=update&id=${id}&name=${name}&height=${height}&weight=${weight}&code=${code}`);
    }
}

// Delete: Törli a rekordot
function deleteData() {
    const id = document.getElementById("deleteId").value;

    if (id) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://gamf.nhely.hu/ajax2/", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = xhr.responseText.trim(); // Válasz szöveg eltávolítása

                // Ha a válasz 1, sikerült a törlés
                if (response === "1") {
                    document.getElementById("deleteResult").innerText = "Rekord sikeresen törölve!";
                } else {
                    document.getElementById("deleteResult").innerText = "Hiba történt a rekord törlésében!";
                }
            }
        };

        xhr.send(`op=delete&id=${id}&code=${code}`);
    }
}

// Validáció: Ellenőrzi a bemeneteket
function validateInput(name, height, weight) {
    if (!name || !height || !weight) {
        alert("Minden mezőt ki kell tölteni!");
        return false;
    }

    if (name.length > 30) {
        alert("A név nem lehet hosszabb 30 karakternél!");
        return false;
    }

    return true;
}
