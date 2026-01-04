const terminal = document.getElementById('terminal-display');

function logTerminal(msg) {
    terminal.innerHTML += `<br>> ${msg}`;
    terminal.scrollTop = terminal.scrollHeight;
}

// COFRE SECRETO: Digite '1234' para abrir
function checkCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const cmd = input.value;
        input.value = '';

        if (cmd === '1234') { // COLOQUE SEU CÓDIGO AQUI
            document.getElementById('secret-vault').style.display = 'block';
            logTerminal("ACCESS_GRANTED: VAULT_OPENED");
        } else {
            logTerminal("ERROR: INVALID_CREDENTIALS");
        }
    }
}

function runPrivacyScrub() {
    logTerminal("PURGING_METADATA...");
    logTerminal("HISTORY_SCRUBBED.");
}

function toggleStealth() {
    logTerminal("ENGAGING_GHOST_LAYER...");
    document.body.style.filter = "brightness(0.6) contrast(1.3)";
}

function emergencyWipe() {
    if(confirm("CONFIRMAR AUTODESTRUIÇÃO?")) {
        localStorage.clear();
        window.location.replace("https://www.google.com");
    }
}
