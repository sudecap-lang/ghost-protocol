// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const NEXT_DNS_ID = "6ddbfb"; 
// ---------------------------------

const output = document.getElementById('terminal-output');
const vault = document.getElementById('secret-vault');

// GARANTIR ESTADO INICIAL SEGURO E VISÍVEL
if (vault) {
    vault.style.display = 'none';
    vault.style.visibility = 'hidden';
}
document.body.style.filter = "none"; // Garante que não inicie escuro

function logTerminal(msg, color = "#00ffaa") {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span style="color:${color}">[${time}] > ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

window.onload = () => {
    logTerminal("SISTEMA GHOST v17.0 ONLINE");
    logTerminal("SINAL: AGUARDANDO VALIDAÇÃO DE IDENTIDADE...");
};

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmd = input.value; 
        input.value = '';

        // VALIDAÇÃO LITERAL DA SENHA
        if (cmd === SECRET_PASS) {
            logTerminal("ACESSO CONCEDIDO. DESBLOQUEANDO COFRE...", "#00ff00");
            if (vault) {
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
                vault.style.opacity = '1';
            }
        } 
        else if (cmd.toLowerCase() === "logs") {
            window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
        } 
        else if (cmd.toLowerCase() === "clear") {
            output.innerHTML = "";
            logTerminal("TERMINAL REINICIADO.");
        }
        else {
            logTerminal(`ERRO: CHAVE INVÁLIDA`, "#ff3b30");
        }
    }
}

function runPrivacyScrub() {
    logTerminal("LIMPANDO RASTROS DE SESSÃO...");
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("SESSÃO HIGIENIZADA.");
}

function toggleStealth() {
    // Se já estiver escuro, volta ao normal. Se não, escurece.
    if (document.body.style.filter.includes("brightness")) {
        document.body.style.filter = "none";
        logTerminal("MODO STEALTH: DESATIVADO.");
    } else {
        // Brilho em 0.5 (50%) e Contraste em 1.5 para leitura tática
        document.body.style.filter = "brightness(0.5) contrast(1.5) grayscale(0.8)";
        logTerminal("MODO STEALTH: ATIVADO (VISIBILIDADE REDUZIDA).");
    }
}

function emergencyWipe() {
    logTerminal("PROTOCOLO DE EMERGÊNCIA! SAINDO...");
    localStorage.clear();
    window.location.replace("https://www.reuters.com");
}
