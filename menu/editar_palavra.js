import { mapWord, salvarSessao } from "../util.js";

const container = document.querySelector('.word-options');

function carregarInterface() {
    container.innerHTML = ''; // Limpa a tela

    mapWord.forEach((palavras, id) => {
        // Criar o bloco da categoria
        const bloco = document.createElement('div'); //cria um elemento no html
        bloco.className = 'categoria-bloco';  // definiu uma class para o bloco

        // Título da Categoria
        const titulo = document.createElement('div'); 
        titulo.className = 'categoria-titulo';
        titulo.innerText = `Categoria ${id}`;
        bloco.appendChild(titulo);

        // Grid de Inputs
        const grid = document.createElement('div');
        grid.className = 'grid-inputs';

        palavras.forEach((palavra, index) => {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = palavra;
            input.placeholder = "Toque para adicionar...";

            // Evento: Ao digitar, atualiza o Map
            input.addEventListener('input', (e) => {
                let listaAtualizada = mapWord.get(id);
                listaAtualizada[index] = e.target.value;
                mapWord.set(id, listaAtualizada);
                
                let lista = mapWord.get(id);
                lista[index] = e.target.value;
                mapWord.set(id, lista);

                // Salva na sessão para que, ao mudar de página, o Joystick veja a mudança
                salvarSessao(mapWord);

                // Log para você ver no console que o Map está mudando
                console.log(`Map Atualizado ID ${id}:`, mapWord.get(id));
            });

            grid.appendChild(input);
        });

        bloco.appendChild(grid);
        container.appendChild(bloco);
    });
}

function atualizarEsalvar(categoria, index, novoValor) {
    let lista = mapWord.get(categoria);
    lista[index] = novoValor;
    mapWord.set(categoria, lista);

    // Salva no LocalStorage (converte Map para Array e depois para String)
    const stringParaSalvar = JSON.stringify(Array.from(mapWord.entries()));
    localStorage.setItem('vozAtiva_vocabulario', stringParaSalvar);
}

// Inicia a interface
carregarInterface();
