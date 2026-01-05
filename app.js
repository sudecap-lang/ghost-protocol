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
    }
    clearInterval(noiseInterval);
}

function logTerminal(msg, color = "#00ffaa") {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span style="color:${color}">[${time}] > ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

// CAMUFLAGEM PARA OCULTAR O USO DE COMUNICAÇÕES SEGURAS (PROTON)
function startTrafficNoise() {
    logTerminal("SECURE_COMM_CAMOUFLAGE: ON", "#00aaff");
    noiseInterval = setInterval(() => {
        // Tráfego "ruído" para diluir os registros de API do Proton e Intelbras
        fetch(`https://www.reuters.com/favicon.ico?v=${Math.random()}`, { mode: 'no-cors' });
    }, 4500); 
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        vault.style.filter = "none";
        idleTimer = setTimeout(() => {
            vault.style.filter = "blur(30px) brightness(0.25)";
            logTerminal("SHIELD: IDLE_PROTECTION_ENGAGED", "#ff9500");
        }, 12000); 
    }
}

// PROTEÇÃO CONTRA ROUBO (WIPE POR MOVIMENTO)
window.ondevicemotion = (event) => {
    let acc = event.accelerationIncludingGravity;
    if (Math.abs(acc.x) > 26 || Math.abs(acc.y) > 26) {
        if (vault && vault.style.display === 'block') emergencyWipe();
    }
};

window.onload = () => {
    forceLock();
    logTerminal("GHOST_OS v55.0 - PROTON_COMM_PROTECTED");
    document.addEventListener('touchstart', resetIdleTimer);
};

// --- OPERATIONAL TOOLS ---

async function runNetworkVerify() {
    logTerminal("CHECKING_SECURITY_LOGS...", "#00aaff");
    try {
        await fetch(`https://test.nextdns.io/?t=${Date.now()}`, { mode: 'no-cors' });
        logTerminal("ANONYMITY: MULTI_APP_FILTERING_ACTIVE", "#34c759");
        logTerminal("TRACE_INFO: SENTRY_TELEMETRY_BLOCKED", "#34c759");
    } catch (e) {
        logTerminal("CRITICAL: FILTER_FAILURE", "#ff3b30");
    }
}

function openLogs() {
    logTerminal("CONNECTING_TO_NEXTDNS_REGISTROS...");
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/registros`, '_blank');
}

function runPrivacyScrub() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("VOLATILE_MEMORY_PURGED", "#00ff00");
}

function toggleStealth() {
    document.body.style.filter = document.body.style.filter.includes("brightness") ? 
        "none" : "brightness(0.15) contrast(2) grayscale(1)";
    logTerminal("STEALTH_MODE: STATUS_CHANGED");
}

function emergencyWipe() {
    localStorage.clear();
    logTerminal("EXEC_WIPE: RED_PROTOCOL", "#ff3b30");
    window.location.replace("https://www.reuters.com");
}

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmdRaw = input.value;
        input.value = '';

        if (cmdRaw === SECRET_PASS) {
            logTerminal("ACCESS_GRANTED: COMMANDER", "#00ff00");
            if (vault) {
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
                startTrafficNoise();
                resetIdleTimer();
            }
        } 
        else if (cmdRaw === DURESS_PASS) {
            logTerminal("ACCESS_GRANTED: GUEST_DECOY", "#00ff00");
            runPrivacyScrub();
            if (vault) {
                vault.innerHTML = "<div style='padding:20px; color:#333;'>Logs clean. Partition encrypted.</div>";
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
            }
        }
        else {
            logTerminal("ACCESS_DENIED: RE-LOCKING", "#ff3b30");
            forceLock();
        }
    }
}
