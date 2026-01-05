// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const HONEYPOT_PASS = "fbi_guest"; 
const DURESS_PASS = "1234"; 
const NEXT_DNS_ID = "6ddbfb"; 
let idleTimer;
let noiseInterval;
// ---------------------------------

const output = document.getElementById('terminal-output');
const vault = document.getElementById('secret-vault');

function emergencyUIReset() {
    if (vault) {
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
    logTerminal("SCREEN_PURGED", "#555");
    emergencyUIReset();
}

async function runNetworkVerify() {
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        const color = data.ip === "179.191.223.163" ? "#ff3b30" : "#34c759";
        logTerminal(`TRACED_IP: ${data.ip}`, color);
        if(color === "#ff3b30") logTerminal("LOC: CAMPOS_RJ_VISIBLE", "#ff3b30");
    } catch (e) {
        logTerminal("DNS_ENCRYPTION_ACTIVE", "#34c759");
    }
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        emergencyUIReset();
        idleTimer = setTimeout(() => {
            vault.style.filter = "blur(25px) brightness(0.2)";
        }, 60000); 
    }
}

// PRIVACY SCRUB REPARADO (NÃO DESLOGA MAIS)
function runPrivacyScrub() {
    // Limpa tudo EXCETO a chave de autenticação
    const auth = sessionStorage.getItem('is_auth');
    localStorage.clear();
    sessionStorage.clear();
    
    // Restaura a sessão imediatamente
    if (auth) sessionStorage.setItem('is_auth', auth);
    
    logTerminal("PRIVACY_SCRUB: COMPLETED", "#34c759");
    logTerminal("CACHE_WIPED_SESS_KEPT", "#00ffaa");
    
    emergencyUIReset();
    resetIdleTimer();
}

function toggleGhostMode() {
    if (noiseInterval) {
        clearInterval(noiseInterval);
        noiseInterval = null;
        logTerminal("GHOST_MODE: OFF", "#ff3b30");
    } else {
        noiseInterval = setInterval(() => {
            fetch(`https://www.google.com/favicon.ico?v=${Math.random()}`, { mode: 'no-cors' }).catch(()=>{});
        }, 4000);
        logTerminal("GHOST_MODE: ON (DILUTING_IP)", "#34c759");
    }
}

document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
        emergencyUIReset();
        if (sessionStorage.getItem('is_auth') === 'true') {
            runNetworkVerify();
        }
    }
});

window.onload = () => {
    if (sessionStorage.getItem('is_auth') === 'true') {
        vault.style.display = 'block';
        vault.style.visibility = 'visible';
        emergencyUIReset();
    }
    document.addEventListener('click', () => { emergencyUIReset(); resetIdleTimer(); });
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

        emergencyUIReset();

        if (cmdRaw === SECRET_PASS) {
            sessionStorage.setItem('is_auth', 'true');
            vault.style.display = 'block';
            vault.style.visibility = 'visible';
            logTerminal("V87_GHOST_READY");
            runNetworkVerify();
            resetIdleTimer();
        } 
        else if (cmdRaw === "clear") {
            clearTerminal();
        }
        else if (cmdRaw === DURESS_PASS) {
            sessionStorage.clear();
            localStorage.clear();
            window.location.replace("https://www.reuters.com");
        }
        else {
            logTerminal("AUTH_ERR", "#ff3b30");
        }
    }
}
