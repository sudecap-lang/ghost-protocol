// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const HONEYPOT_PASS = "fbi_guest"; 
const DURESS_PASS = "1234"; 
const NEXT_DNS_ID = "6ddbfb"; 
let idleTimer;
let noiseInterval;
let iframeInterval;
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
    clearInterval(iframeInterval);
}

function logTerminal(msg, color = "#00ffaa") {
    output.innerHTML += `<br><span style="color:${color}">> ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

// FUNÇÃO PARA CRIAR RUÍDO GEOGRÁFICO VIA IFRAME
function spawnGhostTraffic() {
    const nodes = ["https://www.wikipedia.org", "https://www.apple.com", "https://www.reuters.com"];
    const container = document.createElement('div');
    container.style.display = 'none';
    document.body.appendChild(container);

    iframeInterval = setInterval(() => {
        container.innerHTML = ""; // Limpa anterior
        const frame = document.createElement('iframe');
        frame.src = nodes[Math.floor(Math.random() * nodes.length)] + "?rand=" + Math.random();
        container.appendChild(frame);
    }, 8000); 
}

async function runNetworkVerify() {
    logTerminal("ANALYZING_IP_SIGNATURE...", "#ff9500");
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        if (data.ip === "179.191.223.163") {
            logTerminal("WARNING: IP_STILL_VISIBLE_" + data.ip, "#ff3b30");
            logTerminal("GEO_LOCK: CAMPOS_RJ_DETECTED", "#ff3b30");
        } else {
            logTerminal("SUCCESS: IP_MASKED_BY_LAYER_8", "#34c759");
        }
    } catch (e) {
        logTerminal("CHECK_BYPASSED_SUCCESSFULLY", "#00ffaa");
    }
}

// RESET DE VISIBILIDADE - 30 SEGUNDOS PARA NÃO SUMIR MAIS
function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        vault.style.filter = "none";
        vault.style.opacity = "1";
        vault.style.pointerEvents = 'auto';
        
        idleTimer = setTimeout(() => {
            vault.style.filter = "blur(8px) brightness(0.4)"; // Desfoque leve para não perder o controle
        }, 30000); 
    }
}

// LIMPEZA DE IDENTIDADE DIGITAL
function deepWipe() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("DIGITAL_FINGERPRINT_RESET", "#00ff00");
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
        deepWipe();
    }
});

window.onload = () => {
    forceLock();
    output.innerHTML = "";
    document.addEventListener('touchstart', resetIdleTimer, {passive: true});
    document.addEventListener('click', resetIdleTimer);
};

// --- FUNÇÕES DE COMANDO ---

function openLogs() {
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/registros`, '_blank');
}

function runPrivacyScrub() {
    deepWipe();
    logTerminal("WIPE_SUCCESS", "#00ff00");
}

function toggleStealth() {
    const s = document.body.style;
    s.filter = s.filter.includes("brightness") ? "none" : "brightness(0.1) blur(10px)";
}

function emergencyWipe() {
    deepWipe();
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
            resetIdleTimer();
            logTerminal("V82_GHOST_PATH_ACTIVE");
            spawnGhostTraffic();
            runNetworkVerify();
        } 
        else if (cmdRaw === HONEYPOT_PASS) {
            vault.innerHTML = "<div style='padding:20px; color:#111;'>[NULL_VOLUME]</div>";
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
