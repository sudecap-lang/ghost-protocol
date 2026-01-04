const output = document.getElementById('terminal-output');

function logTerminal(msg) {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br>[${time}] ${msg}`;
    output.scrollTop = output.scrollHeight;
}

function runPrivacyScrub() {
    logTerminal("> LIMPANDO CACHE E METADADOS...");
    if (window.history.replaceState) {
        window.history.replaceState({}, document.title, "/");
    }
    setTimeout(() => logTerminal("> SISTEMA ANONIMIZADO."), 1000);
}

function toggleStealth() {
    logTerminal("> OFUSCANDO TRÁFEGO DE REDE...");
    document.body.style.filter = "contrast(1.2) brightness(0.8)";
}

function emergencyWipe() {
    logTerminal("> INICIANDO WIPE DE EMERGÊNCIA...");
    localStorage.clear();
    sessionStorage.clear();
    alert("PROTOCOLO DE EMERGÊNCIA: DADOS APAGADOS.");
    window.location.replace("https://www.google.com");
}

logTerminal("> CONEXÃO SEGURA ESTABELECIDA.");
