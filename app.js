// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const NEXT_DNS_ID = "6ddbfb"; 
// ---------------------------------

const output = document.getElementById('terminal-output');
const vault = document.getElementById('secret-vault');

// GARANTIR QUE O COFRE ESTEJA FECHADO NO BOOT
if(vault) vault.style.display = 'none';

function logTerminal(msg, color = "#00ffaa") {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span style="color:${color}">[${time}] > ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

window.onload = () => {
    logTerminal("SISTEMA GHOST v13.0 ONLINE");
    logTerminal("TRAVA DE SEGURANÇA: ATIVADA");
    verifyConnection();
};

async function verifyConnection() {
    try {
        const res = await fetch(`https://test.nextdns.io/?check=${Date.now()}`);
        const data = await res.json();
        if (data.status === "ok") {
            logTerminal("STATUS: ESCUDO ATIVO (6DDBFB)", "#34c759");
        } else {
            logTerminal("STATUS: REDE EXPOSTA (ISP DETECTADO)", "#ff3b30");
        }
    } catch (e) {
        logTerminal("STATUS: ERRO DE COMUNICAÇÃO", "#ff9500");
    }
}

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmd = input.value;
        input.value = '';

        // PROTEÇÃO: SÓ ABRE SE A SENHA EXATA FOR DIGITADA
        if (cmd === SECRET_PASS) {
            logTerminal("CREDENCIAIS VÁLIDAS. ACESSO AO COFRE LIBERADO.", "#00ff00");
            vault.style.display = 'block';
        } else if (cmd.toLowerCase() === "logs") {
            window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
        } else if (cmd.toLowerCase() === "clear") {
            output.innerHTML = "";
            logTerminal("TERMINAL REINICIADO.");
        } else {
            logTerminal("ACESSO NEGADO: SENHA INCORRETA.", "#ff3b30");
            vault.style.display = 'none'; // Garante o fechamento em caso de erro
        }
    }
}

function runPrivacyScrub() {
    logTerminal("DESTRUINDO EVIDÊNCIAS LOCAIS...");
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("LIMPEZA_SESSÃO: OK.");
}

function toggleStealth() {
    logTerminal("ATIVANDO CAMUFLAGEM VISUAL...");
    document.body.style.filter = "brightness(0.2) grayscale(1)";
}

function emergencyWipe() {
    logTerminal("SISTEMA COMPROMETIDO! DESTRUINDO TUDO...");
    localStorage.clear();
    window.location.replace("https://www.reuters.com");
}
