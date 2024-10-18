var curretAgegroup = "";

var belt_selector = document.getElementById("graduierung_selector");



function previewImage(event) {
    const file = event.target.files[0]; // Das hochgeladene Bild
    const preview = document.getElementById('imagePreview'); // Das Bild-Element für die Vorschau

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            preview.src = e.target.result; // Setzt die Quelle des Bildes auf das hochgeladene Bild
            preview.style.display = 'block'; // Zeigt das Bild an

            preview.onload = function() {
                const originalWidth = preview.naturalWidth;
                const originalHeight = preview.naturalHeight;
    
                // Verhältnis zwischen Breite und Höhe berechnen
                const aspectRatio = originalWidth / originalHeight;
    
                // Die Höhe bleibt gleich, die Breite wird im Verhältnis angepasst
                preview.style.width = (preview.height * aspectRatio) + 'px';
            }        
        };
         
        reader.readAsDataURL(file); // Liest die Datei und wandelt sie in eine URL um
    }
}

document.getElementById("anmeldungsFormular").addEventListener("submit", async function(event){
    event.preventDefault();

    if(belt_selector.value == "") {
        alert("Bitte wähle eine Graduierung aus.");
        return;
    }


    const fileInput = event.target.photo.files[0];
    const reader = new FileReader();

    if(fileInput == null){

        // Daten für den JSON-Body
        const data = {
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,

            birthday: event.target.birthday.value,
            category: event.target.category.value,
            graduation: event.target.graduation.value,

            belt: event.target.gürtelwahl.value,
            wkupassAbgegeben: event.target.wkupassAbgegeben.value,
            Tshirt: event.target.shirtSize.value,
            
            photo: "",
            mimeType: "",

            consent: event.target.consent.value
        };

        var url = "";

        if(curretAgegroup == "") {
            alert("Eingabe Fehler: Alter muss angegeben sein!");
            return;
        }

        if(curretAgegroup == "Budo Kids") url = "https://prod-233.westeurope.logic.azure.com:443/workflows/cf48efe7b6304432bb520e6b1f4f3336/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=nNc4VXuK7HwiKYMtbpWSPiDADIibt6IttC502iTBEFs";
        else url = "https://prod-243.westeurope.logic.azure.com:443/workflows/5f72913b3067460980817306b9cdeea8/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Q1UNbolQLiVBshQ2owvGWS9UXB7q7kKK8ql7l-2Pe6E";


        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if(response.ok) {
                alert("Formular erfolgreich übermittelt!");

                // Clear the form here
                document.getElementById("anmeldungsFormular").reset();

                location.reload();
            } else {
                const errorData = await response.json();
                alert("Fehler bei der Übermittlung: " + JSON.stringify(errorData));
            }
        } catch (error) {
            alert("Fehler bei der Übermittlung: " + error.message);
        }
    }
    else 
    {
        reader.onloadend = async function() {
            // Datei in Base64 konvertieren
            const base64String = reader.result.split(',')[1]; 
            // MIME-Typ der Datei erfassen
            const mimeType = fileInput.type;
            
            // Daten für den JSON-Body
            const data = {
                firstName: event.target.firstName.value,
                lastName: event.target.lastName.value,
    
                birthday: event.target.birthday.value,
                category: event.target.category.value,
                graduation: event.target.graduation.value,
    
                belt: event.target.gürtelwahl.value,
                wkupassAbgegeben: event.target.wkupassAbgegeben.value,
                Tshirt: event.target.shirtSize.value,
                
                photo: base64String,
                mimeType: mimeType,
    
                consent: event.target.consent.value
            };
    
            var url = "";
    
            if(curretAgegroup == "") {
                alert("Eingabe Fehler: Alter muss angegeben sein!");
                return;
            }
    
            if(curretAgegroup == "Budo Kids") url = "https://prod-233.westeurope.logic.azure.com:443/workflows/cf48efe7b6304432bb520e6b1f4f3336/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=nNc4VXuK7HwiKYMtbpWSPiDADIibt6IttC502iTBEFs";
            else url = "https://prod-243.westeurope.logic.azure.com:443/workflows/5f72913b3067460980817306b9cdeea8/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Q1UNbolQLiVBshQ2owvGWS9UXB7q7kKK8ql7l-2Pe6E";
    
    
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
    
                if(response.ok) {
                    alert("Formular erfolgreich übermittelt!");
    
                    // Clear the form here
                    document.getElementById("anmeldungsFormular").reset();
    
                    location.reload();
                } else {
                    const errorData = await response.json();
                    alert("Fehler bei der Übermittlung: " + JSON.stringify(errorData));
                }
            } catch (error) {
                alert("Fehler bei der Übermittlung: " + error.message);
            }
        };
    
        // Lese die Datei als Data-URL (Base64)
        reader.readAsDataURL(fileInput);
    }

    
});


window.onload = function(){
    callAlterseingabeWithCurrentValue();
}

function callAlterseingabeWithCurrentValue(){
    alterEingabe(document.getElementById("birthday").value);
}

function alterEingabe(input){
    console.log(input);

    var alter = getAlter(input);
     
    if(alter < 10){
        setAltersgruppe("Budo Kids");
    }
    else if(alter >= 10 && alter < 16){
        setAltersgruppe("Jugendlich");
    }
    else if(alter >= 16 && alter < 18){
        setAltersgruppe("Jugendlich 2");
    }
    else if(alter >= 18){
        setAltersgruppe("Erwachsen");
    }
}

function getAlter(input){
    var geburtstag = new Date(input);
    var heute = new Date();

    var alter = heute.getFullYear() - geburtstag.getFullYear();
    var monatsDifferenz = heute.getMonth() - geburtstag.getMonth();

    // Überprüfen, ob der Geburtstag in diesem Jahr noch nicht war
    if (monatsDifferenz < 0 || (monatsDifferenz === 0 && heute.getDate() < geburtstag.getDate())) {
        alter--;
    }

    return alter;
}


function setAltersgruppe(Altersgruppe){

    curretAgegroup = Altersgruppe;

    if(Altersgruppe == "Budo Kids"){
        setBeltSteps("Budo Kids");
    }
    else if(Altersgruppe == "Jugendlich"){
        setBeltSteps("Jugendlich");
    }
    else if(Altersgruppe == "Jugendlich 2"){
        setBeltSteps("Jugendlich 2");
    }
    else if(Altersgruppe == "Erwachsen"){
        setBeltSteps("Erwachsen");
    }
}

function setBeltSteps(altersgruppe){
    console.log(altersgruppe);

    
    var sportart_selector = document.getElementById("sportart_selector");
    var shirt_div = document.getElementById("T-Shirt_div");

    belt_selector.options.length = 0;

    if(altersgruppe == "Budo Kids")
    {
        //create empty selection slot befor the others
        const newOption = document.createElement('option');
        newOption.value = "";
        newOption.disabled = true;
        newOption.selected = true;
        newOption.textContent = "Bitte auswählen";
        belt_selector.insertBefore(newOption, belt_selector.firstChild);

        belt_selector.add(new Option("Weiß-Gelb"));
        belt_selector.add(new Option("Gelb"));
        belt_selector.add(new Option("Gelb-Orange"));
        belt_selector.add(new Option("Orange"));
	    belt_selector.add(new Option("Orange-Grün"));
        belt_selector.add(new Option("Grün"));

        //delete all options with the value "Budo Kids"
        for (let i = sportart_selector.length - 1; i >= 0; i--) {
            if (sportart_selector[i].value === "Budo Kids") {
                sportart_selector[i].remove();
            }
        }
        sportart_selector.add(new Option("Budo Kids"));
        sportart_selector.value = "Budo Kids";
        sportart_selector.disabled = true;

        shirt_div.classList.remove("none");
    }
    else 
    {
        //delete all options with the value "Budo Kids"
        for (let i = sportart_selector.length - 1; i >= 0; i--) {
            if (sportart_selector[i].value === "Budo Kids") {
                sportart_selector[i].remove();
            }
        }

        sportart_selector.disabled = false;
        shirt_div.classList.add("none");

        //set T-shirt to Nein
        shirt_div.children[4].children[0].checked = true;


        if(altersgruppe == "Erwachsen")
        {
            belt_selector.add(new Option("Gelb"));
            belt_selector.add(new Option("Orange"));
            belt_selector.add(new Option("Grün"));
            belt_selector.add(new Option("Blau"));
        }
        if(sportart_selector.value == "Kickboxen"){
            
            if(altersgruppe == "Jugendlich")
            {
                belt_selector.add(new Option("Gelb"));
                belt_selector.add(new Option("Orange"));
                belt_selector.add(new Option("Grün 1"));
                belt_selector.add(new Option("Grün 2"));
                belt_selector.add(new Option("Blau 1"));
                belt_selector.add(new Option("Blau 2"));
            }
            else if(altersgruppe == "Jugendlich 2")
            {
                belt_selector.add(new Option("Gelb"));
                belt_selector.add(new Option("Orange"));
                belt_selector.add(new Option("Grün"));
                belt_selector.add(new Option("Blau 1"));
                belt_selector.add(new Option("Blau 2"));
            }
        }
        else if(sportart_selector.value == "Jiu Jitsu")
        {
            belt_selector.add(new Option("Gelb"));
            belt_selector.add(new Option("Orange"));
            belt_selector.add(new Option("Grün"));
            belt_selector.add(new Option("Blau"));
        }

        //create empty selection slot befor the others
        const newOption = document.createElement('option');
        newOption.value = "";
        newOption.disabled = true;
        newOption.selected = true;
        newOption.textContent = "Bitte auswählen";
        belt_selector.insertBefore(newOption, belt_selector.firstChild);
    }

}

function shirtSizeDisplay(input){
    var shirtSizeDisplay = document.getElementById("shirtSizeDisplay");

    console.log(input);

    if(input == "Ja"){
        shirtSizeDisplay.classList.remove("none");
    }else{
        shirtSizeDisplay.classList.add("none");
    }
}
