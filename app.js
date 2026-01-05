// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const NEXT_DNS_ID = "6ddbfb"; 
// ---------------------------------

const output = document.getElementById('terminal-output');
const vault = document.getElementById('secret-vault');

// ESTADO INICIAL: COFRE OCULTO E TELA CLARA
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

// Função de Diagnóstico de Rede
async function runNetworkVerify() {
    logTerminal("INICIANDO SCAN DE REDE...", "#00aaff");
    try {
        const res = await fetch(`https://test.nextdns.io/?t=${Date.now()}`);
        const data = await res.json();
        if (data.status === "ok" && data.configuration === NEXT_DNS_ID) {
            logTerminal("SHIELD: VERDE (PERFIL 6DDBFB ATIVO)", "#34c759");
        } else {
            logTerminal("SHIELD: LARANJA/VERMELHO (REDE EXPOSTA)", "#ff9500");
        }
    } catch (e) {
        logTerminal("ERRO: FALHA NA CONEXÃO COM O SERVIDOR", "#ff3b30");
    }
}

window.onload = () => {
    logTerminal("GHOST_OS v18.0 ONLINE");
    logTerminal("DIGITE 'VERIFY' PARA SCAN OU A SENHA PARA O COFRE.");
};

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmd = input.value; // Mantém original para a senha
        const cmdLower = cmd.toLowerCase().trim(); // Versão para comandos
        input.value = '';

        // 1. VERIFICAÇÃO DE COMANDOS
        if (cmdLower === "verify") {
            runNetworkVerify();
        } 
        else if (cmdLower === "logs") {
            window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
        } 
        else if (cmdLower === "clear") {
            output.innerHTML = "";
            logTerminal("TERMINAL REINICIADO.");
        }
        // 2. VERIFICAÇÃO DE SENHA (IDÊNTICA À SUA)
        else if (cmd === SECRET_PASS) {
            logTerminal("ACESSO AUTORIZADO. ABRINDO COFRE...", "#00ff00");
            if (vault) {
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
                vault.style.opacity = '1';
            }
        } 
        // 3. ERRO
        else {
            logTerminal(`COMANDO OU CHAVE '${cmd}' INVÁLIDA`, "#ff3b30");
        }
    }
}

function runPrivacyScrub() {
    logTerminal("DESTRUINDO CACHE...");
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("LIMPEZA CONCLUÍDA.");
}

function toggleStealth() {
    if (document.body.style.filter.includes("brightness")) {
        document.body.style.filter = "none";
        logTerminal("MODO STEALTH: OFF");
    } else {
        document.body.style.filter = "brightness(0.5) contrast(1.5) grayscale(0.8)";
        logTerminal("MODO STEALTH: ON");
    }
}

function emergencyWipe() {
    localStorage.clear();
    window.location.replace("https://www.reuters.com");
}
