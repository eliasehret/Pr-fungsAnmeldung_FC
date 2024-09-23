function previewImage(event) {
    const file = event.target.files[0]; // Das hochgeladene Bild
    const preview = document.getElementById('imagePreview'); // Das Bild-Element für die Vorschau

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            preview.src = e.target.result; // Setzt die Quelle des Bildes auf das hochgeladene Bild
            preview.style.display = 'block'; // Zeigt das Bild an
        };

        reader.readAsDataURL(file); // Liest die Datei und wandelt sie in eine URL um
    }
}

document.getElementById("#formular#").addEventListener("submit", function(event){
    event.preventDefault();

    const data = {
        firstName: event.target.firstName,
        lastNmae: event.target.lastName,
        birthdate: event.target.birthdate
    };

    fetch("");

});