// --- BLACK CELL CONFIGURATION ---
const REAL_PASS = "77 Abacate 77*"; 
const NEXT_DNS_ID = "6ddbfb"; 
// ---------------------------------

const output = document.getElementById('terminal-output');

function logTerminal(msg, color = "#34c759") {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span style="color:${color}">[${time}] ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

// Verifica se o DNS está ativo ao carregar
async function checkSecurityStatus() {
    try {
        const response = await fetch('https://test.nextdns.io');
        const data = await response.json();
        if (data.status === "ok") {
            logTerminal("ENCRYPTION: ACTIVE (NEXTDNS)", "#00ff00");
        } else {
            logTerminal("WARNING: EXPOSED TO ISP NETWORK", "#ff3b30");
        }
    } catch (e) {
        logTerminal("CHECK_FAILED: RE-INSTALL PROFILE", "#ff9500");
    }
}

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmd = input.value;
        input.value = '';

        if (cmd.toLowerCase() === "logs") {
            logTerminal("> OPENING_SURVEILLANCE_RECORDS...");
            window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
        } else if (cmd === REAL_PASS) {
            logTerminal("> ACCESS_GRANTED: VAULT_OPEN");
            document.getElementById('secret-vault').style.display = 'block';
        } else {
            logTerminal("> AUTH_FAILURE: INVALID_KEY", "#ff3b30");
        }
    }
}

function runPrivacyScrub() {
    logTerminal("> SCRUBBING_RAM...");
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("> CLEAN_COMPLETE.");
}

function toggleStealth() {
    logTerminal("> CLOAKING_ACTIVE.");
    document.body.style.filter = "brightness(0.2) grayscale(1)";
}

function emergencyWipe() {
    localStorage.clear();
    window.location.replace("https://www.reuters.com");
}

logTerminal("> SYSTEM_INIT: TARGET_ID 6DDBFB");
checkSecurityStatus();
