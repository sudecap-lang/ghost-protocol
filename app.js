const output = document.getElementById('terminal-output');

function logTerminal(msg) {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br>[${time}] ${msg}`;
    output.scrollTop = output.scrollHeight;
}

// Limpeza de rastros de navegação simulada
function runPrivacyScrub() {
    logTerminal("> LIMPANDO CACHE DE NAVEGAÇÃO...");
    logTerminal("> REMOVENDO METADADOS EXIF...");
    if (window.history.replaceState) {
        window.history.replaceState({}, document.title, "/");
    }
    setTimeout(() => logTerminal("> SISTEMA LIMPO."), 1500);
}

// Modo Ghost (Bloqueio de visibilidade)
function toggleStealth() {
    logTerminal("> ATIVANDO OFUSCAÇÃO DE TRÁFEGO...");
    document.body.style.filter = "contrast(1.5) brightness(0.7)";
}

// Função de Emergência: Limpa tudo e redireciona para disfarce
function emergencyWipe() {
    logTerminal("> INICIANDO DESTRUIÇÃO DE DADOS LOCAL...");
    localStorage.clear();
    sessionStorage.clear();
    alert("PROTOCOLO DE EMERGÊNCIA ATIVADO");
    window.location.replace("https://www.google.com/search?q=tempo+hoje");
}

// Log inicial
logTerminal("> CONEXÃO SEGURA ESTABELECIDA.");
logTerminal("> AGUARDANDO COMANDOS.");

// Mantém funções de remoção de trackers de vídeos (estilo AdBlocker)
setInterval(() => {
    const blockers = ['ytd-enforcement-message-view-model', 'tp-yt-paper-dialog'];
    blockers.forEach(sel => {
        const el = document.querySelector(sel);
        if (el) el.remove();
    });
}, 1000);
