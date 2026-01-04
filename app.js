// --- FIELD AGENT CONFIGURATION ---
const SECRET_PASS = "1234"; 
const NEXT_DNS_DASHBOARD = "https://my.nextdns.io"; // Shortcut to your logs
// ---------------------------------

const terminal = document.getElementById('terminal-display');

function logTerminal(msg, color = "#34c759") {
    const time = new Date().toLocaleTimeString();
    terminal.innerHTML += `<br><span style="color: ${color}">[${time}] > ${msg}</span>`;
    terminal.scrollTop = terminal.scrollHeight;
}

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmd = input.value;
        input.value = '';

        if (cmd === SECRET_PASS) {
            document.getElementById('secret-vault').style.display = 'block';
            logTerminal("AUTH_SUCCESS: VAULT_DECRYPTED", "#00ff64");
            logTerminal("ADVISORY: MONITOR_LOGS_AT_NEXTDNS", "#ff9500");
        } else if (cmd === "logs") {
            window.open(NEXT_DNS_DASHBOARD, '_blank');
        } else {
            logTerminal("AUTH_FAILURE: ATTEMPT_LOGGED", "#ff3b30");
        }
    }
}

function runPrivacyScrub() {
    logTerminal("INITIATING_RAM_FLUSH...");
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("DUMMY_DATA_INJECTED. SYSTEM_READY.");
}

function toggleStealth() {
    logTerminal("STEALTH_LAYER_ENGAGED.");
    document.body.style.filter = "grayscale(1) brightness(0.3) contrast(1.5)";
}

function emergencyWipe() {
    localStorage.clear();
    window.location.replace("https://www.reuters.com");
}

logTerminal("SYSTEM_V5.8_ACTIVE.");
logTerminal("DNS_TUNNEL_ESTABLISHED.");
