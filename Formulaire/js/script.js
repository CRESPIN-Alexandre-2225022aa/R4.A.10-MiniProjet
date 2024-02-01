function verifierFormulaire() {
    let civiliteRadio = document.getElementsByName('civilite');
    let nom = document.getElementById('name').value;
    let prenom = document.getElementById('prenom').value;
    let mail = document.getElementById('mail').value;
    let tel = document.getElementById('tel').value;
    let adresse = document.getElementById('adresse').value;
    let codePostal = document.getElementById('codePostal').value;
    let ville = document.getElementById('ville').value;
    let carteRadio = document.getElementsByName('carte');
    let numCarte = document.getElementById('numCarte').value;
    let codeSecurite = document.getElementById('codeSecurite').value;

    let civilite = "";
    for (let i = 0; i < civiliteRadio.length; i++) {
        if (civiliteRadio[i].checked) {
            civilite = civiliteRadio[i].value;
        }
    }
    if(civilite == ""){
        document.getElementById('feedback').innerHTML='pas de civilité donné';
        return 0;
    }
    for (let i = 0; i < 10; i++) {
        if (nom.indexOf(i) != -1 || prenom.indexOf(i) != -1) {
            document.getElementById('feedback').innerHTML='pas de nombre dans un nom ou un prenom';
            return 0;
        }
    }

    if(Number.isNaN(parseInt(tel)) || Number.isNaN(parseInt(codePostal)) || Number.isNaN(parseInt(numCarte)) || Number.isNaN(parseInt(codeSecurite))){
        document.getElementById('feedback').innerHTML='les champs telephone, code postale, numéro de carte et code de sécurité doivent contenir exclusivement des chiffres';
        return 0;
    }

    let carte = "";
    for (let i = 0; i < carteRadio.length; i++) {
        if(carteRadio[i].checked){
            carte = carteRadio[i].value;
        }
    }
    if(carte == ""){
        document.getElementById('feedback').innerHTML='pas de type de carte donné';
        return 0;
    }

    alert("Vous avez envoyé vos données avec ces paramètre : \n" + 
            "civilite : " + civilite + "\n" +
            "nom : " + nom + "\n" +
            "prenom : " + prenom + "\n" +
            "mail : " + mail + "\n" +
            "tel : " + tel + "\n" +
            "adresse : " + adresse + "\n" +
            "code postal : " + codePostal + "\n" +
            "ville : " + ville + "\n" +
            "type de carte : " + carte + "\n" +
            "numero de carte : " + numCarte + "\n" +
            "code de securite : " + codeSecurite + "\n");
}