// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const NEXT_DNS_ID = "6ddbfb"; 
// ---------------------------------

const output = document.getElementById('terminal-output');
const vault = document.getElementById('secret-vault');

// RESET DE INTERFACE
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

// Função de Verificação (Sem travar o sistema)
async function runNetworkVerify() {
    logTerminal("SOLICITANDO STATUS DE REDE...", "#00aaff");
    try {
        const res = await fetch(`https://test.nextdns.io/?t=${Date.now()}`, { mode: 'no-cors' });
        logTerminal("CONEXÃO COM SERVIDOR ESTABELECIDA.");
        logTerminal("DICA: SE ESTIVER VERMELHO NO SITE, REINSTALE O PERFIL.", "#ff9500");
    } catch (e) {
        logTerminal("ALERTA: REDE 'GIGA MAIS' BLOQUEANDO TESTE.", "#ff3b30");
    }
}

window.onload = () => {
    logTerminal("GHOST_OS v25.0 - MODO DE RECUPERAÇÃO");
    logTerminal("DIGITE 'LOGS' OU A SENHA PARA ACESSAR.");
};

// LÓGICA DE COMANDO REESCRITA PARA NÃO FALHAR
function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmdRaw = input.value; 
        const cmdClean = cmdRaw.toLowerCase().trim();
        input.value = '';

        // 1. COMANDOS DE EMERGÊNCIA (PRIORIDADE)
        if (cmdClean === "logs") {
            logTerminal("REQUISITANDO REGISTROS...");
            window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
        } 
        else if (cmdClean === "verify") {
            runNetworkVerify();
        } 
        else if (cmdClean === "clear") {
            output.innerHTML = "";
            logTerminal("TERMINAL REINICIADO.");
        }
        // 2. VALIDAÇÃO DE SENHA
        else if (cmdRaw === SECRET_PASS) {
            logTerminal("CHAVE MESTRA RECONHECIDA.", "#00ff00");
            if (vault) {
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
                vault.style.opacity = '1';
            }
        } 
        else {
            logTerminal(`ERRO: '${cmdRaw}' NÃO RECONHECIDO.`, "#ff3b30");
        }
    }
}

function runPrivacyScrub() {
    logTerminal("LIMPANDO CACHE...");
    localStorage.clear();
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
