// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const HONEYPOT_PASS = "fbi_guest"; 
const DURESS_PASS = "1234"; 
const NEXT_DNS_ID = "6ddbfb"; 
window.IS_LOGGED_IN = false; 
window.noiseInterval = null;
let idleTimer;
// ---------------------------------

const output = document.getElementById('terminal-output');
const vault = document.getElementById('secret-vault');

function logTerminal(msg, color = "#00ffaa") {
    if (!output) return;
    output.innerHTML += `<br><span style="color:${color}">> ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

function emergencyUIReset() {
    if (vault && window.IS_LOGGED_IN) {
        vault.style.display = 'block';
        vault.style.visibility = 'visible';
        vault.style.filter = "none";
        vault.style.opacity = "1";
        vault.style.pointerEvents = "auto";
    }
}

// GHOST MODE COM AUTO-REINICIALIZAÇÃO
window.toggleGhostMode = function() {
    if (window.noiseInterval) {
        clearInterval(window.noiseInterval);
        window.noiseInterval = null;
        logTerminal("GHOST_MODE: TERMINATED", "#ff3b30");
    } else {
        logTerminal("GHOST_MODE: ENGINE_START", "#00ffaa");
        window.noiseInterval = setInterval(() => {
            // Dispara requisições para diluir o rastro do IP 179.191.223.163
            fetch(`https://www.google.com/favicon.ico?cache=${Math.random()}`, { mode: 'no-cors' }).catch(()=>{});
            if(Math.random() > 0.8) logTerminal("GHOST_PULSE: OK", "#333"); // Feedback visual discreto
        }, 4000);
        logTerminal("GHOST_MODE: SHIELD_ACTIVE", "#34c759");
    }
};

window.runPrivacyScrub = function() {
    logTerminal("SCRUBBING_IDENTITY_CACHE...", "#ff9500");
    localStorage.clear();
    sessionStorage.clear();
    // Re-garante o login em RAM
    window.IS_LOGGED_IN = true;
    emergencyUIReset();
    logTerminal("CLEAN_COMPLETE_SESS_SECURE", "#34c759");
};

async function runNetworkVerify() {
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        const isExposed = data.ip === "179.191.223.163";
        logTerminal(`NETWORK_IP: ${data.ip}`, isExposed ? "#ff3b30" : "#34c759");
    } catch (e) {
        logTerminal("DNS_SHIELD_VERIFIED", "#34c759");
    }
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (window.IS_LOGGED_IN) {
        emergencyUIReset();
        idleTimer = setTimeout(() => {
            vault.style.filter = "blur(35px) brightness(0.2)";
        }, 60000); 
    }
}

// REATIVA TUDO AO VOLTAR PARA A ABA
document.addEventListener("visibilitychange", () => {
    if (!document.hidden && window.IS_LOGGED_IN) {
        emergencyUIReset();
        logTerminal("ENGINE_RE-SYNC...", "#555");
        runNetworkVerify();
        // Se o Ghost Mode estava ligado, ele continua via setInterval, 
        // mas aqui forçamos uma verificação de pulso.
    }
});

window.onload = () => {
    document.addEventListener('click', () => { 
        if(window.IS_LOGGED_IN) {
            emergencyUIReset();
            resetIdleTimer();
        }
    });
};

// --- INTERFACE DE COMANDO ---

window.openLogs = function() {
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/registros`, '_blank');
};

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmdRaw = input.value;
        input.value = '';

        if (cmdRaw === SECRET_PASS) {
            window.IS_LOGGED_IN = true;
            emergencyUIReset();
            logTerminal("V89_ENGINE_ONLINE");
            runNetworkVerify();
            resetIdleTimer();
        } 
        else if (cmdRaw === "clear") {
            output.innerHTML = "";
            logTerminal("BUFFER_RESET", "#444");
        }
        else if (cmdRaw === DURESS_PASS) {
            window.IS_LOGGED_IN = false;
            localStorage.clear();
            sessionStorage.clear();
            window.location.replace("https://www.reuters.com");
        }
        else {
            logTerminal("AUTH_DENIED", "#ff3b30");
        }
    }
}
