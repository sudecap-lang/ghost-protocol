// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const NEXT_DNS_ID = "6ddbfb"; 
// ---------------------------------

const output = document.getElementById('terminal-output');
const vault = document.getElementById('secret-vault');

// BLOQUEIO INICIAL DO COFRE
if (vault) vault.style.display = 'none';

function logTerminal(msg, color = "#00ffaa") {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span style="color:${color}">[${time}] > ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

window.onload = () => {
    logTerminal("SISTEMA GHOST v14.0 ONLINE");
    checkDNSStatus();
};

async function checkDNSStatus() {
    try {
        const res = await fetch(`https://test.nextdns.io/?t=${Date.now()}`);
        const data = await res.json();
        
        if (data.status === "ok" && data.configuration === NEXT_DNS_ID) {
            logTerminal("SHIELD: VERDE (PERFIL ATIVO)", "#34c759");
        } else if (data.status === "ok") {
            logTerminal("SHIELD: LARANJA (CONFIGURAÇÃO GENÉRICA)", "#ff9500");
        } else {
            logTerminal("SHIELD: VERMELHO (SISTEMA EXPOSTO)", "#ff3b30");
        }
    } catch (e) {
        logTerminal("ERRO: FALHA NA VERIFICAÇÃO DE REDE", "#ff3b30");
    }
}

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmd = input.value;
        input.value = '';

        // VALIDAÇÃO RÍGIDA DE ACESSO
        if (cmd === SECRET_PASS) {
            logTerminal("ACESSO AO COFRE CONCEDIDO", "#00ff00");
            vault.style.display = 'block';
        } else if (cmd.toLowerCase() === "link") {
            logTerminal("REQUISITANDO VINCULAÇÃO DE IP...");
            window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/setup`, '_blank');
        } else if (cmd.toLowerCase() === "logs") {
            window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
        } else {
            logTerminal("COMANDO INVÁLIDO OU ACESSO NEGADO", "#ff3b30");
            vault.style.display = 'none';
        }
    }
}

function runPrivacyScrub() {
    logTerminal("LIMPANDO DADOS DE NAVEGAÇÃO...");
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("LIMPEZA CONCLUÍDA.");
}

function toggleStealth() {
    logTerminal("MODO GHOST ATIVADO.");
    document.body.style.filter = "brightness(0.3) contrast(1.2) grayscale(1)";
}

function emergencyWipe() {
    logTerminal("DESTRUINDO SESSÃO...");
    localStorage.clear();
    window.location.replace("https://www.google.com");
}
