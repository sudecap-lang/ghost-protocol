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
    logTerminal("SESSION_TERMINATED: ALL_SHIELDS_OFF", "#ff9500");
}

function logTerminal(msg, color = "#00ffaa") {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span style="color:${color}">[${time}] > ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

// GERA RUÍDO DE REDE PARA CONFUNDIR RASTREADORES
function startTrafficNoise() {
    logTerminal("TRAFFIC_NOISE_GENERATOR: START", "#00aaff");
    noiseInterval = setInterval(() => {
        fetch(`https://www.google.com/favicon.ico?q=${Math.random()}`, { mode: 'no-cors' });
        fetch(`https://www.wikipedia.org/static/apple-touch-icon.png?q=${Math.random()}`, { mode: 'no-cors' });
    }, 5000); 
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        vault.style.filter = "none"; // Remove blur ao interagir
        idleTimer = setTimeout(() => {
            vault.style.filter = "blur(10px)"; // Embaça por segurança
            logTerminal("VISUAL_SHIELD: BLUR_ACTIVE", "#ff9500");
        }, 10000); // 10 segundos para embaçar
        
        // Timer de 5 min para trancar total
        setTimeout(() => { if(vault.style.display === 'block') forceLock(); }, 300000);
    }
}

window.onload = () => {
    forceLock();
    logTerminal("GHOST_OS v44.0 - ANONYMITY_OVERDRIVE");
    document.addEventListener('touchstart', resetIdleTimer);
    document.addEventListener('click', resetIdleTimer);
};

// --- ACTION FUNCTIONS ---

async function runNetworkVerify() {
    logTerminal("PROBING_ANONYMITY_TUNNEL...", "#00aaff");
    try {
        await fetch(`https://test.nextdns.io/?t=${Date.now()}`, { mode: 'no-cors' });
        logTerminal("ANONYMITY_STATUS: ENCRYPTED", "#34c759");
    } catch (e) {
        logTerminal("ANONYMITY_STATUS: COMPROMISED", "#ff3b30");
    }
}

function openLogs() {
    logTerminal("FETCHING_SECURE_LOGS...");
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
}

function emergencyWipe() {
    localStorage.clear();
    logTerminal("WIPING_ALL_TRACES...", "#ff3b30");
    setTimeout(() => { window.location.replace("https://www.reuters.com"); }, 300);
}

// --- ACCESS LOGIC ---

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmdRaw = input.value;
        input.value = '';

        if (cmdRaw === SECRET_PASS) {
            logTerminal("AUTH_SUCCESS: PRIVACY_LAYERS_ON", "#00ff00");
            if (vault) {
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
                startTrafficNoise();
                resetIdleTimer();
            }
        } 
        else if (cmdRaw === DURESS_PASS) {
            logTerminal("AUTH_SUCCESS: GUEST_MODE", "#00ff00");
            localStorage.clear();
            if (vault) {
                vault.innerHTML = "<div style='padding:20px; color:#444;'>Secure Session: No data found.</div>";
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
            }
        }
        else {
            logTerminal("AUTH_FAILURE: ACCESS_DENIED", "#ff3b30");
            forceLock();
        }
    }
}
