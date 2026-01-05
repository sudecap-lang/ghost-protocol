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

// CAMUFLAGEM DE TRÁFEGO PARA DESPISTAR TELEMETRIA GOVERNAMENTAL
function startTrafficNoise() {
    logTerminal("DECEPTION_PROTOCOL: GOV_MODE_ACTIVE", "#00aaff");
    noiseInterval = setInterval(() => {
        // Alvos de ruído para "sujar" os logs de telemetria do Firebase/Google
        fetch(`https://www.google.com/robots.txt?v=${Math.random()}`, { mode: 'no-cors' });
        fetch(`https://www.reuters.com/sitemap.xml?v=${Math.random()}`, { mode: 'no-cors' });
    }, 3500); 
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        vault.style.filter = "none";
        idleTimer = setTimeout(() => {
            vault.style.filter = "blur(35px) brightness(0.15) grayscale(1)";
            logTerminal("SHIELD: MAX_BLUR_PROTECTION", "#ff9500");
        }, 12000); 
    }
}

// BLOQUEIO POR MOVIMENTO (PROTEÇÃO CONTRA TOMADA FÍSICA)
window.ondevicemotion = (event) => {
    let acc = event.accelerationIncludingGravity;
    if (Math.abs(acc.x) > 27 || Math.abs(acc.y) > 27) {
        if (vault && vault.style.display === 'block') emergencyWipe();
    }
};

window.onload = () => {
    forceLock();
    logTerminal("GHOST_OS v56.0 - GOV_TRACKING_INHIBITED");
    document.addEventListener('touchstart', resetIdleTimer);
};

// --- FUNÇÕES OPERACIONAIS ---

async function runNetworkVerify() {
    logTerminal("SCANNING_GOV_FIREWALL_LEAKS...", "#00aaff");
    try {
        await fetch(`https://test.nextdns.io/?t=${Date.now()}`, { mode: 'no-cors' });
        logTerminal("STATUS: ENCRYPTED_DNS_STABLE", "#34c759");
        logTerminal("TELEMETRY: FIREBASE_BLOCKED", "#34c759");
    } catch (e) {
        logTerminal("CRITICAL: SIGNAL_INTERCEPTION", "#ff3b30");
    }
}

function openLogs() {
    logTerminal("CONNECTING_TO_ENCRYPTED_LOGS...");
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/registros`, '_blank');
}

function runPrivacyScrub() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("VOLATILE_MEMORY_FLUSHED", "#00ff00");
}

function toggleStealth() {
    document.body.style.filter = document.body.style.filter.includes("brightness") ? 
        "none" : "brightness(0.05) contrast(4) grayscale(1)";
    logTerminal("STEALTH_LAYER: MAXIMUM_OBSCURITY");
}

function emergencyWipe() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("INITIATING_DESTRUCTION_PROTOCOL", "#ff3b30");
    window.location.replace("https://www.reuters.com");
}

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmdRaw = input.value;
        input.value = '';

        if (cmdRaw === SECRET_PASS) {
            logTerminal("ACCESS: GRANTED_LEVEL_ALPHA", "#00ff00");
            if (vault) {
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
                startTrafficNoise();
                resetIdleTimer();
            }
        } 
        else if (cmdRaw === DURESS_PASS) {
            logTerminal("ACCESS: DECOY_PROTOCOL", "#00ff00");
            runPrivacyScrub();
            if (vault) {
                vault.innerHTML = "<div style='padding:20px; color:#111;'>System healthy. No unauthorized logs.</div>";
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
            }
        }
        else {
            logTerminal("ACCESS: DENIED_LOCKING", "#ff3b30");
            forceLock();
        }
    }
}
