let ligneVide = 4;
let columnVide = 4;
let score = 0;

function move(ligne,column) {
    if (((ligneVide - ligne == 1 || ligneVide - ligne == -1) && columnVide == column) || ((columnVide - column == 1 || columnVide - column == -1) && ligneVide == ligne)) {
        let caseVide = document.getElementById(ligneVide + "" + columnVide);
        caseVide.type="button";
        let value = document.getElementById(ligne + "" + column).value;
        caseVide.value=value;
        ligneVide = ligne;
        columnVide = column;
        document.getElementById(ligneVide + "" + columnVide).type="hidden";
        score += 1
        document.getElementById('coup').innerHTML = score;
    }
}