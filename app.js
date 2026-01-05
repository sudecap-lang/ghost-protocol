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

// GERA RUÍDO PARA CONFUNDIR OS LOGS QUE VOCÊ VIU (FACEBOOK/APPLE)
function startTrafficNoise() {
    logTerminal("DECEPTION_PROTOCOL: INITIATING_DUMMY_TRAFFIC", "#00aaff");
    noiseInterval = setInterval(() => {
        // Envia requisições neutras para "diluir" os logs da Meta
        fetch(`https://www.wikipedia.org/favicon.ico?v=${Math.random()}`, { mode: 'no-cors' });
    }, 5000); 
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        vault.style.filter = "none";
        idleTimer = setTimeout(() => {
            vault.style.filter = "blur(20px) grayscale(1)";
            logTerminal("PRIVACY: AUTO_BLUR_ENABLED", "#ff9500");
        }, 15000); 
    }
}

// WIPE POR MOVIMENTO (PROTEÇÃO FÍSICA)
window.ondevicemotion = (event) => {
    let acc = event.accelerationIncludingGravity;
    if (Math.abs(acc.x) > 25 || Math.abs(acc.y) > 25) {
        if (vault && vault.style.display === 'block') emergencyWipe();
    }
};

window.onload = () => {
    forceLock();
    logTerminal("GHOST_OS v51.0 - META_LEAK_SHIELD_READY");
    document.addEventListener('touchstart', resetIdleTimer);
};

// --- OPERATIONAL COMMANDS ---

async function runNetworkVerify() {
    logTerminal("ANALYZING_TRAFFIC_LOGS...", "#00aaff");
    try {
        await fetch(`https://test.nextdns.io/?t=${Date.now()}`, { mode: 'no-cors' });
        logTerminal("ANONYMITY: MULTI_LAYER_ACTIVE", "#34c759");
    } catch (e) {
        logTerminal("ANONYMITY: LEAK_SUSPECTED", "#ff3b30");
    }
}

function openLogs() {
    logTerminal("OPENING_NEXTDNS_REGISTROS...");
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
}

function clearTerminal() {
    output.innerHTML = "";
    logTerminal("TERMINAL_BUFFER_CLEARED.");
}

function runPrivacyScrub() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("BROWSER_TRACES_WIPED", "#00ff00");
}

function toggleStealth() {
    document.body.style.filter = document.body.style.filter.includes("brightness") ? 
        "none" : "brightness(0.2) contrast(1.5) grayscale(1)";
    logTerminal("STEALTH_MODE_TOGGLED");
}

function emergencyWipe() {
    localStorage.clear();
    logTerminal("CRITICAL: EMERGENCY_DESTRUCTION", "#ff3b30");
    window.location.replace("https://www.reuters.com");
}

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
                vault.innerHTML = "<div style='padding:20px; color:#333;'>Empty session. No records found.</div>";
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
            }
        }
        else {
            logTerminal("AUTH_FAILURE: INTERFACE_LOCKED", "#ff3b30");
            forceLock();
        }
    }
}
