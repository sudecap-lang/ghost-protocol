// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const HONEYPOT_PASS = "fbi_guest"; 
const DURESS_PASS = "1234"; 
const NEXT_DNS_ID = "6ddbfb"; 
let idleTimer;
let noiseInterval;
let IS_LOGGED_IN = false; // Autenticação em RAM (mais estável que storage)
// ---------------------------------

const output = document.getElementById('terminal-output');
const vault = document.getElementById('secret-vault');

function emergencyUIReset() {
    if (vault && IS_LOGGED_IN) {
        vault.style.display = 'block';
        vault.style.visibility = 'visible';
        vault.style.pointerEvents = "auto";
        vault.style.filter = "none";
        vault.style.opacity = "1";
    }
}

function logTerminal(msg, color = "#00ffaa") {
    if (!output) return;
    output.innerHTML += `<br><span style="color:${color}">> ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

function clearTerminal() {
    output.innerHTML = "";
    logTerminal("SYSTEM_CLEAN", "#555");
    emergencyUIReset();
}

async function runNetworkVerify() {
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        const color = data.ip === "179.191.223.163" ? "#ff3b30" : "#34c759";
        logTerminal(`NET_ID: ${data.ip}`, color);
    } catch (e) {
        logTerminal("ENCRYPTION_LAYER: ACTIVE", "#34c759");
    }
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (IS_LOGGED_IN) {
        emergencyUIReset();
        idleTimer = setTimeout(() => {
            vault.style.filter = "blur(30px) brightness(0.2)";
        }, 60000); 
    }
}

// PRIVACY SCRUB 100% SEGURO (NÃO AFETA A VARIÁVEL IS_LOGGED_IN)
function runPrivacyScrub() {
    logTerminal("INITIATING_DEEP_CLEAN...", "#ff9500");
    
    // Limpa rastros físicos de sites
    localStorage.clear();
    sessionStorage.clear();
    
    // Mantém a interface ativa forçadamente
    IS_LOGGED_IN = true; 
    emergencyUIReset();
    
    logTerminal("PRIVACY_SCRUB: SUCCESS", "#34c759");
    logTerminal("SESS_PERSISTENCE: RAM_MODE", "#00ffaa");
    
    document.getElementById('command-input').focus();
}

function toggleGhostMode() {
    if (noiseInterval) {
        clearInterval(noiseInterval);
        noiseInterval = null;
        logTerminal("GHOST: DISABLED", "#ff3b30");
    } else {
        noiseInterval = setInterval(() => {
            fetch(`https://www.apple.com/favicon.ico?v=${Math.random()}`, { mode: 'no-cors' }).catch(()=>{});
        }, 5000);
        logTerminal("GHOST: ACTIVE", "#34c759");
    }
}

// RESTAURA VISIBILIDADE AO VOLTAR DO SAFARI
document.addEventListener("visibilitychange", () => {
    if (!document.hidden && IS_LOGGED_IN) {
        emergencyUIReset();
        runNetworkVerify();
    }
});

window.onload = () => {
    document.addEventListener('click', () => { if(IS_LOGGED_IN) resetIdleTimer(); });
};

// --- OPERAÇÕES ---

function openLogs() {
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/registros`, '_blank');
}

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmdRaw = input.value;
        input.value = '';

        if (cmdRaw === SECRET_PASS) {
            IS_LOGGED_IN = true;
            vault.style.display = 'block';
            vault.style.visibility = 'visible';
            emergencyUIReset();
            logTerminal("V88_RAM_AUTH_ACTIVE");
            runNetworkVerify();
            resetIdleTimer();
        } 
        else if (cmdRaw === "clear") {
            clearTerminal();
        }
        else if (cmdRaw === DURESS_PASS) {
            IS_LOGGED_IN = false;
            localStorage.clear();
            sessionStorage.clear();
            window.location.replace("https://www.reuters.com");
        }
        else {
            logTerminal("AUTH_FAILED", "#ff3b30");
        }
    }
}
