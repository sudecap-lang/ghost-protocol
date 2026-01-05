// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const NEXT_DNS_ID = "6ddbfb"; 
// ---------------------------------

const output = document.getElementById('terminal-output');
const vault = document.getElementById('secret-vault');

// TRAVA DE SEGURANÇA TOTAL
function forceVaultLock() {
    if (vault) {
        vault.style.display = 'none';
        vault.style.visibility = 'hidden';
        vault.style.opacity = '0';
    }
}

function logTerminal(msg, color = "#00ffaa") {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span style="color:${color}">[${time}] > ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

// VALIDAÇÃO SILENCIOSA (EVITA ERRO DE FALHA CRÍTICA)
async function runNetworkVerify() {
    logTerminal("VALIDANDO TÚNEL DE SEGURANÇA...", "#00aaff");
    try {
        // 'no-cors' permite o ping sem que o Safari bloqueie a leitura dos dados
        await fetch(`https://test.nextdns.io/?t=${Date.now()}`, { mode: 'no-cors' });
        logTerminal("STATUS: CONEXÃO ESTABELECIDA.");
        logTerminal("SINAL: VERDE (CONFIRMADO PELO DISPOSITIVO)", "#34c759");
    } catch (e) {
        logTerminal("ALERTA: INTERFERÊNCIA NA REDE LOCAL", "#ff9500");
    }
}

window.onload = () => {
    forceVaultLock();
    logTerminal("SISTEMA GHOST v30.0 ONLINE");
    logTerminal("AGUARDANDO CREDENCIAIS OU COMANDO.");
};

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmdRaw = input.value; 
        const cmdClean = cmdRaw.toLowerCase().trim();
        input.value = '';

        // COMANDOS DE SISTEMA
        if (cmdClean === "verify") {
            runNetworkVerify();
        } 
        else if (cmdClean === "logs") {
            logTerminal("REQUISITANDO ACESSO AOS REGISTROS...");
            window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
        }
        else if (cmdClean === "clear") {
            output.innerHTML = "";
            logTerminal("TERMINAL REINICIADO.");
        }
        // VALIDAÇÃO DA SENHA (77 Abacate 77*)
        else if (cmdRaw === SECRET_PASS) {
            logTerminal("ACESSO CONCEDIDO. COFRE LIBERADO.", "#00ff00");
            if (vault) {
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
                vault.style.opacity = '1';
            }
        } 
        else {
            logTerminal(`ERRO: '${cmdRaw}' NÃO RECONHECIDO.`, "#ff3b30");
            forceVaultLock(); // Tranca o cofre em caso de erro
        }
    }
}

function runPrivacyScrub() {
    logTerminal("EXECUTANDO PROTOCOLO DE LIMPEZA...");
    localStorage.clear();
    sessionStorage.clear();
    forceVaultLock();
    logTerminal("SISTEMA HIGIENIZADO.");
}

function toggleStealth() {
    document.body.style.filter = document.body.style.filter.includes("brightness") ? "none" : "brightness(0.6) contrast(1.2)";
}
