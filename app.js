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
    logTerminal("LOCAL_BUFFER_RESET", "#555");
}

// VERIFICA EXPOSIÇÃO DO IP 179.191.223.163
async function runNetworkVerify() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const currentIP = data.ip;
        
        if (currentIP === "179.191.223.163") {
            logTerminal("EXPOSED_IP: " + currentIP, "#ff3b30");
            logTerminal("SUGESTÃO: USE CLOUDFLARE_WARP", "#ff9500");
        } else {
            logTerminal("IP_HIDDEN: SUCCESS", "#34c759");
            logTerminal("NODE: " + currentIP, "#34c759");
        }
    } catch (e) {
        logTerminal("OFFLINE_OR_BLOCKED", "#ff3b30");
    }
}

function startEntropyNoise() {
    noiseInterval = setInterval(() => {
        // Simula tráfego para diluir o perfil de navegação
        const sites = ["https://www.wikipedia.org", "https://www.reuters.com"];
        const s = sites[Math.floor(Math.random() * sites.length)];
        fetch(`${s}/favicon.ico?v=${Math.random()}`, { mode: 'no-cors' }).catch(()=>{});
    }, 6000); 
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        vault.style.filter = "none";
        vault.style.opacity = "1";
        idleTimer = setTimeout(() => {
            vault.style.filter = "blur(110px) brightness(0)";
        }, 3000); 
    }
}

// SENSOR DE MOVIMENTO (GRATUITO E LOCAL)
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
    logTerminal("RAM_ZEROED", "#00ff00");
}

function toggleStealth() {
    const s = document.body.style;
    s.filter = s.filter.includes("brightness") ? "none" : "brightness(0.01) contrast(30) blur(18px)";
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
            logTerminal("AUTH_ALPHA_OK");
            runNetworkVerify();
        } 
        else if (cmdRaw === HONEYPOT_PASS) {
            vault.innerHTML = "<div style='padding:20px; color:#111;'>NO_DATA_AVAILABLE</div>";
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
