// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const NEXT_DNS_ID = "6ddbfb"; 
window.IS_LOGGED_IN = false;
// ---------------------------------

const output = document.getElementById('terminal-output');
const vault = document.getElementById('secret-vault');

// MENTE PARA O NAVEGADOR SOBRE QUEM VOCÊ É
Object.defineProperty(navigator, 'userAgent', {get: () => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'});
Object.defineProperty(navigator, 'platform', {get: () => 'Win32'});

function logTerminal(msg, color = "#00ffaa") {
    output.innerHTML += `<br><span style="color:${color}">> ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

// ABRE UM PROXY EXTERNO (A ÚNICA FORMA DE ESCONDER O IP SEM APP)
window.openProxy = function() {
    logTerminal("REDIRECTING_TO_PROXY_TUNNEL...", "#ff9500");
    window.open("https://www.croxyproxy.com", "_blank");
};

window.runPrivacyScrub = function() {
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("LOCAL_TRACES_WIPED", "#34c759");
};

window.toggleGhostMode = function() {
    logTerminal("GHOST_DILUTION: ACTIVE", "#34c759");
    setInterval(() => {
        fetch(`https://www.wikipedia.org/?z=${Math.random()}`, {mode:'no-cors'}).catch(()=>{});
    }, 3000);
};

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmd = input.value;
        input.value = '';

        if (cmd === SECRET_PASS) {
            window.IS_LOGGED_IN = true;
            vault.style.display = 'block';
            vault.style.opacity = "1";
            logTerminal("V90_FINAL_STABLE_LOADED");
            logTerminal("NOTICE: USE_PROXY_FOR_IP_MASKING", "#ff9500");
        } else if (cmd === "clear") {
            output.innerHTML = "";
        }
    }
}

// Mantém os botões ativos
document.addEventListener('click', () => {
    if(window.IS_LOGGED_IN) {
        vault.style.filter = "none";
        vault.style.pointerEvents = "auto";
    }
});
