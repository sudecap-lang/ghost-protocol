// --- AGENT CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
let attemptCounter = 0;
let sessionTimeout;
const AUTO_DESTRUCT_TIME = 5 * 60 * 1000; // 5 Minutes in milliseconds
// ------------------------------

const terminal = document.getElementById('terminal-display');

function logTerminal(msg, color = "#00f2ff") {
    const time = new Date().toLocaleTimeString();
    terminal.innerHTML += `<br><span style="color: ${color}">[${time}] > ${msg}</span>`;
    terminal.scrollTop = terminal.scrollHeight;
}

// AUTO-DESTRUCT LOGIC
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        logTerminal("APP_MINIMIZED: STARTING_AUTO_DESTRUCT_TIMER...", "#ffaa00");
        sessionTimeout = setTimeout(() => {
            lockVault();
        }, AUTO_DESTRUCT_TIME);
    } else {
        clearTimeout(sessionTimeout);
        logTerminal("APP_RESUMED: SESSION_PROTECTED.");
    }
});

function lockVault() {
    document.getElementById('secret-vault').style.display = 'none';
    logTerminal("SECURITY_ALERT: SESSION_EXPIRED. VAULT_LOCKED.", "#ff4b2b");
}

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmd = input.value;
        input.value = '';

        if (cmd === SECRET_PASS) {
            document.getElementById('secret-vault').style.display = 'block';
            logTerminal("AUTH_SUCCESS: ACCESS_GRANTED.", "#00ff64");
        } else {
            attemptCounter++;
            logTerminal(`AUTH_FAILURE: ATTEMPT ${attemptCounter}/3`, "#ff4b2b");
            if (attemptCounter >= 3) emergencyWipe();
        }
    }
}

function runPrivacyScrub() {
    logTerminal("PURGING_LOCAL_CACHE...");
    localStorage.clear();
    logTerminal("METADATA_CLEANED.");
}

function toggleStealth() {
    logTerminal("GHOST_MODE_ACTIVE.");
    document.body.style.filter = "brightness(0.5) contrast(1.2) grayscale(0.8)";
}

function emergencyWipe() {
    localStorage.clear();
    sessionStorage.clear();
    document.body.innerHTML = "<div style='background:#000; color:#f00; height:100vh; display:flex; align-items:center; justify-content:center; font-family:monospace;'>DATA_PURGED</div>";
    setTimeout(() => window.location.replace("https://www.google.com"), 1000);
}

logTerminal("SECURE_OS_LOADED.");
