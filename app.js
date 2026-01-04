// Limpeza de cache e parâmetros de URL
function toggleScrub() {
    const log = document.getElementById('console');
    log.innerHTML += "<br>> Limpando metadados...";
    
    // Simulação de limpeza de telemetria
    if (window.history.replaceState) {
        window.history.replaceState({}, document.title, "/");
    }
    
    setTimeout(() => {
        log.innerHTML += "<br>> Navegação anonimizada.";
    }, 1000);
}

// Registro do Service Worker para rodar Offline
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}