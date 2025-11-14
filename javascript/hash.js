const textoInput = document.getElementById('texto-hash-input');
const algoritmoSelect = document.getElementById('algoritmo-select');
const resultadoOutput = document.getElementById('hash-output');
const btnHash = document.getElementById('btn-hash');
const btnLimpar = document.getElementById('btn-limpar-hash');

function stringToArrayBuffer(str) {
    const encoder = new TextEncoder();
    return encoder.encode(str);
}

function bufferToHex(buffer) {
    const byteArray = new Uint8Array(buffer);
    const hexParts = [];
    byteArray.forEach(byte => {
        hexParts.push(byte.toString(16).padStart(2, '0'));
    });
    return hexParts.join('');
}

async function gerarHash() {
    const textoClaro = textoInput.value;
    const algoritmo = 'SHA-256'; 

    if (!textoClaro) {
        resultadoOutput.textContent = 'Por favor, insira o texto de entrada.';
        return;
    }

    try {
        const bufferEntrada = stringToArrayBuffer(textoClaro);

        const hashBuffer = await crypto.subtle.digest(algoritmo, bufferEntrada);

        const hashHex = bufferToHex(hashBuffer);

        resultadoOutput.textContent = hashHex;
    } catch (error) {
        resultadoOutput.textContent = `Erro ao gerar hash: ${error.message}`;
        console.error("Erro na operação de hash:", error);
    }
}

btnHash.addEventListener('click', gerarHash);

btnLimpar.addEventListener('click', () => {
    textoInput.value = '';
    resultadoOutput.textContent = 'O resultado do hash (digest) aparecerá aqui.';
});