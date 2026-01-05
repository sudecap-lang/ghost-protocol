// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const NEXT_DNS_ID = "6ddbfb"; 
// ---------------------------------

const output = document.getElementById('terminal-output');
const vault = document.getElementById('secret-vault');

// LIMPEZA INICIAL DE FILTROS E ESTADOS
if (vault) vault.style.display = 'none';
document.body.style.filter = "none";

function logTerminal(msg, color = "#00ffaa") {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span style="color:${color}">[${time}] > ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

// Função de Diagnóstico com Bypass de Bloqueio do Safari
async function runNetworkVerify() {
    logTerminal("SOLICITANDO PING DE SEGURANÇA (BYPASS MODE)...", "#00aaff");
    try {
        // Usamos um modo que o navegador não bloqueia a interceptação
        const res = await fetch(`https://test.nextdns.io/?t=${Date.now()}`, {
            mode: 'no-cors' 
        });
        
        // Como o 'no-cors' não permite ler o texto, verificamos a conectividade
        if (res.type === 'opaque' || res.ok || res.status === 0) {
            logTerminal("CONEXÃO ESTABELECIDA COM O SERVIDOR.", "#00ffaa");
            logTerminal("DICA: SE O SITE NEXTDNS ESTÁ LARANJA, O DNS MANUAL NO WI-FI É OBRIGATÓRIO.", "#ff9500");
        }
    } catch (e) {
        logTerminal("ERRO: REDE LOCAL BLOQUEOU A REQUISIÇÃO.", "#ff3b30");
    }
}

window.onload = () => {
    logTerminal("GHOST_OS v23.0 ONLINE");
    logTerminal("DIGITE A SENHA OU 'VERIFY' PARA TESTAR REDE.");
};

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmdRaw = input.value; 
        const cmdClean = cmdRaw.toLowerCase().trim();
        input.value = '';

        // 1. COMANDOS DO SISTEMA
        if (cmdClean === "verify") {
            runNetworkVerify();
        } 
        else if (cmdClean === "clear") {
            output.innerHTML = "";
            logTerminal("TERMINAL REINICIADO.");
        }
        else if (cmdClean === "logs") {
            window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
        }
        // 2. VALIDAÇÃO DA SENHA MESTRE
        else if (cmdRaw === SECRET_PASS) {
            logTerminal("CHAVE ACEITA. DESBLOQUEANDO CONTEÚDO...", "#00ff00");
            if (vault) {
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
                vault.style.opacity = '1';
            }
        } 
        else {
            logTerminal(`SISTEMA: ENTRADA '${cmdRaw}' INVÁLIDA`, "#ff3b30");
        }
    }
}

function runPrivacyScrub() {
    logTerminal("LIMPANDO DADOS DE SESSÃO...");
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("MEMÓRIA HIGIENIZADA.");
}

function toggleStealth() {
    if (document.body.style.filter.includes("brightness")) {
        document.body.style.filter = "none";
        logTerminal("MODO GHOST: OFF");
    } else {
        document.body.style.filter = "brightness(0.7) contrast(1.2)";
        logTerminal("MODO GHOST: ON");
    }
}

function emergencyWipe() {
    localStorage.clear();
    window.location.replace("https://www.reuters.com");
}
