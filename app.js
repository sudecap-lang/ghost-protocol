// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const NEXT_DNS_ID = "6ddbfb"; 
// ---------------------------------

const output = document.getElementById('terminal-output');
const vault = document.getElementById('secret-vault');

// BLOQUEIO TOTAL AO INICIAR (Garante que não abra sem senha)
function lockSystem() {
    if (vault) {
        vault.style.display = 'none';
        vault.style.visibility = 'hidden';
        vault.style.opacity = '0';
    }
    document.body.style.filter = "none";
}

function logTerminal(msg, color = "#00ffaa") {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span style="color:${color}">[${time}] > ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

window.onload = () => {
    lockSystem(); // Força o fechamento de qualquer sessão antiga
    logTerminal("GHOST_OS v26.0 - SISTEMA TRANCADO");
    logTerminal("IDENTIFIQUE-SE PARA ACESSAR O COFRE.");
};

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmdRaw = input.value; 
        const cmdClean = cmdRaw.toLowerCase().trim();
        input.value = '';

        // 1. COMANDOS DE SISTEMA
        if (cmdClean === "logs") {
            logTerminal("ABRINDO REGISTROS DO ID 6DDBFB...");
            window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
        } 
        else if (cmdClean === "verify") {
            logTerminal("CHAVE DE REDE: GIGA MAIS DETECTADA (VERMELHO)", "#ff3b30");
        } 
        else if (cmdClean === "clear") {
            output.innerHTML = "";
            logTerminal("TERMINAL REINICIADO.");
        }
        // 2. VALIDAÇÃO RÍGIDA DE SENHA
        else if (cmdRaw === SECRET_PASS) {
            logTerminal("ACESSO CONCEDIDO.", "#00ff00");
            if (vault) {
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
                vault.style.opacity = '1';
            }
        } 
        else {
            logTerminal(`ACESSO NEGADO: CHAVE INCORRETA.`, "#ff3b30");
            lockSystem(); // Tranca tudo se errar
        }
    }
}

function runPrivacyScrub() {
    logTerminal("LIMPANDO DADOS...");
    localStorage.clear();
    sessionStorage.clear();
    lockSystem(); // Fecha o cofre após a limpeza
    logTerminal("LIMPEZA CONCLUÍDA E SISTEMA TRANCADO.");
}

function toggleStealth() {
    if (document.body.style.filter.includes("brightness")) {
        document.body.style.filter = "none";
    } else {
        document.body.style.filter = "brightness(0.6) contrast(1.2)";
    }
}
