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

// RESTAURAÇÃO: LIMPAR TERMINAL SEM APAGAR O STATUS ATUAL
function clearTerminal() {
    output.innerHTML = "";
    logTerminal("TERMINAL_RESET", "#555");
}

// VERIFICA SE O NEXTDNS ESTÁ FILTRANDO O TRÁFEGO
async function runNetworkVerify() {
    try {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 2000);
        // Testa especificamente o endpoint do NextDNS
        const res = await fetch(`https://test.nextdns.io/?t=${Date.now()}`, { mode: 'no-cors', signal: controller.signal });
        logTerminal("DNS_SHIELD: ACTIVE", "#34c759");
    } catch (e) {
        logTerminal("DNS_SHIELD: BYPASSED_OR_OFF", "#ff3b30");
    }
}

function startEntropyNoise() {
    noiseInterval = setInterval(() => {
        // Usa apenas domínios neutros para não gerar "noise" falso nos seus logs de bloqueio
        const safeTargets = ["https://www.wikipedia.org", "https://www.apple.com"];
        const target = safeTargets[Math.floor(Math.random() * safeTargets.length)];
        fetch(`${target}/favicon.ico?cache=${Math.random()}`, { mode: 'no-cors' }).catch(()=>{});
    }, 6000); 
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (vault && vault.style.display === 'block') {
        vault.style.filter = "none";
        vault.style.opacity = "1";
        idleTimer = setTimeout(() => {
            vault.style.filter = "blur(115px) brightness(0)";
        }, 4000); 
    }
}

// SENSOR DE MOVIMENTO (FBI PROTOCOL)
window.ondevicemotion = (event) => {
    let m = event.accelerationIncludingGravity;
    if (Math.abs(m.x) > 38 || Math.abs(m.y) > 38) {
        if (vault && vault.style.display === 'block') emergencyWipe();
    }
};

// PROTEÇÃO AO MINIMIZAR O SAFARI
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        forceLock();
        localStorage.clear();
        sessionStorage.clear();
    }
});

window.onload = () => {
    forceLock();
    output.innerHTML = ""; 
    document.addEventListener('touchstart', resetIdleTimer, {passive: true});
};

// --- OPERAÇÕES ---

function openLogs() {
    window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/registros`, '_blank');
}

function runPrivacyScrub() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("BUFFER_CLEAN", "#00ff00");
}

function toggleStealth() {
    const b = document.body.style;
    b.filter = b.filter.includes("brightness") ? "none" : "brightness(0.01) contrast(35) blur(20px)";
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
            logTerminal("AUTH_SUCCESS");
            runNetworkVerify();
        } 
        else if (cmdRaw === HONEYPOT_PASS) {
            vault.innerHTML = "<div style='padding:20px; color:#000;'>[NO_LOGS_AVAILABLE]</div>";
            vault.style.display = 'block';
            vault.style.visibility = 'visible';
            vault.style.opacity = "1";
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
