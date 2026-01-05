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

// GARANTE QUE OS BOTÕES FUNCIONEM
function unlockUI() {
    if (vault) {
        vault.style.pointerEvents = "auto";
        vault.style.filter = "none";
        vault.style.opacity = "1";
    }
}

function forceLock() {
    if (vault) {
        vault.style.display = 'none';
        vault.style.visibility = 'hidden';
        vault.style.opacity = "0";
        vault.style.pointerEvents = "none";
    }
    sessionStorage.removeItem('is_auth');
    clearInterval(noiseInterval);
}

function logTerminal(msg, color = "#00ffaa") {
    output.innerHTML += `<br><span style="color:${color}">> ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

// VERIFICA SESSÃO AO VOLTAR
function checkSessionPersistence() {
    if (sessionStorage.getItem('is_auth') === 'true') {
        vault.style.display = 'block';
        vault.style.visibility = 'visible';
        unlockUI();
        startEntropyNoise();
        resetIdleTimer();
        logTerminal("RECONNECTED_SECURELY", "#34c759");
        runNetworkVerify();
    }
}

async function runNetworkVerify() {
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        if (data.ip === "179.191.223.163") {
            logTerminal("IP_CHECK: EXPOSED (" + data.ip + ")", "#ff3b30");
        } else {
            logTerminal("IP_CHECK: MASKED_SUCCESS", "#34c759");
        }
    } catch (e) {
        logTerminal("DNS_SHIELD_ACTIVE", "#34c759");
    }
}

function startEntropyNoise() {
    if(noiseInterval) clearInterval(noiseInterval);
    noiseInterval = setInterval(() => {
        fetch(`https://www.apple.com/favicon.ico?v=${Math.random()}`, { mode: 'no-cors' }).catch(()=>{});
    }, 5000); 
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        unlockUI();
        idleTimer = setTimeout(() => {
            // Apenas esconde, mas NÃO trava os botões (pointerEvents continua auto)
            vault.style.filter = "blur(20px) brightness(0.1)";
        }, 60000); 
    }
}

// GESTÃO DE ESTADO DA ABA
document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
        const lastActive = sessionStorage.getItem('last_active');
        if (lastActive && (Date.now() - lastActive > 600000)) { // 10 min de tolerância
            forceLock();
        } else {
            checkSessionPersistence();
        }
    } else {
        sessionStorage.setItem('last_active', Date.now());
    }
});

window.onload = () => {
    checkSessionPersistence();
    // Qualquer toque na tela reativa os botões
    document.addEventListener('touchstart', () => { unlockUI(); resetIdleTimer(); }, {passive: true});
    document.addEventListener('click', () => { unlockUI(); resetIdleTimer(); });
};

// --- FUNÇÕES OPERACIONAIS ---

function openLogs() {
    unlockUI();
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/registros`, '_blank');
}

function runPrivacyScrub() {
    unlockUI();
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("WIPE_ALL_TRACES", "#ff3b30");
    setTimeout(() => location.reload(), 1000);
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
            unlockUI();
            startEntropyNoise();
            resetIdleTimer();
            logTerminal("V85_RECOVERY_MODE_ACTIVE");
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
