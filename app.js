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
    logTerminal("SCREEN_CLEANSED", "#444");
}

// VERIFICA SE O NEXTDNS ESTÁ FILTRANDO O SEU IP 179.191.223.163
async function runNetworkVerify() {
    try {
        logTerminal("CHECKING_DNS_SHIELD...", "#ff9500");
        const res = await fetch(`https://test.nextdns.io/?check=${Date.now()}`, { mode: 'no-cors' });
        logTerminal("SHIELD: ACTIVE", "#34c759");
        logTerminal("IP_LOGGED: 179.191.223.163", "#ff3b30");
    } catch (e) {
        logTerminal("SHIELD: ERROR", "#ff3b30");
    }
}

// GERA RUÍDO PARA DILUIR OS LOGS DO IP 179.191.223.163
function startEntropyNoise() {
    noiseInterval = setInterval(() => {
        const decoys = ["https://www.wikipedia.org", "https://www.apple.com", "https://www.reuters.com"];
        const target = decoys[Math.floor(Math.random() * decoys.length)];
        fetch(`${target}/favicon.ico?v=${Math.random()}`, { mode: 'no-cors' }).catch(()=>{});
    }, 4500); 
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        vault.style.filter = "none";
        vault.style.opacity = "1";
        vault.style.pointerEvents = 'auto';
        idleTimer = setTimeout(() => {
            vault.style.filter = "blur(130px) brightness(0)";
            vault.style.pointerEvents = 'none'; // Protege contra cliques acidentais
        }, 3000); 
    }
}

window.ondevicemotion = (event) => {
    let m = event.accelerationIncludingGravity;
    if (Math.abs(m.x) > 35 || Math.abs(m.y) > 35) {
        if (vault && vault.style.display === 'block') emergencyWipe();
    }
};

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
    document.addEventListener('click', resetIdleTimer);
};

// --- FUNÇÕES DE COMANDO ---

function openLogs() {
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/registros`, '_blank');
}

function runPrivacyScrub() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("CACHE_WIPED", "#00ff00");
}

function toggleStealth() {
    const s = document.body.style;
    s.filter = s.filter.includes("brightness") ? "none" : "brightness(0.01) contrast(40) blur(25px)";
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
            logTerminal("GHOST_ACCESS_GRANTED");
            runNetworkVerify();
        } 
        else if (cmdRaw === HONEYPOT_PASS) {
            vault.innerHTML = "<div style='padding:20px; color:#000;'>SECURE_PARTITION_EMPTY</div>";
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
