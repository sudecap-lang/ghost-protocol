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
    }
    clearInterval(noiseInterval);
}

function logTerminal(msg, color = "#00ffaa") {
    output.innerHTML += `<br><span style="color:${color}">> ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

function clearTerminal() {
    output.innerHTML = "";
    logTerminal("RAM_PURGE_COMPLETE", "#555");
}

// VERIFICA SE O SEU IP 179.191.223.163 AINDA ESTÁ EXPOSTO
async function runNetworkVerify() {
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        if (data.ip === "179.191.223.163") {
            logTerminal("LOCATION: EXPOSED (Campos/RJ)", "#ff3b30");
            logTerminal("ADVICE: IP_MASK_REQUIRED", "#ff9500");
        } else {
            logTerminal("LOCATION: MASKED", "#34c759");
        }
    } catch (e) {
        logTerminal("CHECK_FAILED", "#ff3b30");
    }
}

function startEntropyNoise() {
    noiseInterval = setInterval(() => {
        // Alvos de alta confiança para diluir o tráfego
        const targets = ["https://www.apple.com", "https://www.wikipedia.org"];
        fetch(`${targets[Math.floor(Math.random()*targets.length)]}/?nocache=${Math.random()}`, { mode: 'no-cors' }).catch(()=>{});
    }, 5000); 
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        vault.style.filter = "none";
        vault.style.opacity = "1";
        idleTimer = setTimeout(() => {
            vault.style.filter = "blur(120px) brightness(0)";
        }, 3000); 
    }
}

// LIMPEZA DE CACHE E TOKENS DE IDENTIDADE
function deepCleanIdentity() {
    localStorage.clear();
    sessionStorage.clear();
    // Tenta sobrescrever o ID de rastreamento no navegador
    for (let i = 0; i < 100; i++) {
        localStorage.setItem('ghost_id_' + i, Math.random());
    }
    logTerminal("IDENTITY_TOKENS_PURGED", "#00ff00");
}

window.ondevicemotion = (event) => {
    let m = event.accelerationIncludingGravity;
    if (Math.abs(m.x) > 38 || Math.abs(m.y) > 38) {
        if (vault && vault.style.display === 'block') emergencyWipe();
    }
};

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        forceLock();
        deepCleanIdentity();
    }
});

window.onload = () => {
    forceLock();
    output.innerHTML = ""; 
    document.addEventListener('touchstart', resetIdleTimer, {passive: true});
};

// --- FUNÇÕES OPERACIONAIS ---

function openLogs() {
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/registros`, '_blank');
}

function runPrivacyScrub() {
    deepCleanIdentity();
    logTerminal("WIPE_SUCCESS", "#00ff00");
}

function toggleStealth() {
    const s = document.body.style;
    s.filter = s.filter.includes("brightness") ? "none" : "brightness(0.01) contrast(40) blur(20px)";
}

function emergencyWipe() {
    deepCleanIdentity();
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
            startEntropyNoise();
            resetIdleTimer();
            logTerminal("GHOST_OS_LOADED");
            runNetworkVerify();
        } 
        else if (cmdRaw === HONEYPOT_PASS) {
            vault.innerHTML = "<div style='padding:20px; color:#111;'>VOLUME_ENCRYPTED_EMPTY</div>";
            vault.style.display = 'block';
            vault.style.visibility = 'visible';
            vault.style.opacity = "1";
        }
        else if (cmdRaw === DURESS_PASS) {
            emergencyWipe();
        }
        else {
            logTerminal("ACCESS_DENIED", "#ff3b30");
            forceLock();
        }
    }
}
