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

// GERA RUÍDO CONSTANTE PARA CAMUFLAGEM DE TRÁFEGO
function startTrafficNoise() {
    logTerminal("ANONYMITY_NOISE: STARTING_DUMMY_TRAFFIC", "#00aaff");
    noiseInterval = setInterval(() => {
        // Simula requisições para servidores globais neutros
        fetch(`https://en.wikipedia.org/wiki/Privacy?q=${Math.random()}`, { mode: 'no-cors' });
    }, 4000); 
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        vault.style.filter = "none";
        idleTimer = setTimeout(() => {
            vault.style.filter = "blur(15px) grayscale(1)";
            logTerminal("SHIELD: AUTO_BLUR_PROTECTION", "#ff9500");
        }, 15000); // 15 segundos sem toque = Blur
    }
}

// BLOQUEIO POR MOVIMENTO BRUSCO (SENSOR)
window.ondevicemotion = (event) => {
    const acceleration = event.accelerationIncludingGravity;
    if (Math.abs(acceleration.x) > 25 || Math.abs(acceleration.y) > 25) {
        if (vault && vault.style.display === 'block') {
            emergencyWipe();
        }
    }
};

window.onload = () => {
    forceLock();
    logTerminal("GHOST_OS v46.0 - TOTAL_ANONYMITY_READY");
    document.addEventListener('touchstart', resetIdleTimer);
};

// --- FUNÇÕES DE OPERAÇÃO ---

async function runNetworkVerify() {
    logTerminal("TESTING_TUNNEL_INTEGRITY...", "#00aaff");
    try {
        await fetch(`https://test.nextdns.io/?t=${Date.now()}`, { mode: 'no-cors' });
        logTerminal("ANONYMITY: SECURE_GREEN", "#34c759");
    } catch (e) {
        logTerminal("ANONYMITY: COMPROMISED", "#ff3b30");
    }
}

function openLogs() {
    logTerminal("RELAYING_ENCRYPTED_LOGS...");
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
}

function clearTerminal() {
    output.innerHTML = "";
    logTerminal("TERMINAL_FLUSHED.");
}

function runPrivacyScrub() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("MEMORY_PURGED: OK", "#00ff00");
}

function toggleStealth() {
    if (document.body.style.filter.includes("brightness")) {
        document.body.style.filter = "none";
        logTerminal("GHOST_MODE: OFF");
    } else {
        document.body.style.filter = "brightness(0.3) contrast(1.5) grayscale(1)";
        logTerminal("GHOST_MODE: ON", "#34c759");
    }
}

function emergencyWipe() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("EMERGENCY_WIPE_INITIATED", "#ff3b30");
    window.location.replace("https://www.reuters.com");
}

// --- LÓGICA DE ACESSO ---

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmdRaw = input.value;
        input.value = '';

        if (cmdRaw === SECRET_PASS) {
            logTerminal("AUTH: SUCCESS_LEVEL_GOD", "#00ff00");
            if (vault) {
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
                startTrafficNoise();
                resetIdleTimer();
            }
        } 
        else if (cmdRaw === DURESS_PASS) {
            logTerminal("AUTH: SUCCESS_LEVEL_GUEST", "#00ff00");
            runPrivacyScrub();
            if (vault) {
                vault.innerHTML = "<div style='padding:20px; color:#444;'>No files found on this device.</div>";
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
            }
        }
        else {
            logTerminal("AUTH: FAILED_UNAUTHORIZED", "#ff3b30");
            forceLock();
        }
    }
}
