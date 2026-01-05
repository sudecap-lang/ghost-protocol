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
        vault.style.pointerEvents = 'none'; // Impede cliques quando travado
    }
    clearInterval(noiseInterval);
}

function logTerminal(msg, color = "#00ffaa") {
    output.innerHTML += `<br><span style="color:${color}">> ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

// RUÍDO PARA CAMUFLAR COMPORTAMENTO (PADRÃO MI6)
function startEntropyNoise() {
    noiseInterval = setInterval(() => {
        fetch(`https://www.apple.com/library/test/success.html?r=${Math.random()}`, { mode: 'no-cors' }).catch(()=>{});
    }, 6000); 
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        vault.style.filter = "none";
        vault.style.pointerEvents = 'auto'; // Reativa cliques
        idleTimer = setTimeout(() => {
            // Bloqueio visual agressivo
            vault.style.filter = "blur(85px) brightness(0.1)";
            logTerminal("IDLE", "#ff9500");
        }, 5000); 
    }
}

// PROTEÇÃO FÍSICA (FBI PROTOCOL)
window.ondevicemotion = (event) => {
    let m = event.accelerationIncludingGravity;
    if (Math.abs(m.x) > 30 || Math.abs(m.y) > 30) {
        if (vault && vault.style.display === 'block') emergencyWipe();
    }
};

window.onload = () => {
    forceLock();
    output.innerHTML = ""; 
    document.addEventListener('touchstart', resetIdleTimer);
    document.addEventListener('click', resetIdleTimer);
};

// --- FUNÇÕES OPERACIONAIS ---

function openLogs() {
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/registros`, '_blank');
}

function runPrivacyScrub() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("CLEAN", "#00ff00");
}

function toggleStealth() {
    const isStealth = document.body.style.filter.includes("brightness");
    document.body.style.filter = isStealth ? "none" : "brightness(0.02) contrast(15) blur(4px)";
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
            vault.style.pointerEvents = 'auto';
            startEntropyNoise();
            resetIdleTimer();
            logTerminal("AUTH_OK");
        } 
        else if (cmdRaw === HONEYPOT_PASS) {
            logTerminal("DECOY_MODE");
            vault.innerHTML = "<div style='padding:20px; color:#333;'>Empty Partition.</div>";
            vault.style.display = 'block';
            vault.style.visibility = 'visible';
        }
        else if (cmdRaw === DURESS_PASS) {
            emergencyWipe();
        }
        else {
            logTerminal("DENIED", "#ff3b30");
            forceLock();
        }
    }
}
