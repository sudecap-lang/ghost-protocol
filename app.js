// --- FIELD AGENT CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const NEXT_DNS_ID = "6ddbfb"; // Seu ID identificado na imagem
// ---------------------------------

const output = document.getElementById('terminal-output');

function logTerminal(msg) {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br>[${time}] ${msg}`;
    output.scrollTop = output.scrollHeight;
}

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmd = input.value; // Removido toLowerCase para aceitar sua senha real
        input.value = '';

        // Comandos de sistema (em minúsculas)
        if (cmd.toLowerCase() === "logs") {
            logTerminal("> OPENING_SURVEILLANCE_RECORDS...");
            window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
        } 
        // Verificação da Senha Mestra (Exata)
        else if (cmd === SECRET_PASS) {
            logTerminal("> ACCESS_GRANTED: VAULT_OPENED");
            document.getElementById('secret-vault').style.display = 'block';
        } 
        else {
            logTerminal("> AUTH_FAILURE: INVALID_CREDENTIALS");
        }
    }
}

function runPrivacyScrub() {
    logTerminal("> SCRUBBING_METADATA...");
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("> RAM_FLUSHED. SYSTEM_READY.");
}

function toggleStealth() {
    logTerminal("> GHOST_MODE_ENGAGED.");
    document.body.style.filter = "contrast(1.2) brightness(0.4) grayscale(1)";
}

function emergencyWipe() {
    logTerminal("> PANIC_PROTOCOL: DESTROYING_DATA...");
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace("https://www.reuters.com");
}

// Inicialização
logTerminal("> SYSTEM_ONLINE. TARGET_ID: 6DDBFB.");
