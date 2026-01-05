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

// Verifica se o DNS 6ddbfb é o único mestre
async function checkSystemIntegrity() {
    try {
        const res = await fetch('https://test.nextdns.io');
        const data = await res.json();
        
        if (data.status === "ok" && data.configuration === NEXT_DNS_ID) {
            logTerminal("SISTEMA: PROTEGIDO (TÚNEL 6DDBFB ATIVO)", "#34c759");
        } else {
            logTerminal("ALERTA: CONFLITO DE REDE DETECTADO", "#ff3b30");
            logTerminal("RECOMENDAÇÃO: REMOVA PERFIS ANTIGOS NOS AJUSTES", "#ff9500");
        }
    } catch (e) {
        logTerminal("ERRO: FALHA NA VERIFICAÇÃO DE INTEGRIDADE", "#ff3b30");
    }
}

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmd = input.value;
        input.value = '';

        if (cmd.toLowerCase() === "logs") {
            logTerminal("ABRINDO REGISTROS DE VIGILÂNCIA...", "#ff9500");
            window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
        } else if (cmd === SECRET_PASS) {
            logTerminal("ACESSO TOTAL AO COFRE CONCEDIDO", "#00ff00");
            document.getElementById('secret-vault').style.display = 'block';
        } else if (cmd.toLowerCase() === "verify") {
            checkSystemIntegrity();
        } else {
            logTerminal("ERRO_DE_SISTEMA: COMANDO INVÁLIDO", "#ff3b30");
        }
    }
}

function runPrivacyScrub() {
    logTerminal("DESTRUINDO METADADOS DA SESSÃO...");
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("LIMPEZA CONCLUÍDA.");
}

logTerminal("GHOST_OS v10.0 ONLINE");
checkSystemIntegrity();
