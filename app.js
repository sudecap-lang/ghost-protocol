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

// RESTAURAÇÃO: LIMPAR TERMINAL
function clearTerminal() {
    output.innerHTML = "";
    logTerminal("BUFFER_CLEARED", "#aaa");
}

// RESTAURAÇÃO: VERIFICAÇÃO DE REDE (TESTA O TÚNEL DNS)
async function runNetworkVerify() {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);
        // Se este fetch falhar, significa que o filtro está bloqueando ou você está offline
        await fetch(`https://test.nextdns.io/?t=${Date.now()}`, { mode: 'no-cors', signal: controller.signal });
        logTerminal("TUNNEL_SECURE", "#34c759");
    } catch (e) {
        logTerminal("TUNNEL_EXPOSED_OR_OFFLINE", "#ff3b30");
    }
}

// RUÍDO DE TRÁFEGO AVANÇADO (NSA STYLE)
function startEntropyNoise() {
    noiseInterval = setInterval(() => {
        // Simula requisições para diversos domínios para diluir metadados
        const targets = ["https://www.apple.com", "https://www.wikipedia.org", "https://www.reuters.com"];
        const randomTarget = targets[Math.floor(Math.random() * targets.length)];
        fetch(`${randomTarget}/favicon.ico?r=${Math.random()}`, { mode: 'no-cors' }).catch(()=>{});
    }, Math.floor(Math.random() * 4000) + 2000); 
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        vault.style.filter = "none";
        vault.style.opacity = "1";
        idleTimer = setTimeout(() => {
            vault.style.filter = "blur(80px) brightness(0.05)";
        }, 5000); 
    }
}

// PROTOCOLO DE MOVIMENTO
window.ondevicemotion = (event) => {
    let m = event.accelerationIncludingGravity;
    if (Math.abs(m.x) > 35 || Math.abs(m.y) > 35) emergencyWipe();
};

window.onload = () => {
    forceLock();
    output.innerHTML = ""; 
    document.addEventListener('touchstart', resetIdleTimer, {passive: true});
};

// --- FUNÇÕES DE INTERFACE ---

function openLogs() {
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/registros`, '_blank');
}

function runPrivacyScrub() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("CACHE_DESTROYED", "#00ff00");
}

function toggleStealth() {
    const s = document.body.style;
    s.filter = s.filter.includes("brightness") ? "none" : "brightness(0.01) contrast(20) blur(6px)";
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
            logTerminal("ACCESS_ALPHA");
        } 
        else if (cmdRaw === HONEYPOT_PASS) {
            vault.innerHTML = "<div style='padding:20px; color:#222;'>[ENCRYPTED_VOLUME_NULL]</div>";
            vault.style.display = 'block';
            vault.style.visibility = 'visible';
            vault.style.opacity = "1";
        }
        else if (cmdRaw === DURESS_PASS) {
            emergencyWipe();
        }
        else {
            logTerminal("AUTH_FAIL", "#ff3b30");
            forceLock();
        }
    }
}
