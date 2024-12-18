// import { checkDNI } from "./checkDNI";

// checkDNI.init(".dniNum", ".letra");

var boton = document.getElementById("submit");

boton.addEventListener("click", () => {

    var inputDNI = document.getElementById("dniNum");
    var valorDNI = inputDNI.value;

    var inputLetra = document.getElementById("letra");
    var valorLetra = inputLetra.value.toUpperCase();

    console.log(valorLetra);

    var resto = (valorDNI % 23);

    var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K',
        'E', 'T'];

    for (let i = 0; i < letras.length; i++) {
        if (i == resto) {
            if (letras[i] == valorLetra) {
                alert("La letra es correcta");
            } else {
                alert("La letra es incorrecta. Su letra es: " + letras[i]);
            }
        }
    }


});