// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const NEXT_DNS_ID = "6ddbfb"; 
// ---------------------------------

const terminal = document.getElementById('terminal-output');

function logTerminal(msg, color = "#00ffaa") {
    const time = new Date().toLocaleTimeString();
    terminal.innerHTML += `<br><span style="color:${color}">[${time}] > ${msg}</span>`;
    terminal.scrollTop = terminal.scrollHeight;
}

// Verifica se o túnel 6ddbfb está ativo e limpo
async function verifyShield() {
    try {
        const check = await fetch('https://test.nextdns.io');
        const status = await check.json();
        if (status.status === "ok" && status.configuration === NEXT_DNS_ID) {
            logTerminal("SHIELD_STATUS: 6DDBFB_ACTIVE_AND_CLEAN", "#34c759");
        } else {
            logTerminal("WARNING: MULTIPLE_PROFILES_DETECTED_OR_EXPOSED", "#ff3b30");
        }
    } catch (e) {
        logTerminal("SHIELD_STATUS: OFFLINE", "#ff9500");
    }
}

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmd = input.value;
        input.value = '';

        if (cmd.toLowerCase() === "logs") {
            logTerminal("ACESSANDO REGISTROS...", "#ff9500");
            window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
        } else if (cmd === SECRET_PASS) {
            logTerminal("VAULT_OPENED", "#00ff00");
            document.getElementById('secret-vault').style.display = 'block';
        } else if (cmd.toLowerCase() === "verify") {
            verifyShield();
        } else {
            logTerminal("AUTH_ERROR", "#ff3b30");
        }
    }
}

function runPrivacyScrub() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("SESSÃO_LIMPA.");
}

function toggleStealth() {
    document.body.style.filter = "brightness(0.3) grayscale(1)";
    logTerminal("MODO_GHOST_ATIVO.");
}

logTerminal("GHOST_OS v9.8 ONLINE");
verifyShield();
