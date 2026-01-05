// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const NEXT_DNS_ID = "6ddbfb"; 
// ---------------------------------

const output = document.getElementById('terminal-output');
const vault = document.getElementById('secret-vault');

function forceLock() {
    if (vault) {
        vault.style.display = 'none';
        vault.style.visibility = 'hidden';
    }
}

function logTerminal(msg, color = "#00ffaa") {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span style="color:${color}">[${time}] > ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

window.onload = () => {
    forceLock();
    logTerminal("SISTEMA GHOST v33.0 ONLINE");
    logTerminal("STATUS: PROTEÇÃO VERDE ATIVA", "#34c759");
};

// LIMPEZA DE EMERGÊNCIA (PROTOCOLO DE PÂNICO)
function emergencyWipe() {
    logTerminal("!!! PROTOCOLO DE EMERGÊNCIA ATIVADO !!!", "#ff3b30");
    localStorage.clear();
    sessionStorage.clear();
    // Redireciona para um site neutro para camuflagem
    window.location.replace("https://www.reuters.com");
}

async function runNetworkVerify() {
    logTerminal("TESTANDO TÚNEL DE SEGURANÇA...", "#00aaff");
    try {
        await fetch(`https://test.nextdns.io/?t=${Date.now()}`, { mode: 'no-cors' });
        logTerminal("SHIELD: VERDE (PERFEITO)", "#34c759");
    } catch (e) {
        logTerminal("AVISO: INTERFERÊNCIA DETECTADA", "#ff9500");
    }
}

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmdRaw = input.value;
        const cmdClean = cmdRaw.toLowerCase().trim();
        input.value = '';

        if (cmdClean === "verify") {
            runNetworkVerify();
        } 
        else if (cmdClean === "wipe") { // Atalho para o comando
            emergencyWipe();
        }
        else if (cmdClean === "logs") {
            window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
        }
        else if (cmdRaw === SECRET_PASS) {
            logTerminal("CHAVE MESTRA ACEITA.", "#00ff00");
            if (vault) {
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
            }
        } 
        else {
            logTerminal(`ERRO: '${cmdRaw}' NÃO RECONHECIDO.`, "#ff3b30");
            forceLock();
        }
    }
}

function runPrivacyScrub() {
    localStorage.clear();
    logTerminal("DADOS DE NAVEGAÇÃO APAGADOS.");
}

function toggleStealth() {
    document.body.style.filter = document.body.style.filter.includes("brightness") ? "none" : "brightness(0.6) contrast(1.2)";
}
