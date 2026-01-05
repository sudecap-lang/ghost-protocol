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

// GARANTE QUE OS BOTÕES E INPUT ESTEJAM SEMPRE ACESSÍVEIS
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

// FUNÇÃO CLEAR TERMINAL (REPARADA)
function clearTerminal() {
    output.innerHTML = "";
    logTerminal("TERMINAL_BUFFER_REBUILT", "#444");
    emergencyUIReset();
}

// GHOST MODE: RUÍDO DE REDE PARA DILUIR IP 179.191.223.163
function toggleGhostMode() {
    if (noiseInterval) {
        clearInterval(noiseInterval);
        noiseInterval = null;
        logTerminal("GHOST_MODE: DISABLED", "#ff3b30");
    } else {
        logTerminal("GHOST_MODE: INITIALIZING...", "#00ffaa");
        noiseInterval = setInterval(() => {
            fetch(`https://www.apple.com/library/test/success.html?t=${Math.random()}`, { mode: 'no-cors' }).catch(()=>{});
        }, 4000);
        logTerminal("GHOST_MODE: ACTIVE (DILUTING_TRAFFIC)", "#34c759");
    }
}

async function runNetworkVerify() {
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        const color = data.ip === "179.191.223.163" ? "#ff3b30" : "#34c759";
        logTerminal(`CURRENT_NET_IP: ${data.ip}`, color);
    } catch (e) {
        logTerminal("NETWORK_ENCRYPTION_ACTIVE", "#34c759");
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

// GESTÃO DE PERSISTÊNCIA
document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
        emergencyUIReset();
        if (sessionStorage.getItem('is_auth') === 'true') {
            logTerminal("RE-SYNCING_SESSION...", "#555");
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

// --- COMANDOS ATIVOS ---

function openLogs() {
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/registros`, '_blank');
}

function runPrivacyScrub() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("CORE_WIPE_EXECUTED", "#ff3b30");
    setTimeout(() => location.reload(), 800);
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
            logTerminal("V86_CORE_READY");
            runNetworkVerify();
            resetIdleTimer();
        } 
        else if (cmdRaw === "clear") {
            clearTerminal();
        }
        else if (cmdRaw === DURESS_PASS) {
            runPrivacyScrub();
            window.location.replace("https://www.reuters.com");
        }
        else {
            logTerminal("AUTH_ERROR", "#ff3b30");
        }
    }
}
