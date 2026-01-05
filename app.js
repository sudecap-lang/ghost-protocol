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
    logTerminal("GHOST_OS v42.0 - ANONYMITY_LAYER_ACTIVE");
};

// --- ACTION FUNCTIONS ---

async function runNetworkVerify() {
    logTerminal("SCANNING_NETWORK_INTEGRITY...", "#00aaff");
    try {
        await fetch(`https://test.nextdns.io/?t=${Date.now()}`, { mode: 'no-cors' });
        logTerminal("DNS_SHIELD: GREEN", "#34c759");
    } catch (e) {
        logTerminal("DNS_SHIELD: WARNING", "#ff9500");
    }
}

function openLogs() {
    logTerminal("FETCHING_REMOTE_LOGS...");
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
}

function clearTerminal() {
    output.innerHTML = "";
    logTerminal("TERMINAL_BUFFER_CLEARED.");
}

function runPrivacyScrub() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("LOCAL_DATA_PURGED.");
}

function emergencyWipe() {
    runPrivacyScrub();
    logTerminal("EXECUTING_SUDO_WIPE...", "#ff3b30");
    setTimeout(() => {
        window.location.replace("https://www.reuters.com");
    }, 400);
}

function toggleStealth() {
    document.body.style.filter = document.body.style.filter.includes("brightness") ? "none" : "brightness(0.6) contrast(1.2)";
    logTerminal("UI_STEALTH_MODE_TOGGLED");
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
            logTerminal("AUTH_SUCCESS: GUEST_REDIRECT", "#00ff00");
            runPrivacyScrub();
            if (vault) {
                vault.innerHTML = "<div style='padding:20px; color:#666;'>No sensitive data stored in this session.</div>";
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
            }
        }
        else {
            logTerminal("AUTH_FAILURE: UNAUTHORIZED", "#ff3b30");
            forceLock();
        }
    }
}
