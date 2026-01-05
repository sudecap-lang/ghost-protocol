// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const NEXT_DNS_ID = "6ddbfb"; 
// ---------------------------------

const output = document.getElementById('terminal-output');
const vault = document.getElementById('secret-vault');

// BLOQUEIO TOTAL DE INICIALIZAÇÃO
if (vault) vault.setAttribute('style', 'display: none !important');

function logTerminal(msg, color = "#00ffaa") {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span style="color:${color}">[${time}] > ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

window.onload = () => {
    logTerminal("SISTEMA GHOST v15.0 - SEGURANÇA MÁXIMA");
    checkDNSIdentity();
};

async function checkDNSIdentity() {
    try {
        const res = await fetch(`https://test.nextdns.io/?t=${Date.now()}`);
        const data = await res.json();
        
        if (data.status === "ok" && data.configuration === NEXT_DNS_ID) {
            logTerminal("SHIELD: VERDE (PERFIL 6DDBFB ATIVO)", "#34c759");
        } else if (data.status === "ok") {
            logTerminal("SHIELD: LARANJA (IP VINCULADO, MAS CONFIGURAÇÃO AUSENTE)", "#ff9500");
        } else {
            logTerminal("SHIELD: VERMELHO (REDE EXPOSTA)", "#ff3b30");
        }
    } catch (e) {
        logTerminal("ERRO CRÍTICO NA VERIFICAÇÃO", "#ff3b30");
    }
}

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmd = input.value;
        input.value = '';

        // VALIDAÇÃO COM TRAVA DE SEGURANÇA
        if (cmd === SECRET_PASS) {
            logTerminal("CREDENCIAIS ACEITAS. DESBLOQUEANDO COFRE...", "#00ff00");
            vault.setAttribute('style', 'display: block !important');
        } else if (cmd.toLowerCase() === "link") {
            logTerminal("REQUISITANDO ATUALIZAÇÃO DE IP...");
            window.open("https://link-ip.nextdns.io/6ddbfb/73f17667f1ec9cf8", "_blank");
        } else if (cmd.toLowerCase() === "logs") {
            window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
        } else {
            logTerminal("ACESSO NEGADO.", "#ff3b30");
            vault.setAttribute('style', 'display: none !important');
        }
    }
}

function runPrivacyScrub() {
    logTerminal("DESTRUINDO ESTRUTURAS DE CACHE...");
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("LIMPEZA_SESSÃO: SUCESSO.");
}

function toggleStealth() {
    logTerminal("CAMUFLAGEM VISUAL ACIONADA.");
    document.body.style.filter = "brightness(0.2) contrast(1.4) grayscale(1)";
}

function emergencyWipe() {
    logTerminal("ALERTA DE INTRUSÃO! APAGANDO...");
    localStorage.clear();
    window.location.replace("https://www.reuters.com");
}
