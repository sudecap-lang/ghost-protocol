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
    }
    clearInterval(noiseInterval);
}

function logTerminal(msg, color = "#00ffaa") {
    output.innerHTML += `<br><span style="color:${color}">> ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

// RUÍDO DE ENTROPIA PARA MASCARAR IDENTIDADE DE REDE
function startEntropyNoise() {
    const govTargets = [
        "https://www.cia.gov/favicon.ico",
        "https://www.mi6.gov.uk/favicon.ico",
        "https://www.interpol.int/favicon.ico"
    ];
    noiseInterval = setInterval(() => {
        const target = govTargets[Math.floor(Math.random() * govTargets.length)];
        fetch(`${target}?nonce=${Math.random()}`, { mode: 'no-cors' }).catch(()=>{});
    }, Math.floor(Math.random() * 5000) + 2000); 
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        vault.style.filter = "none";
        idleTimer = setTimeout(() => {
            // Desfoque extremo para proteção contra câmeras de segurança
            vault.style.filter = "blur(90px) brightness(0) contrast(0)";
        }, 3000); 
    }
}

// PROTOCOLO DE ARREBATAMENTO (FBI/CIA GRADE)
window.ondevicemotion = (event) => {
    let m = event.accelerationIncludingGravity;
    if (Math.abs(m.x) > 35 || Math.abs(m.y) > 35 || Math.abs(m.z) > 35) {
        emergencyWipe();
    }
};

window.onload = () => {
    forceLock();
    output.innerHTML = ""; 
    document.addEventListener('touchstart', resetIdleTimer);
};

// --- OPERAÇÕES ---

function loadHoneyPot() {
    vault.innerHTML = `
        <div style="padding:20px; font-family:monospace; color:#444; font-size:12px;">
            [DECOY_ENCRYPTION_ACTIVE]<br>
            Layer: AES-256-GCM<br>
            Active_Tunnels: 0<br>
            Traffic_Logs: Cleared<br>
            Uptime: ${Math.floor(Math.random() * 100)}m
        </div>
    `;
    vault.style.display = 'block';
    vault.style.visibility = 'visible';
    logTerminal("DECOY_ON");
}

function runPrivacyScrub() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("METADATA_PURGED", "#00ff00");
}

function emergencyWipe() {
    localStorage.clear();
    sessionStorage.clear();
    // Saída imediata para cobertura de notícias internacional
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
            startEntropyNoise();
            resetIdleTimer();
            logTerminal("SECURE_AUTH");
        } 
        else if (cmdRaw === HONEYPOT_PASS) {
            loadHoneyPot();
        }
        else if (cmdRaw === DURESS_PASS) {
            runPrivacyScrub();
            emergencyWipe();
        }
        else {
            logTerminal("ERR", "#ff3b30");
            forceLock();
        }
    }
}
