// --- ADVANCED AGENT CONFIG ---
const SECRET_PASS = "77 Abacate 77*"; 
let attemptCounter = 0;
let sessionTimer;
const SESSION_EXPIRY = 300000; // 5 minutes
// ------------------------------

const terminal = document.getElementById('terminal-display');

function logTerminal(msg, color = "#34c759") {
    const time = new Date().toLocaleTimeString();
    terminal.innerHTML += `<br><span style="color: ${color}">[${time}] > ${msg}</span>`;
    terminal.scrollTop = terminal.scrollHeight;
}

// Advanced Auto-Lock on Visibility Change
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        sessionTimer = setTimeout(lockVault, SESSION_EXPIRY);
        logTerminal("BG_MODE: SESSION_EXPIRY_TIMER_START", "#ff9500");
    } else {
        clearTimeout(sessionTimer);
        logTerminal("RESUMED: SESSION_VALID.");
    }
});

function lockVault() {
    document.getElementById('secret-vault').style.display = 'none';
    logTerminal("SECURITY_EVENT: AUTO_LOCK_EXECUTED", "#ff3b30");
}

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmd = input.value;
        input.value = '';

        if (cmd === SECRET_PASS) {
            attemptCounter = 0;
            document.getElementById('secret-vault').style.display = 'block';
            logTerminal("ENCRYPTION_KEY_ACCEPTED.", "#34c759");
        } else {
            attemptCounter++;
            logTerminal(`AUTH_ERR: ${3-attemptCounter} ATTEMPTS REMAINING`, "#ff3b30");
            if (attemptCounter >= 3) emergencyWipe();
        }
    }
}

function runPrivacyScrub() {
    logTerminal("SCRUBBING_LOCAL_RAM...");
    localStorage.clear();
    sessionStorage.clear();
    // Anti-forensic dummy history filling
    for(let i=0; i<5; i++) {
        window.history.pushState({}, '', `?id=${Math.random().toString(36).substring(7)}`);
    }
    logTerminal("SCRUB_COMPLETE. DUMMY_TRAILS_INJECTED.");
}

function toggleStealth() {
    logTerminal("GHOST_LAYER: VISUAL_CLOAKING_ACTIVE.");
    document.body.style.filter = "grayscale(1) brightness(0.4) contrast(1.2)";
}

function emergencyWipe() {
    logTerminal("CRITICAL: DESTROYING_SESSION...");
    localStorage.clear();
    sessionStorage.clear();
    // Redirect to a neutral news site
    window.location.replace("https://www.reuters.com");
}

logTerminal("SYSTEM_INIT: LEVEL_ADVANCED_ACTIVE.");
