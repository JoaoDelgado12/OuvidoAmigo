const joystick = document.querySelector('.center-dot'); //seleciona todos objetos desse tipo
const grid = document.querySelector('.joystick-grid'); //seleciona todos objetos desse tipo
const botoes = document.querySelectorAll('.joy-btn:not(.center-dot)'); //seleciona todos objetos do tipo joy-btn menos center-dot

let fraseAtual = [];

let isDragging = false; //se está segurando ou não
let startX, startY;

// Configurações de limite de movimento (em pixels)
const maxDistance = 110; 

// Eventos de Mouse e Touch
joystick.addEventListener('mousedown', startDrag);
window.addEventListener('mousemove', doDrag);
window.addEventListener('mouseup', stopDrag);

joystick.addEventListener('touchstart', (e) => startDrag(e.touches[0]));
window.addEventListener('touchmove', (e) => {
    e.preventDefault();
    doDrag(e.touches[0]);
});
window.addEventListener('touchend', stopDrag);

//O mapa de palavras
let mapWord = new Map([
    ['1', ['Comer', 'Beber', 'Dormir', 'Sair', 'Tomar banho', 'Ver TV', '', '']],
    ['2', ['Eu', 'Você', 'Mamãe', 'Papai', 'Médico', 'Amigo', '', '']],
    ['3', ['Água', 'Remédio', 'Celular', 'Cadeira', 'Óculos', 'Roupa', '', '']],
    ['4', ['Sim', 'Não', 'Talvez', 'Obrigado', 'Por favor', '', '', '']],
    ['5', ['Feliz', 'Com dor', 'Cansado', 'Triste', 'Fome', 'Sede', '', '']],
    ['6', ['Casa', 'Banheiro', 'Hospital', 'Quarto', 'Cozinha', '', '', '']],
    ['7', ['Ajuda', 'Urgente', 'Calor', 'Frio', 'Silêncio', '', '', '']],
    ['8', ['Calmo', 'Bravo', 'Assustado', 'Amado', '', '', '', '']]
]);

function startDrag(e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    joystick.style.transition = 'none';
}


function doDrag(e) {
    if (!isDragging) return;

    // Calcula deslocamento
    let dx = e.clientX - startX; // lembrando que esse dx e dy são distâncias relativas na div joystick-grid
    let dy = e.clientY - startY;

    // Limita o movimento a um círculo
    const distance = Math.sqrt(dx*dx + dy*dy);
    if (distance > maxDistance) {
        dx *= maxDistance / distance;
        dy *= maxDistance / distance;
    }

    // Move visualmente o joystick
    joystick.style.transform = `translate(${dx}px, ${dy}px)`; //style.transform para realizar as tranformações visuais do joystick

    // Detecta qual botão está mais próximo da direção do arraste
    checkProximity(dx, dy, distance);
    
    joystick.classList.remove('correcao-colisao')
}

function checkProximity(dx, dy, dist) {
    // Remove destaques anteriores
    botoes.forEach(b => b.classList.remove('highlight'));
    
    if (dist < 20) return; // Zona morta central

    // Encontra o botão baseado na posição relativa
    // O segredo aqui é usar elementFromPoint na posição do joystick
    joystick.classList.add('correcao-colisao')
    const rect = joystick.getBoundingClientRect(); // retorna informacoes de tamanho e posicao
    const target = document.elementFromPoint(rect.left + rect.width/2, rect.top + rect.height/2);
   
    if (target && target.classList.contains('joy-btn') && target !== joystick) {
        target.classList.add('highlight');
    }
}

function stopDrag() {
    if (!isDragging) return;
    isDragging = false;

    // Verifica qual estava destacado ao soltar
    const activeBtn = document.querySelector('.joy-btn.highlight');
    if (activeBtn) {
        adicionarPalavra(activeBtn.textContent)
        
        // Feedback Visual
        document.getElementById('cat-nome').innerText = activeBtn.textContent;
        activeBtn.click(); // Dispara a função de selecionar
        activeBtn.classList.remove('highlight');
    
    }

    
    // Volta o joystick para o centro com animação
    joystick.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    joystick.style.transform = `translate(0, 0)`;
}
////////////////////////////////////////


function selecionar(cat) {

    // Gerar Chips
    botoes.forEach((botao, i) => {
        botao.textContent = mapWord.get(String(i + 1))[cat - 1];
        console.log(i + 1)
    });
    // Haptic feedback simulado
    if (navigator.vibrate) navigator.vibrate(50); //funciona só para https
}

function adicionarPalavra(p) {
    fraseAtual.push(p);
    const display = document.getElementById('frase-display');
    display.innerText = fraseAtual.join(' ') + '...';
    display.scrollTop = display.scrollHeight;
}

function limpar() {
    fraseAtual = [];
    document.getElementById('frase-display').innerText = 'Toque em uma categoria...';
    document.getElementById('cat-nome').innerText = 'Selecione Categoria';
    resetBtn()
}

function falar() {
    const texto = fraseAtual.join(' ');
    if (texto) {
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        window.speechSynthesis.speak(utterance);
        limpar()
    }
    
}

function confirmar() {
    if(fraseAtual.length > 0) {
        alert("Frase enviada: " + fraseAtual.join(' '));
        limpar();
        resetBtn()
    }
}

function resetBtn(){
    botoes.forEach((botao, i) => {
        botao.textContent = mapWord.get(String(i + 1))[0];
    });
}

document.addEventListener('DOMContentLoaded', () => {
    resetBtn()
});
