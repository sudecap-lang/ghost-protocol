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
    logTerminal("VOLATILE_BUFFER_CLEARED", "#666");
}

async function runNetworkVerify() {
    try {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 2000);
        // Verifica se o túnel NextDNS está filtrando corretamente
        await fetch(`https://test.nextdns.io/?check=${Date.now()}`, { mode: 'no-cors', signal: controller.signal });
        logTerminal("STATUS: FILTER_ACTIVE", "#34c759");
    } catch (e) {
        logTerminal("STATUS: EXPOSED", "#ff3b30");
    }
}

// GERAÇÃO DE RUÍDO PARA DILUIR O IP 179.191.223.163
function startEntropyNoise() {
    noiseInterval = setInterval(() => {
        const decoy = ["https://www.wikipedia.org", "https://www.reuters.com", "https://www.apple.com"];
        const target = decoy[Math.floor(Math.random() * decoy.length)];
        fetch(`${target}/favicon.ico?v=${Math.random()}`, { mode: 'no-cors' }).catch(()=>{});
    }, 4500); 
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        vault.style.filter = "none";
        vault.style.opacity = "1";
        idleTimer = setTimeout(() => {
            vault.style.filter = "blur(95px) brightness(0)";
        }, 4000); // 4 segundos para bloqueio visual
    }
}

// WIPE POR MOVIMENTO (FBI PROTOCOL)
window.ondevicemotion = (event) => {
    let m = event.accelerationIncludingGravity;
    if (Math.abs(m.x) > 35 || Math.abs(m.y) > 35) {
        if (vault && vault.style.display === 'block') emergencyWipe();
    }
};

// AUTO-LOCK AO SAIR DO SAFARI
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        forceLock();
        localStorage.clear();
    }
});

window.onload = () => {
    forceLock();
    output.innerHTML = ""; 
    document.addEventListener('touchstart', resetIdleTimer, {passive: true});
};

// --- COMANDOS ---

function openLogs() {
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/registros`, '_blank');
}

function runPrivacyScrub() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("CACHE_PURGED", "#00ff00");
}

function toggleStealth() {
    const b = document.body.style;
    b.filter = b.filter.includes("brightness") ? "none" : "brightness(0.01) contrast(25) blur(10px)";
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
            startEntropyNoise();
            resetIdleTimer();
            logTerminal("ENCRYPTED_SESSION_START");
        } 
        else if (cmdRaw === HONEYPOT_PASS) {
            vault.innerHTML = "<div style='padding:20px; color:#111;'>VOLUME_EMPTY</div>";
            vault.style.display = 'block';
            vault.style.visibility = 'visible';
            vault.style.opacity = "1";
        }
        else if (cmdRaw === DURESS_PASS) {
            emergencyWipe();
        }
        else {
            logTerminal("AUTH_ERR", "#ff3b30");
            forceLock();
        }
    }
}
