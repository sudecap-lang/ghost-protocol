// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const NEXT_DNS_ID = "6ddbfb"; 
// ---------------------------------

const output = document.getElementById('terminal-output');
const vault = document.getElementById('secret-vault');

function forceVaultLock() {
    if (vault) {
        vault.style.display = 'none';
        vault.style.visibility = 'hidden';
    }
}

function logTerminal(msg, color = "#00ffaa") {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span>[${time}] > ${msg}</span>`;
    output.style.color = color; // Aplica a cor na linha atual
    output.scrollTop = output.scrollHeight;
}

window.onload = () => {
    forceVaultLock();
    logTerminal("SISTEMA GHOST v31.0 - CAMADA DUPLA ATIVA (DNS + ANTIVIRUS)");
};

async function runNetworkVerify() {
    logTerminal("SONDAGEM DE SEGURANÇA...", "#00aaff");
    try {
        // Modo 'no-cors' para evitar bloqueios de antivírus/CORS
        await fetch(`https://test.nextdns.io/?t=${Date.now()}`, { mode: 'no-cors' });
        logTerminal("SHIELD: VERDE (OK)", "#34c759");
    } catch (e) {
        logTerminal("AVISO: INTERFERÊNCIA DE PROTEÇÃO LOCAL (AVGUARD?)", "#ff9500");
    }
}

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmdRaw = input.value;
        const cmdClean = cmdRaw.toLowerCase().trim();
        input.value = '';

        if (cmdClean === "verify") {
            runNetworkVerify();
        } 
        else if (cmdClean === "logs") {
            window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
        }
        else if (cmdRaw === SECRET_PASS) {
            logTerminal("ACESSO AO COFRE LIBERADO.", "#00ff00");
            if (vault) {
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
            }
        } 
        else {
            logTerminal(`ERRO: '${cmdRaw}' INVÁLIDO.`, "#ff3b30");
            forceVaultLock();
        }
    }
}

function runPrivacyScrub() {
    localStorage.clear();
    sessionStorage.clear();
    forceVaultLock();
    logTerminal("LIMPAGEM COMPLETA EFETUADA.");
}

function toggleStealth() {
    document.body.style.filter = document.body.style.filter.includes("brightness") ? "none" : "brightness(0.6) contrast(1.2)";
}
