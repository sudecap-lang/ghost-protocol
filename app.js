// --- BLACK CELL CONFIGURATION ---
const SECRET_PASS = "77 Abacate 77*"; 
const NEXT_DNS_ID = "6ddbfb"; 
// ---------------------------------

const output = document.getElementById('terminal-output');
const vault = document.getElementById('secret-vault');

// ESTADO INICIAL SEGURO
if (vault) {
    vault.style.display = 'none';
    vault.style.visibility = 'hidden';
}
document.body.style.filter = "none";

function logTerminal(msg, color = "#00ffaa") {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br><span style="color:${color}">[${time}] > ${msg}</span>`;
    output.scrollTop = output.scrollHeight;
}

// Função de Diagnóstico com Resiliência
async function runNetworkVerify() {
    logTerminal("TENTANDO CONEXÃO COM O SERVIDOR DE TESTE...", "#00aaff");
    try {
        // Uso de 'no-cors' ou modo flexível para evitar bloqueios de segurança do navegador
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos de limite

        const res = await fetch(`https://test.nextdns.io/?t=${Date.now()}`, { signal: controller.signal });
        const data = await res.json();
        
        clearTimeout(timeoutId);

        if (data.status === "ok" && data.configuration === NEXT_DNS_ID) {
            logTerminal("RESULTADO: ESCUDO VERDE (SISTEMA INTEGRAL)", "#34c759");
        } else if (data.status === "ok") {
            logTerminal("RESULTADO: ESCUDO LARANJA (PERFIL DESALINHADO)", "#ff9500");
        } else {
            logTerminal("RESULTADO: ESCUDO VERMELHO (REDE EXPOSTA)", "#ff3b30");
        }
    } catch (e) {
        logTerminal("ERRO: SERVIDOR NÃO RESPONDE. VERIFIQUE SE O 'RELÉ PRIVADO' DO ICLOUD ESTÁ ATIVO.", "#ff3b30");
        logTerminal("DICA: ATIVE E DESATIVE O MODO AVIÃO PARA REINICIAR A REDE.", "#00aaff");
    }
}

window.onload = () => {
    logTerminal("GHOST_OS v20.0 ONLINE");
    logTerminal("SISTEMA PRONTO.");
};

function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmdRaw = input.value; 
        const cmdClean = cmdRaw.toLowerCase().trim();
        input.value = '';

        // 1. PRIORIDADE TOTAL: COMANDOS
        if (cmdClean === "verify") {
            runNetworkVerify();
        } 
        else if (cmdClean === "logs") {
            window.open(`https://my.nextdns.io/${NEXT_DNS_ID}/logs`, '_blank');
        } 
        else if (cmdClean === "clear") {
            output.innerHTML = "";
            logTerminal("TERMINAL REINICIADO.");
        }
        // 2. VALIDAÇÃO DE SENHA
        else if (cmdRaw === SECRET_PASS) {
            logTerminal("ACESSO CONCEDIDO.", "#00ff00");
            if (vault) {
                vault.style.display = 'block';
                vault.style.visibility = 'visible';
                vault.style.opacity = '1';
            }
        } 
        else {
            logTerminal(`SISTEMA: COMANDO '${cmdRaw}' INVÁLIDO`, "#ff3b30");
        }
    }
}

function runPrivacyScrub() {
    logTerminal("LIMPANDO RASTROS...");
    localStorage.clear();
    sessionStorage.clear();
    logTerminal("LIMPEZA_OK.");
}

function toggleStealth() {
    if (document.body.style.filter.includes("brightness")) {
        document.body.style.filter = "none";
        logTerminal("MODO_STEALTH: OFF");
    } else {
        document.body.style.filter = "brightness(0.6) contrast(1.2)";
        logTerminal("MODO_STEALTH: ON");
    }
}

function emergencyWipe() {
    localStorage.clear();
    window.location.replace("https://www.reuters.com");
}
