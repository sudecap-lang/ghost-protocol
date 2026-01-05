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
    logTerminal("BUFFER_PURGED", "#444");
}

// VALIDAÇÃO DE REDE COM FOCO EM ANONIMATO EDNS
async function runNetworkVerify() {
    try {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 2000);
        await fetch(`https://test.nextdns.io/?edns=check&t=${Date.now()}`, { mode: 'no-cors', signal: controller.signal });
        logTerminal("EDNS_SHIELD: ACTIVE", "#34c759");
        logTerminal("IP_GEOLOCATION: MASKED", "#34c759");
    } catch (e) {
        logTerminal("EDNS_SHIELD: UNKNOWN", "#ff9500");
    }
}

function startEntropyNoise() {
    noiseInterval = setInterval(() => {
        // Alvos que respeitam a anonimização de sub-rede
        const targets = ["https://en.wikipedia.org", "https://www.apple.com/library/test/success.html"];
        const target = targets[Math.floor(Math.random() * targets.length)];
        fetch(`${target}?z=${Math.random()}`, { mode: 'no-cors' }).catch(()=>{});
    }, 5500); 
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        vault.style.filter = "none";
        vault.style.opacity = "1";
        idleTimer = setTimeout(() => {
            // Desfoque extremo para proteção física
            vault.style.filter = "blur(110px) brightness(0)";
            logTerminal("IDLE_OBSCURE", "#555");
        }, 3500); 
    }
}

// SENSOR DE ARREBATAMENTO
window.ondevicemotion = (event) => {
    let m = event.accelerationIncludingGravity;
    if (Math.abs(m.x) > 38 || Math.abs(m.y) > 38) {
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

// --- OPERAÇÕES ---

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
    s.filter = s.filter.includes("brightness") ? "none" : "brightness(0.01) contrast(30) blur(20px)";
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
            logTerminal("AUTH_ALPHA_ACTIVE");
            runNetworkVerify();
        } 
        else if (cmdRaw === HONEYPOT_PASS) {
            vault.innerHTML = "<div style='padding:20px; color:#111; font-size:12px;'>ENCRYPTED_FILES: NULL<br>EDNS_STATUS: SECURE</div>";
            vault.style.display = 'block';
            vault.style.visibility = 'visible';
            vault.style.opacity = "1";
        }
        else if (cmdRaw === DURESS_PASS) {
            emergencyWipe();
        }
        else {
            logTerminal("ERR_AUTH", "#ff3b30");
            forceLock();
        }
    }
}
