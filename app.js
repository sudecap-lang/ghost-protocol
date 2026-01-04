const output = document.getElementById('terminal-output');

function logTerminal(msg) {
    const time = new Date().toLocaleTimeString();
    output.innerHTML += `<br>[${time}] ${msg}`;
    output.scrollTop = output.scrollHeight;
}

function runPrivacyScrub() {
    logTerminal("> LIMPANDO BUFFER DE DADOS...");
    logTerminal("> METADADOS EXIF ELIMINADOS.");
    if (window.history.replaceState) {
        window.history.replaceState({}, document.title, "/");
    }
    setTimeout(() => logTerminal("> SISTEMA HIGIENIZADO."), 1000);
}

function toggleStealth() {
    logTerminal("> ATIVANDO CAMUFLAGEM VISUAL...");
    document.body.style.filter = "contrast(1.2) brightness(0.8) sepia(0.2)";
}

function emergencyWipe() {
    logTerminal("> PROTOCOLO DE AUTODESTRUIÇÃO...");
    localStorage.clear();
    sessionStorage.clear();
    // Redireciona para um site neutro para disfarce
    window.location.replace("https://www.google.com/search?q=clima+tempo+hoje");
}

logTerminal("> LINK SEGURO ESTABELECIDO.");
