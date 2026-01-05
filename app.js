// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const NEXT_DNS_ID = "6ddbfb"; 
// ---------------------------------

const output = document.getElementById('terminal-output');
const vault = document.getElementById('secret-vault');

// GARANTIR QUE NADA ESTEJA OCULTANDO A TELA INDEVIDAMENTE
document.body.style.filter = "none";
if (vault) {
    vault.style.display = 'none';
}

function logTerminal(msg, color = "#00ffaa") {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span style="color:${color}">[${time}] > ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

// Função de Diagnóstico Ultra-Resiliente
async function runNetworkVerify() {
    logTerminal("SOLICITANDO PING DE SEGURANÇA...", "#00aaff");
    try {
        // Tentativa de conexão com bypass de cache e timeout estendido
        const response = await fetch(`https://test.nextdns.io/?t=${Date.now()}`, {
            mode: 'cors',
            cache: 'no-store'
        });
        
        const data = await response.json();

        if (data.status === "ok" && data.configuration === NEXT_DNS_ID) {
            logTerminal("SHIELD: VERDE (PERFIL 6DDBFB ATIVO)", "#34c759");
        } else if (data.status === "ok") {
            logTerminal("SHIELD: LARANJA (IP RECONHECIDO, PERFIL INATIVO)", "#ff9500");
        } else {
            logTerminal("SHIELD: VERMELHO (REDE EXPOSTA)", "#ff3b30");
        }
    } catch (e) {
        logTerminal("ERRO: O IPHONE BLOQUEOU A REQUISIÇÃO.", "#ff3b30");
        logTerminal("AÇÃO: DESATIVE 'LIMITAR RASTREIO DE IP' NAS CONFIGURAÇÕES DE WI-FI.", "#ff9500");
    }
}

window.onload = () => {
    logTerminal("GHOST_OS v21.0 ONLINE");
    logTerminal("SISTEMA PRONTO PARA COMANDOS.");
};

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmdRaw = input.value; 
        const cmdClean = cmdRaw.toLowerCase().trim();
        input.value = '';

        // PRIORIDADE 1: COMANDOS
        if (cmdClean === "verify") {
            runNetworkVerify();
        } 
        else if (cmdClean === "logs") {
            window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
        } 
        else if (cmdClean === "clear") {
            output.innerHTML = "";
            logTerminal("TERMINAL REINICIADO.");
        }
        // PRIORIDADE 2: SENHA MESTRE
        else if (cmdRaw === SECRET_PASS) {
            logTerminal("CHAVE ACEITA. DESBLOQUEANDO COFRE...", "#00ff00");
            if (vault) {
                vault.style.display = 'block';
                vault.style.opacity = '1';
                vault.style.visibility = 'visible';
            }
        } 
        else {
            logTerminal(`SISTEMA: ENTRADA '${cmdRaw}' INVÁLIDA`, "#ff3b30");
        }
    }
}

function runPrivacyScrub() {
    logTerminal("DESTRUINDO EVIDÊNCIAS...");
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("LIMPEZA_CONCLUÍDA.");
}

function toggleStealth() {
    if (document.body.style.filter.includes("brightness")) {
        document.body.style.filter = "none";
        logTerminal("MODO GHOST: OFF");
    } else {
        document.body.style.filter = "brightness(0.7) contrast(1.1)";
        logTerminal("MODO GHOST: ON");
    }
}

function emergencyWipe() {
    localStorage.clear();
    window.location.replace("https://www.reuters.com");
}
