// Banco de dados de frustrações gerais (Pílula da Desilusão)
const generalQuotes = [
    "O único motivo pelo qual te aturam é porque você ainda está trazendo resultados. Adoeça e veja o que acontece.",
    "Aquele que você acha que te protege não moverá um dedo para te ajudar quando você mais precisar.",
    "Quando te dizem 'não cause problemas', não é para o seu bem. É porque você é um incômodo.",
    "Se você sumir hoje, a empresa te substitui na segunda-feira sem pensar duas vezes.",
    "Ninguém se importa se você vive ou morre. Suas vitórias são ignoradas e suas falhas, eternizadas.",
    "Esse seu orgulho em revidar só vai te trazer mais consequências que vão te destruir.",
    "Trabalhe duro hoje para que amanhã seu chefe possa comprar outro carro de luxo.",
    "O amanhã é apenas mais uma oportunidade para você falhar nos mesmos erros de sempre.",
    "Tudo passa. Inclusive a sua juventude e todas as oportunidades que você desperdiçou.",
    "O caminho mais curto entre dois pontos é aquele no qual você vai se perder de qualquer maneira.",
    "Seus pais tinham expectativas altas. Olha você agora, clicando em botões num site depressivo.",
    "O sucesso é para os outros. Aceite a mediocridade e economize sua energia."
];

// Banco de dados de frases negativas para o relógio (por período)
const timeQuotes = {
    dawn: [
        "Ainda acordado? A insônia não vai tornar seus sonhos realidade.",
        "Madrugada silenciosa, perfeita para lembrar de todas as suas péssimas escolhas na vida.",
        "As horas estão passando e a sua insônia só garante que amanhã você renderá ainda menos.",
        "Ir dormir agora ou continuar perdendo tempo na internet? Ambos dão no mesmo vazio."
    ],
    morning: [
        "Bom dia para quem já acordou cansado e sabendo que nada relevante vai mudar hoje.",
        "O sol nasceu apenas para iluminar mais um dia de decisões medíocres.",
        "Mais uma manhã, mais uma tentativa inútil de parecer um adulto funcional.",
        "Acordar cedo só faz o seu dia de arrependimentos durar mais tempo."
    ],
    afternoon: [
        "O dia já está na metade e seu progresso continua zerado. Parabéns.",
        "Horário comercial: vendendo sua juventude em parcelas de 8 horas por dia.",
        "A tarde passa lentamente, enquanto sua vida corre rápido em direção ao nada.",
        "Almoço digerido. Agora volte a fingir que se importa com a sua carreira."
    ],
    evening: [
        "O dia está acabando e você não fez nada além do mínimo necessário para não ser demitido.",
        "A noite chegou. É hora de deitar e fingir que amanhã tudo será magicamente diferente.",
        "Mais um dia encerrado. Uma folha a menos no calendário, nenhum progresso real na vida.",
        "O dia terminou. O arrependimento noturno está liberado para iniciar."
    ]
};

// Banco de dados de reações para o Cemitério de Metas
const todoAddReactions = [
    "Boa sorte. Você vai desistir disso em 3 dias.",
    "Mais uma mentira para a sua lista de promessas de Ano Novo.",
    "Anotado. Enviando diretamente para o arquivo de projetos inacabados.",
    "Você realmente acha que vai ter disciplina para isso?",
    "Uma meta ambiciosa para alguém que passou as últimas 2 horas rolando o feed."
];

const todoCheckReactions = [
    "Parabéns por fazer o absoluto mínimo obrigatório.",
    "Fez a obrigação e quer palmas? Menos, bem menos.",
    "Legal, agora volte a ser insignificante no resto do seu dia.",
    "Uma tarefa simples levou o dia inteiro. Que ritmo invejável...",
    "Riscou da lista. Mas o vazio existencial continua intacto."
];

const todoDeleteReactions = [
    "Desistiu tão rápido? Não esperava menos de você.",
    "Apagou? Melhor assim, economiza sua energia de qualquer forma.",
    "Mais um plano engolido pela realidade do seu desinteresse.",
    "A desistência é o único hábito que você mantém de forma consistente."
];

// Banco de dados para desculpas corporativas
const excuseSubjects = [
    "O escopo da entrega",
    "O alinhamento sinérgico do roadmap",
    "O desvio conceitual nas diretrizes do projeto",
    "A sprint atual de desenvolvimento",
    "A validação dos KPIs estratégicos",
    "A integração de ponta a ponta da API",
    "O deploy no ambiente de staging"
];

const excuseVerbs = [
    "sofreu um impacto severo devido a",
    "foi despriorizado temporariamente por conta de",
    "precisa ser reavaliado holisticamente após",
    "entrou em estado de mitigação por causa de",
    "sofreu um gargalo operacional decorrente de",
    "teve o cronograma postergado em virtude de"
];

const excuseCauses = [
    "gargalos de comunicação interdepartamentais e silos de informação.",
    "uma repriorização macro-estratégica por parte dos principais stakeholders.",
    "inconsistências na arquitetura legada e débitos técnicos acumulados.",
    "alocações inesperadas de recursos em demandas críticas de sustentação prioritária.",
    "alinhamentos de governança que necessitam de dupla validação do C-level.",
    "uma disrupção sistêmica na infraestrutura de cloud sob demanda."
];

// Elementos DOM
const quoteDisplay = document.getElementById('quote-display');
const btnQuote = document.getElementById('btn-quote');

const clockTime = document.getElementById('clock-time');
const dayProgressBar = document.getElementById('day-progress-bar');
const dayProgressLabel = document.getElementById('day-progress-label');
const clockQuoteDisplay = document.getElementById('clock-quote-display');

const btnCalc = document.getElementById('btn-calc');
const calcResult = document.getElementById('calc-result');

const todoInput = document.getElementById('todo-input');
const btnTodoAdd = document.getElementById('btn-todo-add');
const todoList = document.getElementById('todo-list');
const todoMessage = document.getElementById('todo-message');

const excuseDisplay = document.getElementById('excuse-display');
const btnExcuse = document.getElementById('btn-excuse');
const btnExcuseCopy = document.getElementById('btn-excuse-copy');
const copyTooltip = document.getElementById('copy-tooltip');

// ---- CONTROLE DE HORÁRIO E RELÓGIO ----
let currentPeriod = '';
let clockQuoteTimer = 0;

function getPeriod(hour) {
    if (hour >= 0 && hour < 6) return 'dawn';
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    return 'evening';
}

function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Formata o relógio
    const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    clockTime.textContent = timeString;

    // Calcula progresso do dia (segundos totais passados hoje / segundos totais em um dia)
    const totalSecondsToday = (hours * 3600) + (minutes * 60) + seconds;
    const daySeconds = 86400;
    const progressPercent = (totalSecondsToday / daySeconds) * 100;
    
    dayProgressBar.style.width = `${progressPercent}%`;
    dayProgressLabel.textContent = `Dia: ${progressPercent.toFixed(4)}% desperdiçado`;

    // Atualiza frase do relógio baseada no período do dia
    const period = getPeriod(hours);
    
    // Atualiza a frase a cada 60 segundos ou se mudar o período
    if (period !== currentPeriod || clockQuoteTimer <= 0) {
        currentPeriod = period;
        const quotesArray = timeQuotes[period];
        const randomQuote = quotesArray[Math.floor(Math.random() * quotesArray.length)];
        clockQuoteDisplay.textContent = randomQuote;
        clockQuoteTimer = 60; // Reinicia o timer para 60 segundos
    } else {
        clockQuoteTimer--;
    }
}

// Inicializa o relógio
setInterval(updateClock, 1000);
updateClock();

// ---- PÍLULA DA DESILUSÃO ----
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * generalQuotes.length);
    quoteDisplay.textContent = `"${generalQuotes[randomIndex]}"`;
}
getRandomQuote();
btnQuote.addEventListener('click', getRandomQuote);

// ---- CALCULADORA DE TEMPO PERDIDO ----
btnCalc.addEventListener('click', () => {
    const hours = parseFloat(document.getElementById('hours').value);
    const days = parseFloat(document.getElementById('days').value);
    const years = parseFloat(document.getElementById('years').value);

    if (isNaN(hours) || isNaN(days) || isNaN(years) || hours <= 0 || days <= 0 || years <= 0) {
        calcResult.textContent = "Você não consegue nem digitar números positivos básicos. Tente novamente.";
        calcResult.classList.remove('hidden');
        return;
    }

    if (hours > 24 || days > 7) {
        calcResult.textContent = "Seu dia tem mais de 24 horas ou sua semana tem mais de 7 dias? Parabéns por viver em outro planeta.";
        calcResult.classList.remove('hidden');
        return;
    }

    const weeksInYear = 52;
    const totalHoursWasted = Math.round((hours * days) * weeksInYear * years);
    const totalDaysWasted = (totalHoursWasted / 24).toFixed(1);

    calcResult.innerHTML = `
        Você desperdiçou aproximadamente <strong>${totalHoursWasted} horas</strong> (ou <strong>${totalDaysWasted} dias ininterruptos</strong>) da sua vida nisso.<br><br>
        Todo esse tempo não vai voltar. E, no fim, o resultado continuará sendo o mesmo: irrelevante.
    `;
    calcResult.classList.remove('hidden');
});

// ---- CEMITÉRIO DE METAS (TODO LIST) ----
let tasks = [];

// Carrega metas do LocalStorage
if (localStorage.getItem('abismo_tasks')) {
    try {
        tasks = JSON.parse(localStorage.getItem('abismo_tasks'));
    } catch (e) {
        tasks = [];
    }
}

function saveTasks() {
    localStorage.setItem('abismo_tasks', JSON.stringify(tasks));
}

function updateTodoMessage(text) {
    todoMessage.textContent = text;
}

function renderTasks() {
    todoList.innerHTML = '';
    
    if (tasks.length === 0) {
        todoList.innerHTML = '<li class="todo-empty">Nenhuma meta. Você já desistiu antes mesmo de começar.</li>';
        return;
    }

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <span class="todo-text">${escapeHTML(task.text)}</span>
            <div class="todo-actions">
                <button class="btn-todo-check" title="${task.completed ? 'Desmarcar' : 'Concluir'}">
                    ${task.completed ? '↩️' : '✓'}
                </button>
                <button class="btn-todo-del" title="Excluir">✗</button>
            </div>
        `;

        // Evento Concluir/Desmarcar
        li.querySelector('.btn-todo-check').addEventListener('click', () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
            
            if (tasks[index].completed) {
                const randomReact = todoCheckReactions[Math.floor(Math.random() * todoCheckReactions.length)];
                updateTodoMessage(randomReact);
            }
        });

        // Evento Deletar
        li.querySelector('.btn-todo-del').addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
            const randomReact = todoDeleteReactions[Math.floor(Math.random() * todoDeleteReactions.length)];
            updateTodoMessage(randomReact);
        });

        todoList.appendChild(li);
    });
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

btnTodoAdd.addEventListener('click', () => {
    const text = todoInput.value.trim();
    if (!text) {
        updateTodoMessage("Fazer o quê? O campo está vazio, assim como o seu futuro.");
        return;
    }
    
    tasks.push({ text: text, completed: false });
    saveTasks();
    todoInput.value = '';
    renderTasks();
    
    const randomReact = todoAddReactions[Math.floor(Math.random() * todoAddReactions.length)];
    updateTodoMessage(randomReact);
});

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btnTodoAdd.click();
    }
});

// Inicializa a lista de tarefas
renderTasks();

// ---- GERADOR DE DESCULPAS CORPORATIVAS ----
function generateExcuse() {
    const subject = excuseSubjects[Math.floor(Math.random() * excuseSubjects.length)];
    const verb = excuseVerbs[Math.floor(Math.random() * excuseVerbs.length)];
    const cause = excuseCauses[Math.floor(Math.random() * excuseCauses.length)];
    
    const excuse = `${subject} ${verb} ${cause}`;
    excuseDisplay.textContent = excuse;
}

btnExcuse.addEventListener('click', generateExcuse);

btnExcuseCopy.addEventListener('click', () => {
    const text = excuseDisplay.textContent.trim();
    if (text.includes("Selecione gerar álibi")) {
        return;
    }
    
    navigator.clipboard.writeText(text).then(() => {
        copyTooltip.classList.add('show');
        setTimeout(() => {
            copyTooltip.classList.remove('show');
        }, 2000);
    }).catch(err => {
        console.error('Falha ao copiar texto: ', err);
    });
});