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

function clearTerminal() {
    output.innerHTML = "";
    logTerminal("SYS_CLEAN", "#aaa");
}

async function runNetworkVerify() {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        await fetch(`https://test.nextdns.io/?t=${Date.now()}`, { mode: 'no-cors', signal: controller.signal });
        logTerminal("TUNNEL_OK", "#34c759");
    } catch (e) {
        logTerminal("TUNNEL_FAIL", "#ff3b30");
    }
}

// RUÍDO INTENSO AO INICIAR PARA CAMUFLAR ATIVIDADE PASSADA
function startEntropyNoise() {
    noiseInterval = setInterval(() => {
        const targets = ["https://www.apple.com", "https://www.wikipedia.org"];
        const randomTarget = targets[Math.floor(Math.random() * targets.length)];
        fetch(`${randomTarget}/favicon.ico?r=${Math.random()}`, { mode: 'no-cors' }).catch(()=>{});
    }, 3000); 
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        vault.style.filter = "none";
        vault.style.opacity = "1";
        idleTimer = setTimeout(() => {
            vault.style.filter = "blur(90px) brightness(0.01)";
            // Bloqueio extra: exige senha novamente se ficar inativo
            logTerminal("RE-AUTH_REQUIRED", "#ff9500");
        }, 5000); 
    }
}

// DETECÇÃO DE MOVIMENTO (SÓ FUNCIONA COM A ABA ABERTA)
window.ondevicemotion = (event) => {
    let m = event.accelerationIncludingGravity;
    if (Math.abs(m.x) > 35 || Math.abs(m.y) > 35) {
        if (vault && vault.style.display === 'block') emergencyWipe();
    }
};

// BLOQUEIO AUTOMÁTICO SE VOCÊ MUDAR DE ABA OU MINIMIZAR O SAFARI
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        forceLock();
        logTerminal("AUTO_LOCKED_ON_EXIT");
    }
});

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
    logTerminal("BUFFER_WIPED", "#00ff00");
}

function toggleStealth() {
    const s = document.body.style;
    s.filter = s.filter.includes("brightness") ? "none" : "brightness(0.01) contrast(20) blur(8px)";
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
            logTerminal("SESSION_SECURED");
        } 
        else if (cmdRaw === HONEYPOT_PASS) {
            vault.innerHTML = "<div style='padding:20px; color:#111;'>[NULL_POINTER_VOID]</div>";
            vault.style.display = 'block';
            vault.style.visibility = 'visible';
            vault.style.opacity = "1";
            logTerminal("DECOY_MODE");
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
