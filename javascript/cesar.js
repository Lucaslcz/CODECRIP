const cifraContainer = document.getElementById('cifra-container');
const textoInput = document.getElementById('texto-input');
const chaveInput = document.getElementById('chave-input');
const resultadoOutput = document.getElementById('resultado-output');
const btnCifrar = document.getElementById('btn-cifrar');
const btnDecifrar = document.getElementById('btn-decifrar');
const btnLimpar = document.getElementById('btn-limpar');

btnCifrar.disabled = false;
btnDecifrar.disabled = false;


btnLimpar.addEventListener('click', () => {
    textoInput.value = '';
    chaveInput.value = 3;
    resultadoOutput.textContent = 'O resultado aparecerá aqui.';
});

function cifraDeCesar(texto, deslocamento, modo) {
    let resultado = '';
    deslocamento = parseInt(deslocamento);

    if (modo === 'decifrar') {
        deslocamento = -deslocamento;
    }

    for (let i = 0; i < texto.length; i++) {
        let char = texto[i];
        let code = char.charCodeAt(0);

        if (code >= 65 && code <= 90) { 
            let novoCode = ((code - 65 + deslocamento) % 26);
            if (novoCode < 0) novoCode += 26;
            resultado += String.fromCharCode(novoCode + 65);
        } else if (code >= 97 && code <= 122) { 
            let novoCode = ((code - 97 + deslocamento) % 26);
            if (novoCode < 0) novoCode += 26;
            resultado += String.fromCharCode(novoCode + 97);
        } else {
            resultado += char;
        }
    }
    return resultado;
}

function executarCifragem() {
    const textoClaro = textoInput.value;
    const chave = chaveInput.value;
    if (!textoClaro || !chave) {
        resultadoOutput.textContent = 'Por favor, insira o texto e a chave.';
        return;
    }
    const textoCifrado = cifraDeCesar(textoClaro, chave, 'cifrar');
    resultadoOutput.textContent = textoCifrado;
}

function executarDecifragem() {
    const textoCifrado = textoInput.value;
    const chave = chaveInput.value;
    if (!textoCifrado || !chave) {
        resultadoOutput.textContent = 'Por favor, insira o texto cifrado e a chave.';
        return;
    }
    const textoClaro = cifraDeCesar(textoCifrado, chave, 'decifrar');
    resultadoOutput.textContent = textoClaro;
}

btnCifrar.addEventListener('click', executarCifragem);
btnDecifrar.addEventListener('click', executarDecifragem);