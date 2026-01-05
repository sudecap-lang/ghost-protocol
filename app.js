// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const NEXT_DNS_ID = "6ddbfb"; 
// ---------------------------------

const output = document.getElementById('terminal-output');
const vault = document.getElementById('secret-vault');

if (vault) vault.style.display = 'none';
document.body.style.filter = "none";

function logTerminal(msg, color = "#00ffaa") {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span style="color:${color}">[${time}] > ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

// Função de Diagnóstico compatível com o log da sua imagem
async function runNetworkVerify() {
    logTerminal("ANALISANDO PROTOCOLO DE REDE...", "#00aaff");
    try {
        const res = await fetch(`https://test.nextdns.io/?t=${Date.now()}`);
        const text = await res.text(); // Lê como texto para evitar erro de JSON
        
        // Verifica se o seu ID de configuração aparece no tráfego
        if (text.includes(NEXT_DNS_ID)) {
            logTerminal("SHIELD: VERDE (TÚNEL PRIVADO ATIVO)", "#34c759");
        } else if (text.includes("status\": \"ok\"") || text.includes("destIP")) {
            logTerminal("SHIELD: LARANJA (USANDO DNS GENÉRICO)", "#ff9500");
            logTerminal("SISTEMA DETECTOU PROTOCOLO UDP EM 45.90.28.0", "#ff9500");
        } else {
            logTerminal("SHIELD: VERMELHO (REDE EXPOSTA)", "#ff3b30");
        }
    } catch (e) {
        logTerminal("ERRO: FALHA NA INTERCEPTAÇÃO DE DADOS", "#ff3b30");
    }
}

window.onload = () => {
    logTerminal("GHOST_OS v22.0 ONLINE");
    logTerminal("AGUARDANDO COMANDO...");
};

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmdRaw = input.value; 
        const cmdClean = cmdRaw.toLowerCase().trim();
        input.value = '';

        if (cmdClean === "verify") {
            runNetworkVerify();
        } 
        else if (cmdClean === "clear") {
            output.innerHTML = "";
            logTerminal("TERMINAL REINICIADO.");
        }
        else if (cmdRaw === SECRET_PASS) {
            logTerminal("ACESSO AO COFRE LIBERADO.", "#00ff00");
            if (vault) {
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
            }
        } 
        else {
            logTerminal(`SISTEMA: '${cmdRaw}' NÃO RECONHECIDO`, "#ff3b30");
        }
    }
}

function runPrivacyScrub() {
    logTerminal("LIMPANDO CACHE DE NAVEGAÇÃO...");
    localStorage.clear();
    logTerminal("LIMPEZA_CONCLUÍDA.");
}

function toggleStealth() {
    if (document.body.style.filter.includes("brightness")) {
        document.body.style.filter = "none";
        logTerminal("STEALTH: OFF");
    } else {
        document.body.style.filter = "brightness(0.6) contrast(1.2)";
        logTerminal("STEALTH: ON");
    }
}
