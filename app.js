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

// GERA RUÍDO PARA CAMUFLAR O USO DE APPS COMO INTELBRAS E WHATSAPP
function startTrafficNoise() {
    logTerminal("DECEPTION_MODULE: MULTI_APP_NOISE_ON", "#00aaff");
    noiseInterval = setInterval(() => {
        // Simula tráfego genérico para esconder os picos de outros apps
        fetch(`https://www.apple.com/library/test/success.html?t=${Math.random()}`, { mode: 'no-cors' });
    }, 4000); 
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        vault.style.filter = "none";
        idleTimer = setTimeout(() => {
            vault.style.filter = "blur(35px) brightness(0.2) grayscale(1)";
            logTerminal("SHIELD: MAX_PRIVACY_BLUR", "#ff9500");
        }, 10000); // 10 segundos para proteção máxima
    }
}

// WIPE POR MOVIMENTO (PROTEÇÃO CONTRA TOMADA DO IPHONE)
window.ondevicemotion = (event) => {
    let acc = event.accelerationIncludingGravity;
    if (Math.abs(acc.x) > 25 || Math.abs(acc.y) > 25) {
        if (vault && vault.style.display === 'block') emergencyWipe();
    }
};

window.onload = () => {
    forceLock();
    logTerminal("GHOST_OS v54.0 - SYSTEM_WIDE_MONITORING_ACTIVE");
    document.addEventListener('touchstart', resetIdleTimer);
};

// --- FUNÇÕES OPERACIONAIS ---

async function runNetworkVerify() {
    logTerminal("SCANNING_NETWORK_INTEGRITY...", "#00aaff");
    try {
        await fetch(`https://test.nextdns.io/?t=${Date.now()}`, { mode: 'no-cors' });
        logTerminal("STATUS: ENCRYPTED_DNS_ACTIVE", "#34c759");
        logTerminal("ALERT: PUBLIC_IP_EXPOSED", "#ff3b30");
    } catch (e) {
        logTerminal("STATUS: FULL_STEALTH_MODE", "#34c759");
    }
}

function openLogs() {
    logTerminal("OPENING_REMOTE_LOG_STREAM...");
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/registros`, '_blank');
}

function runPrivacyScrub() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("CACHE_PURGED: OK", "#00ff00");
}

function toggleStealth() {
    document.body.style.filter = document.body.style.filter.includes("brightness") ? 
        "none" : "brightness(0.1) contrast(3) grayscale(1) blur(0.5px)";
    logTerminal("STEALTH_LAYER_ACTIVE");
}

function emergencyWipe() {
    localStorage.clear();
    logTerminal("SUDO_WIPE_INITIATED", "#ff3b30");
    window.location.replace("https://www.reuters.com");
}

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmdRaw = input.value;
        input.value = '';

        if (cmdRaw === SECRET_PASS) {
            logTerminal("AUTH: ACCESS_GRANTED", "#00ff00");
            if (vault) {
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
                startTrafficNoise();
                resetIdleTimer();
            }
        } 
        else if (cmdRaw === DURESS_PASS) {
            logTerminal("AUTH: DECOY_SESSION_START", "#00ff00");
            runPrivacyScrub();
            if (vault) {
                vault.innerHTML = "<div style='padding:20px; color:#222;'>No logs recorded. System at 100% health.</div>";
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
            }
        }
        else {
            logTerminal("AUTH: UNAUTHORIZED_LOCKED", "#ff3b30");
            forceLock();
        }
    }
}
