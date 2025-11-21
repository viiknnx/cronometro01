let timer;
let running = false;
let milliseconds = 0;
let currentTitle = "Nova Contagem";

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');
const addTitleBtn = document.getElementById('add-title-btn');
const titleField = document.getElementById('title-field');
const enterTitleBtn = document.getElementById('enter-title-btn');
const historyList = document.getElementById('history-list');
const themeToggle = document.getElementById('theme-toggle');

// Função para formatar o tempo em HH:MM:SS
function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    const pad = (num) => String(num).padStart(2, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

// Função de atualização do cronômetro
function updateTime() {
    milliseconds += 1000;
    display.textContent = formatTime(milliseconds);
}

// Iniciar/Pausar
startPauseBtn.addEventListener('click', () => {
    if (running) {
        // Pausar
        clearInterval(timer);
        running = false;
        startPauseBtn.textContent = '⏸️ Pausar';
    } else {
        // Iniciar/Continuar
        timer = setInterval(updateTime, 1000);
        running = true;
        startPauseBtn.textContent = '▶️ Continuar';
    }
});

// Finalizar Contagem
resetBtn.addEventListener('click', () => {
    if (running) {
        clearInterval(timer);
        running = false;
    }

    // Adiciona o registro ao histórico se o tempo for maior que 0
    if (milliseconds > 0) {
        const timeElapsed = formatTime(milliseconds);
        addHistoryItem(currentTitle, timeElapsed);
    }

    // Resetar
    milliseconds = 0;
    display.textContent = '00:00:00';
    startPauseBtn.textContent = '▶️ Iniciar';
    currentTitle = "Nova Contagem";
    titleField.value = ""; // Limpa o campo
    titleField.style.display = 'none';
    enterTitleBtn.style.display = 'none';
    addTitleBtn.style.display = 'inline-block';
});

// Exibir campo de título
addTitleBtn.addEventListener('click', () => {
    titleField.style.display = 'inline-block';
    enterTitleBtn.style.display = 'inline-block';
    addTitleBtn.style.display = 'none';
    titleField.focus();
});

// Salvar título e iniciar
enterTitleBtn.addEventListener('click', () => {
    const newTitle = titleField.value.trim();
    if (newTitle) {
        currentTitle = newTitle;
    }
    // Opcional: iniciar a contagem automaticamente
    if (!running) {
        startPauseBtn.click();
    }
    titleField.style.display = 'none';
    enterTitleBtn.style.display = 'none';
});

// Adicionar item ao histórico
function addHistoryItem(title, time) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span class="theme">${title || 'Contagem sem título'}</span>
        <span class="time">${time}</span>
    `;
    historyList.prepend(listItem); // Adiciona no topo
}

// Alternar Modo Claro/Escuro
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }
});
