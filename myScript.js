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
/*
document.getElementById("#formular#").addEventListener("submit", function(event){
    event.preventDefault();

    const data = {
        firstName: event.target.firstName,
        lastNmae: event.target.lastName,
        birthdate: event.target.birthdate
    };

    fetch("");

});
*/
function setAltersgruppe(Altersgruppe){
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

function setBeltSteps(value){
    console.log(value);

    var belt_selector = document.getElementById("graduierung_selector");
    var sportart_selector = document.getElementById("sportart_selector");
    var shirt_div = document.getElementById("T-Shirt_div");

    belt_selector.options.length = 0;

    if(value == "Budo Kids")
    {
        belt_selector.add(new Option("Weiß-Gelb"));
        belt_selector.add(new Option("Gelb"));
        belt_selector.add(new Option("Gelb-Orange"));
        belt_selector.add(new Option("Orange"));

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

        if(value == "Erwachsen")
        {
            belt_selector.add(new Option("Gelb"));
            belt_selector.add(new Option("Orange"));
            belt_selector.add(new Option("Grün"));
            belt_selector.add(new Option("Blau"));
        }
        else if(value == "Jugendlich")
        {
            belt_selector.add(new Option("Gelb"));
            belt_selector.add(new Option("Orange"));
            belt_selector.add(new Option("Grün 1"));
            belt_selector.add(new Option("Grün 2"));
            belt_selector.add(new Option("Blau 1"));
            belt_selector.add(new Option("Blau 2"));
        }
        else if(value == "Jugendlich 2")
        {
            belt_selector.add(new Option("Gelb"));
            belt_selector.add(new Option("Orange"));
            belt_selector.add(new Option("Grün"));
            belt_selector.add(new Option("Blau 1"));
            belt_selector.add(new Option("Blau 2"));
        }
    }

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