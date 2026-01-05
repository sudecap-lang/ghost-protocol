// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const DURESS_PASS = "1234"; 
const NEXT_DNS_ID = "6ddbfb"; 
// ---------------------------------

const output = document.getElementById('terminal-output');
const vault = document.getElementById('secret-vault');

function forceLock() {
    if (vault) {
        vault.style.display = 'none';
        vault.style.visibility = 'hidden';
    }
}

function logTerminal(msg, color = "#00ffaa") {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span style="color:${color}">[${time}] > ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

window.onload = () => {
    forceLock();
    logTerminal("GHOST_OS v40.0 - MEMORY PROTECTED");
};

// --- DESTRUCTION PROTOCOLS ---

function runPrivacyScrub() {
    // This removes every trace from the browser's permanent storage
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("LOCALSTORAGE_PURGED: OK");
    logTerminal("SESSION_FLUSHED: OK");
}

function emergencyWipe() {
    runPrivacyScrub();
    logTerminal("INITIATING SUDO_WIPE...", "#ff3b30");
    setTimeout(() => {
        window.location.replace("https://www.reuters.com");
    }, 500);
}

// --- OPERATIONAL FUNCTIONS ---

async function runNetworkVerify() {
    logTerminal("NETWORK_PROBE_START...", "#00aaff");
    try {
        await fetch(`https://test.nextdns.io/?t=${Date.now()}`, { mode: 'no-cors' });
        logTerminal("ENCRYPTION_STATUS: GREEN", "#34c759");
    } catch (e) {
        logTerminal("ENCRYPTION_STATUS: HIJACKED", "#ff3b30");
    }
}

function openLogs() {
    logTerminal("RELAYING_TO_LOG_SERVER...");
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
}

function clearTerminal() {
    output.innerHTML = "";
    logTerminal("TERMINAL_FLUSHED.");
}

function toggleStealth() {
    document.body.style.filter = document.body.style.filter.includes("brightness") ? "none" : "brightness(0.6) contrast(1.2)";
    logTerminal("VISUAL_STEALTH_TOGGLED");
}

// --- ACCESS LOGIC ---

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmdRaw = input.value;
        input.value = '';

        if (cmdRaw === SECRET_PASS) {
            logTerminal("AUTH_SUCCESS: ACCESS_LEVEL_0", "#00ff00");
            if (vault) {
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
            }
        } 
        else if (cmdRaw === DURESS_PASS) {
            logTerminal("AUTH_SUCCESS: ACCESS_LEVEL_GUEST", "#00ff00");
            runPrivacyScrub(); // Silently wipes the real keys
            if (vault) {
                vault.innerHTML = "<div style='padding:20px; color:#aaa;'>[Guest Mode]<br>Recent Documents:<br>- recipe_list.txt<br>- backup_log_04.log</div>";
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
