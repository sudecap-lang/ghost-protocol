// --- AGENT CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
let attemptCounter = 0;
// ------------------------------

const terminal = document.getElementById('terminal-display');

// Heartbeat simulator
setInterval(() => {
    if (Math.random() > 0.8) logTerminal("ENCRYPTED_PACKET_SENT", "#444");
}, 5000);

function logTerminal(msg, color = "#00f2ff") {
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
            logTerminal("AUTH_SUCCESS: DECRYPTING_VAULT...", "#00ff64");
        } else {
            attemptCounter++;
            logTerminal(`AUTH_FAILURE: ATTEMPT ${attemptCounter}/3`, "#ff4b2b");
            if (attemptCounter >= 3) emergencyWipe();
        }
    }
}

function runPrivacyScrub() {
    logTerminal("INITIATING_DEEP_CLEAN...");
    logTerminal("FLUSHING_DNS_CACHE...");
    logTerminal("PURGING_LOCAL_STORAGE...");
    localStorage.clear();
    logTerminal("SCRUB_COMPLETE. RAM_CLEAN.");
}

function toggleStealth() {
    logTerminal("GHOST_CLOAK_ENGAGED. UI_FADING.");
    document.body.style.filter = "brightness(0.4) contrast(1.2) grayscale(0.5)";
}

function emergencyWipe() {
    logTerminal("PANIC_PROTOCOL_ALPHA: DESTROYING_SESSION...");
    sessionStorage.clear();
    localStorage.clear();
    document.body.innerHTML = "<div style='background:#000; color:#f00; height:100vh; display:flex; align-items:center; justify-content:center; font-family:monospace;'>NO_SIGNAL</div>";
    setTimeout(() => window.location.replace("https://www.google.com"), 1000);
}
