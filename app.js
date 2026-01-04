// --- AGENT CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; // CHANGE YOUR PASSWORD HERE
let attemptCounter = 0;
// ------------------------------

const terminal = document.getElementById('terminal-display');

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
            attemptCounter = 0;
            document.getElementById('secret-vault').style.display = 'block';
            logTerminal("ACCESS GRANTED: VAULT OPENED", "#00ff64");
        } else {
            attemptCounter++;
            const remains = 3 - attemptCounter;
            logTerminal(`ERROR: INVALID CREDENTIALS (${remains} ATTEMPTS LEFT)`, "#ff4b2b");
            
            if (attemptCounter >= 3) {
                logTerminal("SECURITY PROTOCOL ACTIVATED: WIPING DATA...", "#ff4b2b");
                setTimeout(emergencyWipe, 1000);
            }
        }
    }
}

function runPrivacyScrub() {
    logTerminal("SCRUBBING METADATA AND CACHE...");
    if (window.history.replaceState) {
        window.history.replaceState({}, document.title, "/");
    }
    setTimeout(() => logTerminal("SYSTEM SANITIZED."), 1000);
}

function toggleStealth() {
    logTerminal("GHOST CLOAK ACTIVATED.");
    document.body.style.filter = "brightness(0.5) contrast(1.4) sepia(0.3)";
}

function emergencyWipe() {
    localStorage.clear();
    sessionStorage.clear();
    document.body.innerHTML = "<h1 style='color:white; text-align:center; margin-top:50%; font-family:monospace;'>SYSTEM_OFFLINE</h1>";
    setTimeout(() => {
        window.location.replace("https://www.google.com");
    }, 1500);
}

logTerminal("SECURE LINK ESTABLISHED.");
