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

// FUNÇÃO RESTAURADA: LIMPAR TERMINAL
function clearTerminal() {
    output.innerHTML = "";
    logTerminal("CLEARED", "#aaa");
}

// FUNÇÃO RESTAURADA: VERIFICAR REDE
async function runNetworkVerify() {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        // Testa a conexão através do seu filtro NextDNS
        await fetch(`https://test.nextdns.io/?t=${Date.now()}`, { mode: 'no-cors', signal: controller.signal });
        logTerminal("NET_ACTIVE", "#34c759");
    } catch (e) {
        logTerminal("NET_BLOCKED", "#ff3b30");
    }
}

function startEntropyNoise() {
    noiseInterval = setInterval(() => {
        fetch(`https://www.apple.com/library/test/success.html?r=${Math.random()}`, { mode: 'no-cors' }).catch(()=>{});
    }, 6000); 
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        vault.style.filter = "none";
        vault.style.opacity = "1";
        idleTimer = setTimeout(() => {
            vault.style.filter = "blur(75px) brightness(0.1)";
        }, 5000); 
    }
}

window.ondevicemotion = (event) => {
    let m = event.accelerationIncludingGravity;
    if (Math.abs(m.x) > 35 || Math.abs(m.y) > 35) emergencyWipe();
};

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
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("WIPED", "#00ff00");
}

function toggleStealth() {
    const s = document.body.style;
    s.filter = s.filter.includes("brightness") ? "none" : "brightness(0.01) contrast(15) blur(5px)";
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
            logTerminal("AUTH_OK");
        } 
        else if (cmdRaw === HONEYPOT_PASS) {
            vault.innerHTML = "<div style='padding:20px; color:#444;'>[DECOY_ACTIVE]</div>";
            vault.style.display = 'block';
            vault.style.visibility = 'visible';
            vault.style.opacity = "1";
        }
        else if (cmdRaw === DURESS_PASS) {
            emergencyWipe();
        }
        else {
            logTerminal("ERR", "#ff3b30");
            forceLock();
        }
    }
}
