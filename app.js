// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const HONEYPOT_PASS = "fbi_guest"; 
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
        vault.style.opacity = "0";
        vault.style.pointerEvents = 'none';
    }
    clearInterval(noiseInterval);
}

function logTerminal(msg, color = "#00ffaa") {
    output.innerHTML += `<br><span style="color:${color}">> ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

function clearTerminal() {
    output.innerHTML = "";
    logTerminal("UI_REFRESHED", "#444");
}

// VERIFICA SE A LOCALIZAÇÃO AINDA ESTÁ EXPOSTA
async function runNetworkVerify() {
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        if (data.ip === "179.191.223.163") {
            logTerminal("CRITICAL: IP_EXPOSED (179.191.223.163)", "#ff3b30");
            logTerminal("LOC: CAMPOS_GOYTACAZES_RJ", "#ff3b30");
        } else {
            logTerminal("SUCCESS: IP_MASKED", "#34c759");
        }
    } catch (e) {
        logTerminal("VERIFICATION_BLOCKED_BY_DNS", "#ff9500");
    }
}

function startEntropyNoise() {
    noiseInterval = setInterval(() => {
        const decoys = ["https://www.apple.com", "https://www.wikipedia.org"];
        fetch(`${decoys[Math.floor(Math.random()*decoys.length)]}/?v=${Math.random()}`, { mode: 'no-cors' }).catch(()=>{});
    }, 5000); 
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        vault.style.filter = "none";
        vault.style.opacity = "1";
        vault.style.pointerEvents = 'auto'; // Garante que os botões funcionem ao interagir
        idleTimer = setTimeout(() => {
            vault.style.filter = "blur(130px) brightness(0.01)";
            vault.style.pointerEvents = 'none'; // Bloqueia toques quando invisível
        }, 3500); 
    }
}

window.ondevicemotion = (event) => {
    let m = event.accelerationIncludingGravity;
    if (Math.abs(m.x) > 40 || Math.abs(m.y) > 40) {
        if (vault && vault.style.display === 'block') emergencyWipe();
    }
};

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        forceLock();
        localStorage.clear();
        sessionStorage.clear();
    }
});

window.onload = () => {
    forceLock();
    output.innerHTML = ""; 
    document.addEventListener('touchstart', resetIdleTimer, {passive: true});
};

// --- FUNÇÕES DE COMANDO ---

function openLogs() {
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/registros`, '_blank');
}

function runPrivacyScrub() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("METADATA_CLEANED", "#00ff00");
}

function toggleStealth() {
    const s = document.body.style;
    s.filter = s.filter.includes("brightness") ? "none" : "brightness(0.01) contrast(40) blur(20px)";
}

function emergencyWipe() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace("https://www.reuters.com");
}

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmdRaw = input.value;
        input.value = '';

        if (cmdRaw === SECRET_PASS) {
            vault.style.display = 'block';
            vault.style.visibility = 'visible';
            vault.style.opacity = "1";
            vault.style.pointerEvents = 'auto';
            startEntropyNoise();
            resetIdleTimer();
            logTerminal("SYSTEM_UNLOCKED");
            runNetworkVerify();
        } 
        else if (cmdRaw === HONEYPOT_PASS) {
            vault.innerHTML = "<div style='padding:20px; color:#111;'>LOG_STORAGE_DISABLED</div>";
            vault.style.display = 'block';
            vault.style.visibility = 'visible';
            vault.style.opacity = "1";
        }
        else if (cmdRaw === DURESS_PASS) {
            emergencyWipe();
        }
        else {
            logTerminal("AUTH_FAILED", "#ff3b30");
            forceLock();
        }
    }
}
