// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const NEXT_DNS_ID = "6ddbfb"; 
// ---------------------------------

const output = document.getElementById('terminal-output');
const vault = document.getElementById('secret-vault');

// TRAVA DE SEGURANÇA OBRIGATÓRIA
function secureLock() {
    if (vault) {
        vault.style.display = 'none';
        vault.style.visibility = 'hidden';
        vault.style.opacity = '0';
    }
}

function logTerminal(msg, color = "#00ffaa") {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span style="color:${color}">[${time}] > ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

window.onload = () => {
    secureLock();
    logTerminal("GHOST_OS v27.0 ONLINE");
    logTerminal("STATUS ATUAL: REDE EXPOSTA (GIGA MAIS)", "#ff3b30");
};

async function runNetworkVerify() {
    logTerminal("TESTANDO INTEGRIDADE DO TÚNEL...");
    try {
        const res = await fetch(`https://test.nextdns.io/?t=${Date.now()}`);
        const text = await res.text();
        
        if (text.includes(NEXT_DNS_ID)) {
            logTerminal("SINAL: VERDE (PERFIL ATIVO)", "#34c759");
        } else if (text.includes("GIGA MAIS")) {
            logTerminal("SINAL: VERMELHO (GIGA MAIS DETECTADA)", "#ff3b30");
            logTerminal("USE 'VINCULAR IP' NO SITE E REINICIE O WI-FI.", "#ff9500");
        } else {
            logTerminal("SINAL: LARANJA (IP OK, TÚNEL AUSENTE)", "#ff9500");
        }
    } catch (e) {
        logTerminal("ERRO: FALHA CRÍTICA DE CONEXÃO", "#ff3b30");
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
        else if (cmdClean === "logs") {
            logTerminal("REQUISITANDO ACESSO AOS LOGS...");
            window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
        }
        else if (cmdClean === "clear") {
            output.innerHTML = "";
            logTerminal("TERMINAL REINICIADO.");
        }
        else if (cmdRaw === SECRET_PASS) {
            logTerminal("CHAVE MESTRA ACEITA.", "#00ff00");
            if (vault) {
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
                vault.style.opacity = '1';
            }
        } 
        else {
            logTerminal(`ACESSO NEGADO: '${cmdRaw}'`, "#ff3b30");
            secureLock();
        }
    }
}

function runPrivacyScrub() {
    logTerminal("DESTRUINDO CACHE...");
    localStorage.clear();
    secureLock();
    logTerminal("SISTEMA HIGIENIZADO.");
}

function toggleStealth() {
    document.body.style.filter = document.body.style.filter.includes("brightness") ? "none" : "brightness(0.6) contrast(1.2)";
}
