// --- CONFIGURAÇÃO DE AGENTE ---
const SECRET_PASS = "77 Abacate 77*"; // ALTERA AQUI A TUA SENHA
let attemptCounter = 0;
// ------------------------------

const terminal = document.getElementById('terminal-display');

function logTerminal(msg, color = "#00f2ff") {
    const time = new Date().toLocaleTimeString();
    terminal.innerHTML += `<br><span style="color: ${color}">[${time}] > ${msg}</span>`;
    terminal.scrollTop = terminal.scrollHeight;
}

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmd = input.value;
        input.value = '';

        if (cmd === SECRET_PASS) {
            attemptCounter = 0;
            document.getElementById('secret-vault').style.display = 'block';
            logTerminal("ACESSO CONCEDIDO: COFRE ABERTO", "#00ff64");
        } else {
            attemptCounter++;
            const remains = 3 - attemptCounter;
            logTerminal(`ERRO: CREDENCIAIS INVÁLIDAS (${remains} TENTATIVAS RESTANTES)`, "#ff4b2b");
            
            if (attemptCounter >= 3) {
                logTerminal("PROTOCOLO DE SEGURANÇA ATIVADO: APAGANDO TUDO...", "#ff4b2b");
                setTimeout(emergencyWipe, 1000);
            }
        }
    }
}

function runPrivacyScrub() {
    logTerminal("LIMPANDO METADADOS E CACHE...");
    if (window.history.replaceState) {
        window.history.replaceState({}, document.title, "/");
    }
    setTimeout(() => logTerminal("SISTEMA HIGIENIZADO."), 1000);
}

function toggleStealth() {
    logTerminal("CAMUFLAGEM GHOST ATIVADA.");
    document.body.style.filter = "brightness(0.5) contrast(1.4) sepia(0.3)";
}

function emergencyWipe() {
    localStorage.clear();
    sessionStorage.clear();
    document.body.innerHTML = "<h1 style='color:white; text-align:center; margin-top:50%;'>SYSTEM_OFFLINE</h1>";
    setTimeout(() => {
        window.location.replace("https://www.google.com/search?q=tempo+lisboa");
    }, 1500);
}

logTerminal("LINK SEGURO ESTABELECIDO.");
