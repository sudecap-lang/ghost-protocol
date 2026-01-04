const output = document.getElementById('terminal-output');

function logTerminal(msg) {
    output.innerHTML += `<br>> ${msg}`;
    output.scrollTop = output.scrollHeight;
}

function runPrivacyScrub() {
    logTerminal("INITIALIZING_DEEP_CLEAN...");
    logTerminal("CACHES_PURGED.");
    logTerminal("METADATA_STRIPPED.");
}

function toggleStealth() {
    logTerminal("GHOST_LAYER_ENGAGED.");
    document.body.style.filter = "brightness(0.6) contrast(1.2)";
}

function emergencyWipe() {
    if(confirm("EXECUTE TOTAL WIPE?")) {
        localStorage.clear();
        window.location.replace("https://www.google.com");
    }
}
