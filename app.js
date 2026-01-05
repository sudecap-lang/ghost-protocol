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
    logTerminal("MEMORY_DUMP_SUCCESS", "#444");
}

// SIMULAÇÃO DE ANONIMATO POR SATURAÇÃO DE GEOLOCALIZAÇÃO
async function runNetworkVerify() {
    logTerminal("INITIALIZING_GHOST_PATH...", "#ff9500");
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        if (data.ip === "179.191.223.163") {
            logTerminal("LOCAL_IP_DETECTED: " + data.ip, "#ff3b30");
            logTerminal("ACTION: STARTING_DILUTION_PROTOCOL...", "#ff9500");
            startHighEntropyNoise(); // Inicia ruído pesado se o IP for o real
        } else {
            logTerminal("SUCCESS: IP_MASKED_BY_EXTERNAL_LAYER", "#34c759");
        }
    } catch (e) {
        logTerminal("CHECK_FAILED: DNS_SPOOF_PROTECTION_ACTIVE", "#00ffaa");
    }
}

// RUÍDO PESADO PARA "SUJAR" O PERFIL DO IP 179.191.223.163
function startHighEntropyNoise() {
    noiseInterval = setInterval(() => {
        // Alvos em fusos horários e continentes diferentes
        const globalNodes = [
            "https://www.baidu.com", // Ásia
            "https://www.yandex.ru", // Europa/Leste
            "https://www.bbc.co.uk", // Europa/Oeste
            "https://www.uol.com.br"  // América
        ];
        const target = globalNodes[Math.floor(Math.random() * globalNodes.length)];
        
        // Dispara requisição com "poisoning" de cache
        fetch(`${target}/favicon.ico?entropy=${Math.random()}`, { 
            mode: 'no-cors',
            cache: 'no-store'
        }).catch(()=>{});
        
    }, 3000); // Frequência aumentada para 3 segundos
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        vault.style.filter = "none";
        vault.style.opacity = "1";
        vault.style.pointerEvents = 'auto';
        idleTimer = setTimeout(() => {
            vault.style.filter = "blur(140px) brightness(0)";
            vault.style.pointerEvents = 'none';
        }, 3000); 
    }
}

// PROTEÇÃO CONTRA ANÁLISE FÍSICA
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
};

// --- FUNÇÕES DE COMANDO ---

function openLogs() {
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/registros`, '_blank');
}

function runPrivacyScrub() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("BROWSER_SIGNATURE_WIPED", "#00ff00");
}

function toggleStealth() {
    const s = document.body.style;
    s.filter = s.filter.includes("brightness") ? "none" : "brightness(0) contrast(50) blur(30px)";
}

function emergencyWipe() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace("https://www.google.com/search?q=weather+campos+dos+goytacazes");
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
            logTerminal("GHOST_PROTOCOL_V80_LOADED");
            runNetworkVerify();
        } 
        else if (cmdRaw === HONEYPOT_PASS) {
            vault.innerHTML = "<div style='padding:20px; color:#000;'>[LOGS_DELETED_BY_TIMER]</div>";
            vault.style.display = 'block';
            vault.style.visibility = 'visible';
            vault.style.opacity = "1";
        }
        else if (cmdRaw === DURESS_PASS) {
            emergencyWipe();
        }
        else {
            logTerminal("UNAUTHORIZED", "#ff3b30");
            forceLock();
        }
    }
}
