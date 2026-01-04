// --- FIELD AGENT CONFIG ---
const SECRET_PASS = "77 Abacate 77*"; 
let attemptCounter = 0;
// --------------------------

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
        } else {
            attemptCounter++;
            logTerminal(`AUTH_ERR: ATTEMPT ${attemptCounter}/3`, "#ff3b30");
            if (attemptCounter >= 3) emergencyWipe();
        }
    }
}

function runPrivacyScrub() {
    logTerminal("FLUSHING_RAM_CACHE...");
    localStorage.clear();
    sessionStorage.clear();
    // Injecting fake state to confuse trackers
    window.history.replaceState({}, '', `?ref=secure_${Math.floor(Math.random()*1000)}`);
    logTerminal("METADATA_PURGED. TRACE_CLEAN.");
}

function toggleStealth() {
    logTerminal("CLOAKING_INTERFACE...");
    document.body.style.filter = "grayscale(1) brightness(0.3) contrast(1.5)";
}

function emergencyWipe() {
    logTerminal("PANIC: DESTROYING_ALL_LOCAL_DATA...");
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace("https://www.reuters.com");
}

logTerminal("SECURE_LINK_READY.");
