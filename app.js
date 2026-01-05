// --- BLACK CELL CONFIGURATION ---
const REAL_PASS = "77 Abacate 77*"; 
const DECOY_PASS = "1234"; // Senha falsa para emergências
const NEXT_DNS_ID = "6ddbfb"; 
// ---------------------------------

const output = document.getElementById('terminal-output');

function logTerminal(msg, color = "#34c759") {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span style="color:${color}">[${time}] ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmd = input.value;
        input.value = '';

        // 1. Protocolo de Monitoramento
        if (cmd.toLowerCase() === "logs") {
            logTerminal("> OPENING_ENCRYPTED_LOGS...", "#ff9500");
            window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
        } 
        // 2. Senha Real (Cofre)
        else if (cmd === REAL_PASS) {
            logTerminal("> ACCESS_GRANTED: ENCRYPTED_VAULT_ACTIVE", "#00ff00");
            document.getElementById('secret-vault').style.display = 'block';
        } 
        // 3. Senha Isca (Enganar Observadores)
        else if (cmd === DECOY_PASS) {
            logTerminal("> LOADING_SYSTEM_REPORTS...", "#34c759");
            window.location.replace("https://www.bbc.com/news"); // Abre notícias reais
        }
        else {
            logTerminal("> AUTH_FAILURE: TRACE_LOGGED", "#ff3b30");
        }
    }
}

function runPrivacyScrub() {
    logTerminal("> INITIATING_DEEP_CLEAN...");
    // Apaga absolutamente tudo da sessão
    localStorage.clear();
    sessionStorage.clear();
    // Injeta endereços falsos no histórico do navegador
    for(let i=0; i<5; i++) {
        window.history.pushState({}, '', `?secure_node=${Math.random().toString(36).substring(7)}`);
    }
    logTerminal("> SCRUB_COMPLETE. NO_RESIDUAL_TRACE.");
}

function toggleStealth() {
    logTerminal("> VISUAL_CLOAKING_ACTIVE.");
    // Torna a tela quase impossível de ler por quem está ao lado
    document.body.style.filter = "contrast(1.5) brightness(0.2) grayscale(1) blur(1px)";
}

function emergencyWipe() {
    logTerminal("> CRITICAL: WIPING_ALL_NODES...");
    localStorage.clear();
    // Redireciona de forma que o botão "voltar" não funcione
    window.location.replace("https://www.google.com/search?q=weather+today");
}

logTerminal("> BLACK_CELL_OS_v8.0_ACTIVE");
logTerminal("> TARGET_ID_LINKED: 6DDBFB");
