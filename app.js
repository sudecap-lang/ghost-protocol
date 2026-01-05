// --- CONFIGURAÇÃO DE SEGURANÇA ---
const SECRET_PASS = "77 Abacate 77*"; 
const NEXT_DNS_ID = "6ddbfb"; 
// ---------------------------------

const output = document.getElementById('terminal-output');

function logTerminal(msg, color = "#00ffaa") {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span style="color:${color}">[${time}] > ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

// Inicialização e Re-vinculação de Botões
window.onload = () => {
    logTerminal("SISTEMA GHOST v12.5 INICIALIZADO");
    logTerminal(`TARGET_ID: ${NEXT_DNS_ID} DETECTADO`);
};

// Funções dos Botões Físicos
function runPrivacyScrub() {
    logTerminal("DESTRUINDO ESTRUTURAS DE DADOS LOCAIS...");
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("LIMPEZA CONCLUÍDA COM SUCESSO.", "#34c759");
}

function toggleStealth() {
    logTerminal("MODO GHOST ATIVADO: CAMUFLAGEM VISUAL.");
    document.body.style.filter = "brightness(0.3) contrast(1.2) grayscale(1)";
}

function emergencyWipe() {
    logTerminal("PROTOCOLO DE PÂNICO ACIONADO!", "#ff3b30");
    localStorage.clear();
    window.location.replace("https://www.reuters.com");
}

// Terminal de Comandos
function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmd = input.value;
        input.value = '';

        if (cmd.toLowerCase() === "logs") {
            logTerminal("ABRINDO REGISTROS DE VIGILÂNCIA...", "#ff9500");
            window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
        } else if (cmd === SECRET_PASS) {
            logTerminal("ACESSO AO COFRE CONCEDIDO", "#00ff00");
            document.getElementById('secret-vault').style.display = 'block';
        } else {
            logTerminal("FALHA DE AUTENTICAÇÃO: COMANDO INVÁLIDO", "#ff3b30");
        }
    }
}
