const output = document.getElementById('terminal-output');

function logTerminal(msg) {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br>[${time}] ${msg}`;
    output.scrollTop = output.scrollHeight;
}

function runPrivacyScrub() {
    logTerminal("> INICIANDO LIMPEZA DE METADADOS...");
    // Simula remoção de telemetria
    if (window.history.replaceState) {
        window.history.replaceState({}, document.title, "/");
    }
    setTimeout(() => logTerminal("> RASTROS ELIMINADOS."), 1000);
}

function toggleStealth() {
    logTerminal("> ATIVANDO OFUSCAÇÃO DE TRÁFEGO...");
    document.body.style.filter = "contrast(1.2) brightness(0.8)";
}

function emergencyWipe() {
    if(confirm("CONFIRMAR DESTRUIÇÃO DE DADOS?")) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.replace("https://www.google.com");
    }
}

logTerminal("> PROTOCOLO GHOST CONECTADO.");
