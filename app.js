// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const NEXT_DNS_ID = "6ddbfb"; 
// ---------------------------------

const output = document.getElementById('terminal-output');
const vault = document.getElementById('secret-vault');

// ESTADO INICIAL
if (vault) {
    vault.style.display = 'none';
    vault.style.visibility = 'hidden';
}
document.body.style.filter = "none";

function logTerminal(msg, color = "#00ffaa") {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span style="color:${color}">[${time}] > ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

// Função de Diagnóstico
async function runNetworkVerify() {
    logTerminal("ESCANEANDO TÚNEL DE REDE...", "#00aaff");
    try {
        const res = await fetch(`https://test.nextdns.io/?t=${Date.now()}`);
        const data = await res.json();
        if (data.status === "ok" && data.configuration === NEXT_DNS_ID) {
            logTerminal("RESULTADO: ESCUDO VERDE (6DDBFB OPERALIZADO)", "#34c759");
        } else {
            logTerminal("RESULTADO: ESCUDO LARANJA (IP OK, PERFIL AUSENTE)", "#ff9500");
        }
    } catch (e) {
        logTerminal("ERRO: SERVIDOR NÃO RESPONDE", "#ff3b30");
    }
}

window.onload = () => {
    logTerminal("GHOST_OS v19.0 ONLINE");
    logTerminal("PRONTO PARA COMANDOS OU CHAVE MESTRA.");
};

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmdRaw = input.value; // Para a senha (exata)
        const cmdClean = cmdRaw.toLowerCase().trim(); // Para comandos
        input.value = '';

        // --- 1. PRIORIDADE: COMANDOS DE SISTEMA ---
        if (cmdClean === "verify") {
            runNetworkVerify();
        } 
        else if (cmdClean === "logs") {
            logTerminal("REQUISITANDO ACESSO AOS REGISTROS...");
            window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
        } 
        else if (cmdClean === "clear") {
            output.innerHTML = "";
            logTerminal("TERMINAL REINICIADO.");
        }
        // --- 2. SEGUNDA OPÇÃO: VALIDAÇÃO DE SENHA ---
        else if (cmdRaw === SECRET_PASS) {
            logTerminal("CHAVE MESTRA ACEITA. COFRE ABERTO.", "#00ff00");
            if (vault) {
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
                vault.style.opacity = '1';
            }
        } 
        // --- 3. SE NÃO FOR COMANDO NEM SENHA CORRETA ---
        else {
            logTerminal(`SISTEMA: '${cmdRaw}' NÃO RECONHECIDO`, "#ff3b30");
        }
    }
}

function runPrivacyScrub() {
    logTerminal("EXECUTANDO LIMPAGEM DE EMERGÊNCIA...");
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("CACHES DESTRUÍDOS.");
}

function toggleStealth() {
    if (document.body.style.filter.includes("brightness")) {
        document.body.style.filter = "none";
        logTerminal("STEALTH_MODE: OFF");
    } else {
        document.body.style.filter = "brightness(0.6) contrast(1.2) grayscale(0.5)";
        logTerminal("STEALTH_MODE: ON");
    }
}

function emergencyWipe() {
    localStorage.clear();
    window.location.replace("https://www.reuters.com");
}
