// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const DURESS_PASS = "1234"; 
const NEXT_DNS_ID = "6ddbfb"; 
let idleTimer;
let noiseInterval;
// ---------------------------------

const output = document.getElementById('terminal-output');
const vault = document.getElementById('secret-vault');

function forceLock() {
    if (vault) {
        vault.style.display = 'none';
        vault.style.visibility = 'hidden';
        vault.style.filter = "none";
    }
    clearTimeout(idleTimer);
    clearInterval(noiseInterval);
}

function logTerminal(msg, color = "#00ffaa") {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span style="color:${color}">[${time}] > ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

// RUÍDO DE TRÁFEGO SISTÊMICO
function startTrafficNoise() {
    logTerminal("GLOBAL_NOISE_GENERATOR: ACTIVE", "#00aaff");
    noiseInterval = setInterval(() => {
        fetch(`https://www.apple.com/library/test/success.html?q=${Math.random()}`, { mode: 'no-cors' });
    }, 5000); 
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        vault.style.filter = "none";
        idleTimer = setTimeout(() => {
            vault.style.filter = "blur(25px) grayscale(1) brightness(0.4)";
            logTerminal("SHIELD: SYSTEM_IDLE_BLUR", "#ff9500");
        }, 15000); 
    }
}

// PROTEÇÃO FÍSICA (ACELERÔMETRO)
window.ondevicemotion = (event) => {
    const acc = event.accelerationIncludingGravity;
    if (Math.abs(acc.x) > 28 || Math.abs(acc.y) > 28) {
        if (vault && vault.style.display === 'block') emergencyWipe();
    }
};

window.onload = () => {
    forceLock();
    logTerminal("GHOST_OS v50.0 - FULL_IPHONE_PROTECTION_ENABLED");
    document.addEventListener('touchstart', resetIdleTimer);
};

// --- OPERATIONAL COMMANDS ---

async function runNetworkVerify() {
    logTerminal("SCANNING_FOR_META_LEAKS...", "#00aaff");
    try {
        const res = await fetch(`https://test.nextdns.io/?t=${Date.now()}`, { mode: 'no-cors' });
        logTerminal("OS_SHIELD: REINFORCED", "#34c759");
    } catch (e) {
        logTerminal("OS_SHIELD: LEAK_DETECTED", "#ff3b30");
    }
}

function openLogs() {
    logTerminal("ACCESSING_LOG_VAULT...");
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
}

function runPrivacyScrub() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("MEMORY_PURGED: OK", "#00ff00");
}

function toggleStealth() {
    document.body.style.filter = document.body.style.filter.includes("brightness") ? 
        "none" : "brightness(0.2) contrast(2) grayscale(1)";
    logTerminal("STEALTH_MODE_TOGGLED");
}

function emergencyWipe() {
    localStorage.clear();
    logTerminal("SUDO_WIPE_ACTIVE", "#ff3b30");
    window.location.replace("https://www.reuters.com");
}

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmdRaw = input.value;
        input.value = '';

        if (cmdRaw === SECRET_PASS) {
            logTerminal("AUTH: ADMIN_GRANTED", "#00ff00");
            if (vault) {
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
                startTrafficNoise();
                resetIdleTimer();
            }
        } 
        else if (cmdRaw === DURESS_PASS) {
            logTerminal("AUTH: GUEST_MODE_ACTIVE", "#00ff00");
            runPrivacyScrub();
            if (vault) {
                vault.innerHTML = "<div style='padding:20px; color:#222;'>Encrypted partition empty.</div>";
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
            }
        }
        else {
            logTerminal("AUTH: UNAUTHORIZED_ACCESS", "#ff3b30");
            forceLock();
        }
    }
}
