// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
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
    logTerminal("GHOST_OS v36.0 ONLINE");
};

async function runNetworkVerify() {
    logTerminal("VERIFYING NETWORK TUNNEL...", "#00aaff");
    try {
        const res = await fetch(`https://test.nextdns.io/?t=${Date.now()}`, { mode: 'no-cors' });
        logTerminal("SHIELD: GREEN", "#34c759");
    } catch (e) {
        logTerminal("SHIELD: ERROR", "#ff3b30");
    }
}

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmdRaw = input.value;
        const cmdClean = cmdRaw.toLowerCase().trim();
        input.value = '';

        if (cmdClean === "verify") {
            runNetworkVerify();
        } 
        else if (cmdClean === "logs") {
            window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
        }
        else if (cmdClean === "clear") {
            output.innerHTML = "";
            logTerminal("TERMINAL RESET.");
        }
        else if (cmdRaw === SECRET_PASS) {
            logTerminal("ACCESS GRANTED.", "#00ff00");
            if (vault) {
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
            }
        } 
        else {
            logTerminal(`INVALID COMMAND: '${cmdRaw}'`, "#ff3b30");
            forceLock();
        }
    }
}

function emergencyWipe() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace("https://www.reuters.com");
}

function runPrivacyScrub() {
    localStorage.clear();
    logTerminal("CLEANUP COMPLETE.");
}

function toggleStealth() {
    document.body.style.filter = document.body.style.filter.includes("brightness") ? "none" : "brightness(0.6) contrast(1.2)";
}
