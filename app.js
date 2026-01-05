// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const NEXT_DNS_ID = "6ddbfb"; 
// ---------------------------------

const output = document.getElementById('terminal-output');
const vault = document.getElementById('secret-vault');

// TRAVA DE SEGURANÇA MÁXIMA
if (vault) {
    vault.style.display = 'none';
    vault.style.opacity = '0';
}

function logTerminal(msg, color = "#00ffaa") {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span style="color:${color}">[${time}] > ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

window.onload = () => {
    logTerminal("SISTEMA GHOST v16.0 ONLINE");
    logTerminal("LIMPANDO CACHE DE REDE LOCAL...");
    verifyShieldStatus();
};

async function verifyShieldStatus() {
    try {
        const res = await fetch(`https://test.nextdns.io/?check=${Date.now()}`);
        const data = await res.json();
        
        if (data.status === "ok" && data.configuration === NEXT_DNS_ID) {
            logTerminal("STATUS: ESCUDO VERDE (TÚNEL 6DDBFB ATIVO)", "#34c759");
        } else if (data.status === "ok") {
            logTerminal("STATUS: ESCUDO LARANJA (IP VINCULADO, PERFIL AUSENTE)", "#ff9500");
        } else {
            logTerminal("STATUS: ESCUDO VERMELHO (REDE EXPOSTA À GIGA MAIS)", "#ff3b30");
        }
    } catch (e) {
        logTerminal("ERRO: FALHA NA VERIFICAÇÃO DE PROTOCOLO", "#ff9500");
    }
}

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmd = input.value;
        input.value = '';

        if (cmd === SECRET_PASS) {
            logTerminal("CHAVE VÁLIDA. DESBLOQUEANDO COFRE...", "#00ff00");
            vault.style.display = 'block';
            setTimeout(() => { vault.style.opacity = '1'; }, 10);
        } else if (cmd.toLowerCase() === "link") {
            logTerminal("ATUALIZANDO IP NO SERVIDOR...");
            window.open("https://link-ip.nextdns.io/6ddbfb/73f17667f1ec9cf8", "_blank");
        } else if (cmd.toLowerCase() === "verify") {
            verifyShieldStatus();
        } else {
            logTerminal("ACESSO NEGADO: CREDENCIAIS INCORRETAS", "#ff3b30");
            vault.style.display = 'none';
            vault.style.opacity = '0';
        }
    }
}

function runPrivacyScrub() {
    logTerminal("DESTRUINDO EVIDÊNCIAS E METADADOS...");
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("HIGIENIZAÇÃO CONCLUÍDA.");
}

function toggleStealth() {
    logTerminal("MODO GHOST: ATIVADO.");
    document.body.style.filter = "brightness(0.3) grayscale(1)";
}

function emergencyWipe() {
    logTerminal("EXECUTANDO WIPE TOTAL...");
    localStorage.clear();
    window.location.replace("https://www.reuters.com");
}
