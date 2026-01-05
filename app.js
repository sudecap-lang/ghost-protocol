// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
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
    }
    clearInterval(noiseInterval);
}

// TERMINAL SILENCIOSO: SÓ EXIBE O NECESSÁRIO
function logTerminal(msg, color = "#00ffaa") {
    // Agora só registra se for um comando direto ou erro crítico
    output.innerHTML += `<br><span style="color:${color}">> ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

// RUÍDO SILENCIOSO (FUNDO)
function startTrafficNoise() {
    noiseInterval = setInterval(() => {
        fetch(`https://www.apple.com/library/test/success.html?t=${Math.random()}`, { mode: 'no-cors' });
    }, 4000); 
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        vault.style.filter = "none";
        idleTimer = setTimeout(() => {
            vault.style.filter = "blur(45px) brightness(0.05) grayscale(1)";
        }, 8000); // Bloqueio visual rápido e silencioso
    }
}

// PROTEÇÃO FÍSICA SILENCIOSA
window.ondevicemotion = (event) => {
    let m = event.accelerationIncludingGravity;
    if (Math.abs(m.x) > 26 || Math.abs(m.y) > 26) {
        if (vault && vault.style.display === 'block') emergencyWipe();
    }
};

window.onload = () => {
    forceLock();
    output.innerHTML = "SYSTEM_READY"; // Única mensagem inicial
    document.addEventListener('touchstart', resetIdleTimer);
};

// --- COMANDOS DIRETOS ---

async function runNetworkVerify() {
    try {
        await fetch(`https://test.nextdns.io/?t=${Date.now()}`, { mode: 'no-cors' });
        logTerminal("NET_OK", "#34c759");
    } catch (e) {
        logTerminal("NET_FAIL", "#ff3b30");
    }
}

function openLogs() {
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/registros`, '_blank');
}

function runPrivacyScrub() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("CLEAN", "#00ff00");
}

function toggleStealth() {
    document.body.style.filter = document.body.style.filter.includes("brightness") ? 
        "none" : "brightness(0.02) contrast(6) blur(2px)";
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
            if (vault) {
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
                startTrafficNoise();
                resetIdleTimer();
                logTerminal("ACCESS");
            }
        } 
        else if (cmdRaw === DURESS_PASS) {
            runPrivacyScrub();
            if (vault) {
                vault.innerHTML = "";
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
                logTerminal("GUEST");
            }
        }
        else {
            logTerminal("DENIED", "#ff3b30");
            forceLock();
        }
    }
}
