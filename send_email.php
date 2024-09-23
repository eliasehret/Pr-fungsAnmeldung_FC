<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Formulardaten sammeln
    $vorname = htmlspecialchars($_POST['Vorname']);
    $nachname = htmlspecialchars($_POST['Nachname']);
    $geburtstag = htmlspecialchars($_POST['Geburtstag']);
    $graduierung = htmlspecialchars($_POST['graduierung']);

    // E-Mail-Einstellungen
    $to = 'elias.kb.ehret@gmail.com'; // Deine E-Mail-Adresse hier einfügen
    $subject = 'Neue Anmeldung von ' . $vorname . ' ' . $nachname;
    $message = "Vorname: $vorname\nNachname: $nachname\nGeburtstag: $geburtstag\nGraduierung: $graduierung";

    // Falls ein Bild hochgeladen wurde, füge das Bild hinzu
    if (isset($_FILES['foto']) && $_FILES['foto']['error'] == UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['foto']['tmp_name'];
        $fileName = $_FILES['foto']['name'];
        $fileSize = $_FILES['foto']['size'];
        $fileType = $_FILES['foto']['type'];
        $fileNameCmps = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));

        // Überprüfen, ob die Dateierweiterung erlaubt ist
        $allowedExts = array('jpg', 'jpeg', 'png', 'gif');
        if (in_array($fileExtension, $allowedExts)) {
            $fileContent = file_get_contents($fileTmpPath);
            $boundary = md5("random"); // Grenzwert zur Trennung der Teile
            $headers = "From: noreply@deinedomain.com\r\n";
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
            
            // Nachricht mit Datei anhängen
            $message = "--$boundary\r\n";
            $message .= "Content-Type: text/plain; charset=UTF-8\r\n";
            $message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
            $message .= "$message\r\n";
            $message .= "--$boundary\r\n";
            $message .= "Content-Type: $fileType; name=\"$fileName\"\r\n";
            $message .= "Content-Transfer-Encoding: base64\r\n";
            $message .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n\r\n";
            $message .= chunk_split(base64_encode($fileContent)) . "\r\n";
            $message .= "--$boundary--";

            // E-Mail senden
            if (mail($to, $subject, $message, $headers)) {
                echo "E-Mail wurde erfolgreich gesendet!";
            } else {
                echo "Es gab ein Problem beim Versenden der E-Mail.";
            }
        } else {
            echo "Nicht erlaubtes Dateiformat!";
        }
    } else {
        // E-Mail senden ohne Dateianhang
        $headers = "From: noreply@deinedomain.com\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        
        if (mail($to, $subject, $message, $headers)) {
            echo "E-Mail wurde erfolgreich gesendet!";
        } else {
            echo "Es gab ein Problem beim Versenden der E-Mail.";
        }
    }
} else {
    echo "Ungültige Anfrage!";
}
?>

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Formulardaten sammeln
    $firstName = $_POST['Vorname'];
    $lastName = $_POST['Nachname'];
    $birthdate = $_POST['Geburtstag'];
    $graduation = $_POST['graduierung'];
    $picture = $_POST['foto'];

    // E-Mail-Adresse, an die gesendet wird
    $to = "elias.kb.ehret@gmail.com";

    // Betreff der E-Mail
    $subject = "Neue Nachricht vom Kontaktformular";

    // E-Mail-Inhalt
    $body = "Vorname: $firstName\n";
    $body .= "Nachname: $lastName\n";
    $body .= "Geburtstag: $birthdate\n";
    $body .= "Graduierung: $graduation\n";
    $body .= "foto: $picture";


    // Header für E-Mail
    $headers = "From: $email";

    // Senden der E-Mail
    if (mail($to, $subject, $body, $headers)) {
        echo "E-Mail erfolgreich gesendet.";
    } else {
        echo "Fehler beim Senden der E-Mail.";
    }
}