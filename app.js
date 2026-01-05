// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const NEXT_DNS_ID = "6ddbfb"; 
// ---------------------------------

const output = document.getElementById('terminal-output');

function logTerminal(msg, color = "#00ffaa") {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span style="color:${color}">[${time}] > ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

// 1. FUNÇÃO PARA OS BOTÕES (CORRIGIDA)
function runPrivacyScrub() {
    logTerminal("DESTRUINDO METADADOS...", "#ff9500");
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("LIMPEZA CONCLUÍDA.", "#34c759");
}

function toggleStealth() {
    logTerminal("MODO GHOST ATIVADO.", "#00ff00");
    document.body.style.filter = "brightness(0.3) contrast(1.2) grayscale(1)";
}

function emergencyWipe() {
    logTerminal("PROTOCOLO DE PÂNICO!", "#ff3b30");
    localStorage.clear();
    window.location.replace("https://www.reuters.com");
}

// 2. VERIFICAÇÃO DE SISTEMA
async function checkSystemIntegrity() {
    try {
        // Adicionado timestamp para evitar cache do navegador
        const res = await fetch(`https://test.nextdns.io/?cacheburst=${Date.now()}`);
        const data = await res.json();
        
        if (data.status === "ok") {
            logTerminal("SISTEMA: PROTEGIDO (TÚNEL ATIVO)", "#34c759");
        } else {
            logTerminal("ALERTA: REDE EXPOSTA (GIGA MAIS)", "#ff3b30");
        }
    } catch (e) {
        logTerminal("ERRO: FALHA NA VERIFICAÇÃO", "#ff9500");
    }
}

// 3. COMANDOS DO TERMINAL
function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmd = input.value;
        input.value = '';

        if (cmd.toLowerCase() === "logs") {
            window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
        } else if (cmd === SECRET_PASS) {
            logTerminal("ACESSO CONCEDIDO", "#00ff00");
            document.getElementById('secret-vault').style.display = 'block';
        } else if (cmd.toLowerCase() === "verify") {
            checkSystemIntegrity();
        } else {
            logTerminal("COMANDO INVÁLIDO", "#ff3b30");
        }
    }
}

// Inicialização
logTerminal("GHOST_OS v10.5 ONLINE");
checkSystemIntegrity();
