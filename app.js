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

// GARANTE QUE A INTERFACE ESTEJA SEMPRE ACESSÍVEL AO TOQUE
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
            // Proteção visual sem travar o clique
            vault.style.filter = "blur(70px) brightness(0.1)";
        }, 6000); 
    }
}

// PROTEÇÃO CONTRA ARREBATAMENTO
window.ondevicemotion = (event) => {
    let m = event.accelerationIncludingGravity;
    if (Math.abs(m.x) > 35 || Math.abs(m.y) > 35) {
        emergencyWipe();
    }
};

// EVENTOS DE TOQUE REFORMULADOS
window.onload = () => {
    forceLock();
    output.innerHTML = ""; 
    document.addEventListener('touchstart', resetIdleTimer, {passive: true});
    document.addEventListener('mousedown', resetIdleTimer);
};

// --- FUNÇÕES OPERACIONAIS (VINCULADAS AOS BOTÕES) ---

function openLogs() {
    logTerminal("SYNCING...");
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/registros`, '_blank');
}

function runPrivacyScrub() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("CLEAN", "#00ff00");
}

function toggleStealth() {
    const body = document.body.style;
    body.filter = body.filter.includes("brightness") ? "none" : "brightness(0.02) contrast(15) blur(5px)";
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
            logTerminal("DECOY");
            vault.innerHTML = "<div style='padding:30px; color:#444; font-size:14px; text-align:center;'>SESSION_ENCRYPTED<br>NO_LOGS_FOUND</div>";
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
