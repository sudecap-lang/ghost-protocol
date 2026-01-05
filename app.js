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

// GERA RUÍDO PARA CAMUFLAR OS LOGS DA META QUE VOCÊ VIU
function startTrafficNoise() {
    logTerminal("TRAFFIC_DECEPTION: ACTIVE", "#00aaff");
    noiseInterval = setInterval(() => {
        // Alvos neutros para confundir análise de padrão de tráfego
        fetch(`https://www.google.com/favicon.ico?v=${Math.random()}`, { mode: 'no-cors' });
        fetch(`https://www.apple.com/favicon.ico?v=${Math.random()}`, { mode: 'no-cors' });
    }, 4500); 
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        vault.style.filter = "none";
        idleTimer = setTimeout(() => {
            vault.style.filter = "blur(25px) brightness(0.3)";
            logTerminal("AUTO_SHIELD: PRIVACY_BLUR_ON", "#ff9500");
        }, 15000); 
    }
}

// PROTEÇÃO CONTRA TOMADA FÍSICA
window.ondevicemotion = (event) => {
    let acc = event.accelerationIncludingGravity;
    if (Math.abs(acc.x) > 25 || Math.abs(acc.y) > 25) {
        if (vault && vault.style.display === 'block') emergencyWipe();
    }
};

window.onload = () => {
    forceLock();
    logTerminal("GHOST_OS v52.0 - MONITORING_STATUS_STABLE");
    document.addEventListener('touchstart', resetIdleTimer);
};

// --- FUNÇÕES DE COMANDO ---

async function runNetworkVerify() {
    logTerminal("VERIFYING_ENCRYPTION_LAYERS...", "#00aaff");
    try {
        await fetch(`https://test.nextdns.io/?t=${Date.now()}`, { mode: 'no-cors' });
        logTerminal("ANONYMITY: ACTIVE_FILTERING", "#34c759");
    } catch (e) {
        logTerminal("ANONYMITY: FILTER_BYPASS_DETECTED", "#ff3b30");
    }
}

function openLogs() {
    logTerminal("ACCESSING_REMOTE_REGISTROS...");
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
}

function clearTerminal() {
    output.innerHTML = "";
    logTerminal("TERMINAL_CLEARED.");
}

function runPrivacyScrub() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("SESSION_DATA_DESTROYED", "#00ff00");
}

function toggleStealth() {
    document.body.style.filter = document.body.style.filter.includes("brightness") ? 
        "none" : "brightness(0.15) contrast(2) grayscale(1)";
    logTerminal("STEALTH_MODE_UPDATED");
}

function emergencyWipe() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("PROTOCOL_RED: FULL_WIPE", "#ff3b30");
    window.location.replace("https://www.reuters.com");
}

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmdRaw = input.value;
        input.value = '';

        if (cmdRaw === SECRET_PASS) {
            logTerminal("AUTH_SUCCESS: SYSTEM_OPEN", "#00ff00");
            if (vault) {
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
                startTrafficNoise();
                resetIdleTimer();
            }
        } 
        else if (cmdRaw === DURESS_PASS) {
            logTerminal("AUTH_SUCCESS: DECOY_LOADED", "#00ff00");
            runPrivacyScrub();
            if (vault) {
                vault.innerHTML = "<div style='padding:20px; color:#333;'>Logs: empty. Cache: empty.</div>";
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
            }
        }
        else {
            logTerminal("AUTH_FAILED: RE-LOCKING", "#ff3b30");
            forceLock();
        }
    }
}
