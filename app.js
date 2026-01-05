// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const DURESS_PASS = "1234"; 
const NEXT_DNS_ID = "6ddbfb"; 
let idleTimer;
let noiseInterval;
// ---------------------------------

const output = document.getElementById('terminal-output');
const vault = document.getElementById('secret-vault');

function forceLock() {
    if (vault) {
        vault.style.display = 'none';
        vault.style.visibility = 'hidden';
        vault.style.filter = "none";
    }
    clearTimeout(idleTimer);
    clearInterval(noiseInterval);
}

function logTerminal(msg, color = "#00ffaa") {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span style="color:${color}">[${time}] > ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

// GERA RUÍDO PARA OCULTAR TRÁFEGO REAL
function startTrafficNoise() {
    noiseInterval = setInterval(() => {
        fetch(`https://www.google.com/favicon.ico?q=${Math.random()}`, { mode: 'no-cors' });
    }, 8000); 
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        vault.style.filter = "none";
        idleTimer = setTimeout(() => {
            vault.style.filter = "blur(10px)";
            logTerminal("SHIELD: VISUAL_BLUR_ACTIVE", "#ff9500");
        }, 15000); // 15 seg para embaçar
    }
}

window.onload = () => {
    forceLock();
    logTerminal("GHOST_OS v45.0 - INTERFACE_STABLE");
    document.addEventListener('touchstart', resetIdleTimer);
    document.addEventListener('click', resetIdleTimer);
};

// --- FUNÇÕES DOS BOTÕES (CORRIGIDAS) ---

async function runNetworkVerify() {
    logTerminal("VERIFYING_CONNECTION...", "#00aaff");
    try {
        await fetch(`https://test.nextdns.io/?t=${Date.now()}`, { mode: 'no-cors' });
        logTerminal("STATUS: SECURE_TUNNEL_ACTIVE", "#34c759");
    } catch (e) {
        logTerminal("STATUS: CONNECTION_FAILED", "#ff3b30");
    }
}

function openLogs() {
    logTerminal("ACCESSING_LOG_SERVER...");
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
}

function clearTerminal() {
    output.innerHTML = "";
    logTerminal("TERMINAL_FLUSHED.");
}

function runPrivacyScrub() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("PRIVACY_SCRUB: MEMORY_PURGED", "#00ff00");
}

function toggleStealth() {
    if (document.body.style.filter.includes("brightness")) {
        document.body.style.filter = "none";
        logTerminal("GHOST_MODE: DISABLED");
    } else {
        document.body.style.filter = "brightness(0.5) contrast(1.2)";
        logTerminal("GHOST_MODE: ENABLED", "#34c759");
    }
}

function emergencyWipe() {
    localStorage.clear();
    logTerminal("SUDO_WIPE_EXECUTED", "#ff3b30");
    setTimeout(() => { window.location.replace("https://www.reuters.com"); }, 300);
}

// --- LÓGICA DE ACESSO ---

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmdRaw = input.value;
        input.value = '';

        if (cmdRaw === SECRET_PASS) {
            logTerminal("AUTH_SUCCESS: ACCESS_GRANTED", "#00ff00");
            if (vault) {
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
                startTrafficNoise();
                resetIdleTimer();
            }
        } 
        else if (cmdRaw === DURESS_PASS) {
            logTerminal("AUTH_SUCCESS: GUEST_MODE", "#00ff00");
            runPrivacyScrub();
            if (vault) {
                vault.innerHTML = "<div style='padding:20px; color:#555;'>No data found.</div>";
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
            }
        }
        else {
            logTerminal("AUTH_ERR: ACCESS_DENIED", "#ff3b30");
            forceLock();
        }
    }
}
