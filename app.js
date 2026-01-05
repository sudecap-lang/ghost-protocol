// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const NEXT_DNS_ID = "6ddbfb"; 
// ---------------------------------

const output = document.getElementById('terminal-output');
const vault = document.getElementById('secret-vault');

// PROTEÇÃO DE INICIALIZAÇÃO
if (vault) vault.style.display = 'none';
document.body.style.filter = "none";

function logTerminal(msg, color = "#00ffaa") {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span style="color:${color}">[${time}] > ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

async function runNetworkVerify() {
    logTerminal("VERIFICANDO INTEGRIDADE DO TÚNEL...", "#00aaff");
    try {
        const res = await fetch(`https://test.nextdns.io/?t=${Date.now()}`);
        const text = await res.text();
        
        if (text.includes(NEXT_DNS_ID)) {
            logTerminal("SINAL: VERDE (PERFIL 6DDBFB ATIVO)", "#34c759");
        } else if (text.includes("GIGA MAIS")) {
            logTerminal("SINAL: VERMELHO (OPERADORA DETECTADA)", "#ff3b30");
            logTerminal("AÇÃO: REINSTALE O PERFIL DE CONFIGURAÇÃO.", "#ff9500");
        } else {
            logTerminal("SINAL: LARANJA (DNS GENÉRICO ATIVO)", "#ff9500");
        }
    } catch (e) {
        logTerminal("ERRO: FALHA NA COMUNICAÇÃO COM O ESCUDO.", "#ff3b30");
    }
}

window.onload = () => {
    logTerminal("GHOST_OS v24.0 ONLINE");
    runNetworkVerify();
};

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmdRaw = input.value; 
        const cmdClean = cmdRaw.toLowerCase().trim();
        input.value = '';

        if (cmdClean === "verify") {
            runNetworkVerify();
        } else if (cmdClean === "clear") {
            output.innerHTML = "";
            logTerminal("TERMINAL REINICIADO.");
        } else if (cmdRaw === SECRET_PASS) {
            logTerminal("ACESSO AUTORIZADO.", "#00ff00");
            if (vault) {
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
            }
        } else {
            logTerminal(`COMANDO '${cmdRaw}' NÃO RECONHECIDO.`, "#ff3b30");
        }
    }
}

function runPrivacyScrub() {
    logTerminal("LIMPANDO RASTROS...");
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("SUCESSO.");
}

function toggleStealth() {
    if (document.body.style.filter.includes("brightness")) {
        document.body.style.filter = "none";
        logTerminal("STEALTH: OFF");
    } else {
        document.body.style.filter = "brightness(0.7) contrast(1.1)";
        logTerminal("STEALTH: ON");
    }
}
