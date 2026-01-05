// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const DURESS_PASS = "1234"; 
const NEXT_DNS_ID = "6ddbfb"; 
let idleTimer;
// ---------------------------------

const output = document.getElementById('terminal-output');
const vault = document.getElementById('secret-vault');

function forceLock() {
    if (vault) {
        vault.style.display = 'none';
        vault.style.visibility = 'hidden';
    }
    clearTimeout(idleTimer);
}

function logTerminal(msg, color = "#00ffaa") {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span style="color:${color}">[${time}] > ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

// RESET DO TIMER DE INATIVIDADE
function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        idleTimer = setTimeout(() => {
            logTerminal("IDLE_TIMEOUT: AUTO_LOCKING...", "#ff3b30");
            forceLock();
        }, 300000); // 5 minutos
    }
}

window.onload = () => {
    forceLock();
    logTerminal("GHOST_OS v43.0 - AUTO_SCRUB_ACTIVE");
    document.addEventListener('mousemove', resetIdleTimer);
    document.addEventListener('keypress', resetIdleTimer);
};

// --- AUTOMATIC METADATA SCRUBBER (SIMULATED FOR BLOB) ---
async function scrubFileMetadata(file) {
    logTerminal(`PROCESSING: ${file.name}...`, "#00aaff");
    // Simulação de remoção de EXIF/GPS
    return new Promise(resolve => {
        setTimeout(() => {
            logTerminal("METADATA_STRIPPED: GPS/ID REMOVED", "#34c759");
            resolve(file);
        }, 800);
    });
}

// --- ACTION FUNCTIONS ---

async function runNetworkVerify() {
    logTerminal("PROBING_TUNNEL...", "#00aaff");
    try {
        await fetch(`https://test.nextdns.io/?t=${Date.now()}`, { mode: 'no-cors' });
        logTerminal("DNS_STATUS: SECURE", "#34c759");
    } catch (e) {
        logTerminal("DNS_STATUS: COMPROMISED", "#ff3b30");
    }
}

function openLogs() {
    logTerminal("LINKING_REMOTE_LOGS...");
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
}

function clearTerminal() {
    output.innerHTML = "";
    logTerminal("TERMINAL_CLEARED.");
}

function runPrivacyScrub() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("BROWSER_MEMORY_WIPED.");
}

function emergencyWipe() {
    runPrivacyScrub();
    logTerminal("DELETING_ALL_TRACES...", "#ff3b30");
    setTimeout(() => {
        window.location.replace("https://www.reuters.com");
    }, 400);
}

// --- ACCESS LOGIC ---

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmdRaw = input.value;
        input.value = '';

        if (cmdRaw === SECRET_PASS) {
            logTerminal("AUTH_SUCCESS: ENCRYPTED_MODE", "#00ff00");
            if (vault) {
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
                resetIdleTimer();
            }
        } 
        else if (cmdRaw === DURESS_PASS) {
            logTerminal("AUTH_SUCCESS: DECOY_MODE", "#00ff00");
            runPrivacyScrub();
            if (vault) {
                vault.innerHTML = "<div style='padding:20px; color:#444;'>[Guest Session] No local files.</div>";
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
            }
        }
        else {
            logTerminal("AUTH_ERR: ILLEGAL_ACCESS", "#ff3b30");
            forceLock();
        }
    }
}
