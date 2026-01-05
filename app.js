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

// INTERCEPTAÇÃO DE LOCALIZAÇÃO (RODA ANTES DE TUDO)
function injectSpoof() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition = (s, e) => e({code: 1});
        navigator.geolocation.watchPosition = (s, e) => e({code: 1});
    }
}

function forceLock() {
    if (vault) {
        vault.style.display = 'none';
        vault.style.visibility = 'hidden';
        vault.style.opacity = "0";
    }
    sessionStorage.removeItem('is_auth');
    clearInterval(noiseInterval);
}

function logTerminal(msg, color = "#00ffaa") {
    output.innerHTML += `<br><span style="color:${color}">> ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

// VERIFICA SE JÁ ESTAVA LOGADO AO VOLTAR PARA A ABA
function checkSessionPersistence() {
    if (sessionStorage.getItem('is_auth') === 'true') {
        vault.style.display = 'block';
        vault.style.visibility = 'visible';
        vault.style.opacity = "1";
        startEntropyNoise();
        resetIdleTimer();
        logTerminal("SESSION_RESTORED", "#34c759");
        runNetworkVerify();
    }
}

async function runNetworkVerify() {
    logTerminal("VERIFYING_IP_STALKER_SHIELD...", "#ff9500");
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        if (data.ip === "179.191.223.163") {
            logTerminal("IP_VISIBLE: " + data.ip, "#ff3b30");
            logTerminal("STATUS: DILUTION_ACTIVE", "#00ffaa");
        } else {
            logTerminal("STATUS: IP_ENCRYPTED_PATH", "#34c759");
        }
    } catch (e) {
        logTerminal("SHIELD_CONFIRMED", "#34c759");
    }
}

function startEntropyNoise() {
    if(noiseInterval) clearInterval(noiseInterval);
    noiseInterval = setInterval(() => {
        const nodes = ["https://www.apple.com", "https://www.wikipedia.org"];
        fetch(`${nodes[Math.floor(Math.random()*nodes.length)]}/?v=${Math.random()}`, { mode: 'no-cors' }).catch(()=>{});
    }, 5000); 
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        vault.style.filter = "none";
        vault.style.opacity = "1";
        idleTimer = setTimeout(() => {
            vault.style.filter = "blur(15px) brightness(0.2)";
        }, 60000); // 60 segundos de tela limpa
    }
}

// LOGOUT SE FICAR MUITO TEMPO FORA (SEGURANÇA)
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        // Não desloga imediatamente, permite 5 minutos de "pulo" entre abas
        sessionStorage.setItem('last_active', Date.now());
    } else {
        const lastActive = sessionStorage.getItem('last_active');
        if (Date.now() - lastActive > 300000) { // 5 minutos
            forceLock();
            logTerminal("SESSION_EXPIRED_FOR_SAFETY", "#ff3b30");
        } else {
            checkSessionPersistence();
        }
    }
});

window.onload = () => {
    injectSpoof();
    checkSessionPersistence();
    document.addEventListener('touchstart', resetIdleTimer, {passive: true});
};

// --- OPERAÇÕES ---

function openLogs() {
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/registros`, '_blank');
}

function runPrivacyScrub() {
    localStorage.clear();
    sessionStorage.clear();
    forceLock();
    logTerminal("DEEP_WIPE_COMPLETED", "#ff3b30");
}

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmdRaw = input.value;
        input.value = '';

        if (cmdRaw === SECRET_PASS) {
            sessionStorage.setItem('is_auth', 'true');
            vault.style.display = 'block';
            vault.style.visibility = 'visible';
            vault.style.opacity = "1";
            startEntropyNoise();
            resetIdleTimer();
            logTerminal("V84_PERSISTENCE_ENABLED");
            runNetworkVerify();
        } 
        else if (cmdRaw === DURESS_PASS) {
            runPrivacyScrub();
            window.location.replace("https://www.reuters.com");
        }
        else {
            logTerminal("AUTH_FAILED", "#ff3b30");
            forceLock();
        }
    }
}
