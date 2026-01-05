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
    logTerminal("RECOVERY_WIPE_SUCCESS", "#444");
}

// NOVA FUNÇÃO DE VERIFICAÇÃO RESILIENTE (NÃO DEVE DAR CHECK_FAILED)
async function runNetworkVerify() {
    const checkPoints = [
        'https://api.ipify.org?format=json',
        'https://icanhazip.com',
        'https://cloudflare.com/cdn-cgi/trace'
    ];
    
    logTerminal("SYNCING_NETWORK...", "#ff9500");
    
    for (let url of checkPoints) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            
            const res = await fetch(url, { signal: controller.signal });
            const data = await res.text();
            
            // Verifica se o seu IP real (179.191.223.163) aparece na resposta
            if (data.includes("179.191.223.163")) {
                logTerminal("STATUS: IP_EXPOSED", "#ff3b30");
                logTerminal("LOC: Campos_RJ", "#ff3b30");
            } else {
                logTerminal("STATUS: IP_MASKED", "#34c759");
            }
            return; // Sai do loop se conseguir verificar
        } catch (e) {
            continue; // Tenta o próximo servidor se este falhar
        }
    }
    logTerminal("CRITICAL: ALL_CHECKPOINTS_BLOCKED", "#ff3b30");
}

function startEntropyNoise() {
    noiseInterval = setInterval(() => {
        const targets = ["https://www.apple.com", "https://www.wikipedia.org"];
        fetch(`${targets[Math.floor(Math.random()*targets.length)]}/?z=${Math.random()}`, { mode: 'no-cors' }).catch(()=>{});
    }, 6000); 
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        vault.style.filter = "none";
        vault.style.opacity = "1";
        idleTimer = setTimeout(() => {
            vault.style.filter = "blur(125px) brightness(0)";
        }, 3000); 
    }
}

// LIMPEZA PROFUNDA DE IDENTIDADE (ANTI-LOCALIZAÇÃO)
function deepCleanIdentity() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("BROWSER_FINGERPRINT_CLEARED", "#00ff00");
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
        deepCleanIdentity();
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
    deepCleanIdentity();
    logTerminal("CACHE_DESTROYED", "#00ff00");
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
            logTerminal("AUTH_ALPHA_OK");
            runNetworkVerify();
        } 
        else if (cmdRaw === HONEYPOT_PASS) {
            vault.innerHTML = "<div style='padding:20px; color:#000;'>VOLUME_EMPTY</div>";
            vault.style.display = 'block';
            vault.style.visibility = 'visible';
            vault.style.opacity = "1";
        }
        else if (cmdRaw === DURESS_PASS) {
            emergencyWipe();
        }
        else {
            logTerminal("ERR: ACCESS_DENIED", "#ff3b30");
            forceLock();
        }
    }
}
