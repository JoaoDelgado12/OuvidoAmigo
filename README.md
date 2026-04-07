# 🗣️ CAALL - Comunicação Aumentativa e Assistiva para Todos

O **Voz Ativa** é uma aplicação de Comunicação Alternativa e Aumentativa (CAA) projetada para oferecer autonomia a pessoas com limitações na fala.
Com uma interface moderna inspirada no iOS (iPhone 15 Pro), o projeto utiliza um sistema de "Joystick de Palavras" para facilitar a construção de frases de forma rápida e intuitiva.

---

## 📱 Visão Geral do Simulador

O projeto simula a experiência de um dispositivo móvel real, focando em acessibilidade motora e visual.

* **Joystick Central:** Navegação direcional para selecionar categorias de palavras.
* **Síntese de Voz (TTS):** Transforma o texto montado em áudio nativo em Português (PT-BR).
* **Gestão de Vocabulário:** Tela dedicada para personalizar as palavras de acordo com a necessidade do usuário.

---

## ✨ Funcionalidades

- **Seleção por Proximidade:** Utiliza a lógica de `elementFromPoint` para detectar qual botão o joystick está ativando, ideal para quem possui dificuldades de precisão motora.
- **Persistência de Sessão:** Implementação de `SessionStorage` para que as edições no vocabulário persistam enquanto o usuário navega entre a tela de uso e a tela de configuração.
- **Feedback Háptico Simulado:** Vibração ao selecionar categorias (disponível em dispositivos compatíveis via HTTPS).

---

## 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido utilizando **Vanilla JavaScript**, prezando pela performance e ausência de dependências externas pesadas.

| Tecnologia | Finalidade |
| :--- | :--- |
| **HTML5** | Estrutura semântica e esqueleto do simulador. |
| **CSS3** | Estilização avançada (Flexbox, Grid, Animações Bezier). |
| **JS Modules** | Organização do código com `import` e `export`. |
| **Web Speech API** | Motor de síntese de voz para leitura das frases. |
| **Web Storage API** | Persistência dos dados do `Map` de palavras. |

---

## 📂 Estrutura de Arquivos

```text
├── index.html           # Tela principal do iPhone (Joystick)
├── script.js            # Lógica de interação, arraste e som
├── util.js              # Fonte de dados (Map) e lógica de persistência
├── style.css            # Design do sistema e do hardware simulado
└── /menu
    ├── editar_palavra.html  # Interface de gerenciamento de palavras
    └── editar_palavra.js    # Lógica de atualização do sessionStorage
