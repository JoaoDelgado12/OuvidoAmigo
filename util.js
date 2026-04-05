const mapPadrao = new Map([
    ['1', ['Comer', 'Beber', 'Dormir', 'Sair', 'Tomar banho', 'Ver TV', '', '']],
    ['2', ['Eu', 'Você', 'Mamãe', 'Papai', 'Médico', 'Amigo', '', '']],
    ['3', ['Água', 'Remédio', 'Celular', 'Cadeira', 'Óculos', 'Roupa', '', '']],
    ['4', ['Sim', 'Não', 'Talvez', 'Obrigado', 'Por favor', '', '', '']],
    ['5', ['Feliz', 'Com dor', 'Cansado', 'Triste', 'Fome', 'Sede', '', '']],
    ['6', ['Casa', 'Banheiro', 'Hospital', 'Quarto', 'Cozinha', '', '', '']],
    ['7', ['Ajuda', 'Urgente', 'Calor', 'Frio', 'Silêncio', '', '', '']],
    ['8', ['Calmo', 'Bravo', 'Assustado', 'Amado', '', '', '', '']]
]);

// Tenta pegar da sessão
const dadosSessao = sessionStorage.getItem('vozAtiva_vocabulario');

// Exporta o map (ou o da sessão ou o padrão)
export const mapWord = dadosSessao ? new Map(JSON.parse(dadosSessao)) : mapPadrao;

// Função auxiliar para salvar (também exportada)
export function salvarSessao(map) {
    const stringParaSalvar = JSON.stringify(Array.from(map.entries()));
    sessionStorage.setItem('vozAtiva_vocabulario', stringParaSalvar);
}