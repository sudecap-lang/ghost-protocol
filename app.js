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
    logTerminal("TERMINAL_CLEAN", "#555");
}

async function runNetworkVerify() {
    logTerminal("SCANNING_IP_EXPOSURE...", "#ff9500");
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        if (data.ip === "179.191.223.163") {
            logTerminal("ALERT: IP_LOGGED_AS_" + data.ip, "#ff3b30");
            logTerminal("LOC: CAMPOS_RJ (PROTECTION_REQUIRED)", "#ff3b30");
        } else {
            logTerminal("SUCCESS: IP_MASKED_OK", "#34c759");
        }
    } catch (e) {
        logTerminal("CHECK_FAILED: NETWORK_LOCK_ACTIVE", "#00ffaa");
    }
}

function startHighEntropyNoise() {
    if (noiseInterval) clearInterval(noiseInterval);
    noiseInterval = setInterval(() => {
        const globalNodes = ["https://www.baidu.com", "https://www.bbc.co.uk", "https://www.apple.com"];
        const target = globalNodes[Math.floor(Math.random() * globalNodes.length)];
        fetch(`${target}/favicon.ico?v=${Math.random()}`, { mode: 'no-cors' }).catch(()=>{});
    }, 4000); 
}

// RESET DE VISIBILIDADE - AUMENTADO PARA 15 SEGUNDOS
function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        // Remove qualquer desfoque ao interagir
        vault.style.filter = "none";
        vault.style.opacity = "1";
        vault.style.pointerEvents = 'auto';
        
        idleTimer = setTimeout(() => {
            // Aplica desfoque leve após 15s de inatividade
            vault.style.filter = "blur(15px) brightness(0.2)";
        }, 15000); 
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
    }
});

// EVENTOS PARA MANTER A TELA VISÍVEL ENQUANTO VOCÊ USA
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
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("BROWSER_WIPE_OK", "#00ff00");
}

function toggleStealth() {
    const s = document.body.style;
    s.filter = s.filter.includes("brightness") ? "none" : "brightness(0.1) blur(10px)";
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
            resetIdleTimer();
            logTerminal("V81_STABLE_LOADED");
            startHighEntropyNoise();
            runNetworkVerify();
        } 
        else if (cmdRaw === HONEYPOT_PASS) {
            vault.innerHTML = "<div style='padding:20px; color:#111;'>[DECOY_READY]</div>";
            vault.style.display = 'block';
            vault.style.visibility = 'visible';
            vault.style.opacity = "1";
        }
        else if (cmdRaw === DURESS_PASS) {
            emergencyWipe();
        }
        else {
            logTerminal("DENIED", "#ff3b30");
            forceLock();
        }
    }
}
