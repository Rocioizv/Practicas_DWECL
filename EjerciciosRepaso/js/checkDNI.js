
export const checkDNI = {
    init: (dni, letra) => {

        var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K',
            'E', 'T'];

        var letterIsOk = (dni % 23);
        
        console.log(letterIsOk);
    
    }
}