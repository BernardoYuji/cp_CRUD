// Dados iniciais
const dadosIniciais = [
  {
    "nome": "Andressa Alves",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://example.com/andressa.jpg",
    "gols": 15,
    "assistencias": 10,
    "jogos": 28,
    "favorita": false
  },
  {
    "nome": "Dayana Rodríguez",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://example.com/dayana.jpg",
    "gols": 5,
    "assistencias": 12,
    "jogos": 30,
    "favorita": false
  },
  {
    "nome": "Mariza",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/mariza.jpg",
    "gols": 2,
    "assistencias": 1,
    "jogos": 32,
    "favorita": false
  },
  {
    "nome": "Thaís Regina",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/thais.jpg",
    "gols": 1,
    "assistencias": 2,
    "jogos": 25,
    "favorita": false
  },
  {
    "nome": "Letícia Teles",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/leticia.jpg",
    "gols": 0,
    "assistencias": 0,
    "jogos": 18,
    "favorita": false
  }
]

// Inicializa LocalStorage 
if (!localStorage.getItem('jogadoras')) {
  localStorage.setItem('jogadoras', JSON.stringify(dadosIniciais));
}

// Helpers
function getJogadoras() {
  return JSON.parse(localStorage.getItem("jogadoras")) || [];
}
function salvarJogadoras(jogadoras) {
  localStorage.setItem("jogadoras", JSON.stringify(jogadoras));
}

// Listar jogadoras
function listarJogadoras() {
  const lista = document.getElementById("lista");
  const jogadoras = getJogadoras();
  lista.innerHTML = "";

  jogadoras.forEach((j, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${j.foto}" alt="${j.nome}">
      <h3>${j.nome}</h3>
      <p>${j.posicao} - ${j.clube}</p>
      <p>⚽ ${j.gols} | 🎯 ${j.assistencias} | 📊 ${j.jogos}</p>
      <span class="favorita ${j.favorita ? "ativo" : ""}" onclick="toggleFavorita(${i})">★</span>
      <div class="acoes">
        <button onclick="editarJogadora(${i})">✏️ Editar</button>
        <button onclick="removerJogadora(${i})">🗑️ Remover</button>
      </div>
    `;
    lista.appendChild(card);
  });
}

// Adicionar/editar
document.getElementById("form-jogadora").addEventListener("submit", function(e) {
  e.preventDefault();
  const jogadoras = getJogadoras();
  const index = document.getElementById("editIndex").value;

  const nova = {
    nome: document.getElementById("nome").value,
    posicao: document.getElementById("posicao").value,
    clube: document.getElementById("clube").value,
    gols: parseInt(document.getElementById("gols").value),
    assistencias: parseInt(document.getElementById("assistencias").value),
    jogos: parseInt(document.getElementById("jogos").value),
    foto: document.getElementById("foto").value,
    favorita: false
  };

  if (index === "") {
    jogadoras.push(nova);
    alert("Jogadora adicionada com sucesso!");
  } else {
    jogadoras[index] = nova;
    alert("Jogadora editada com sucesso!");
  }

  salvarJogadoras(jogadoras);
  this.reset();
  document.getElementById("editIndex").value = "";
  listarJogadoras();
});

// Editar
function editarJogadora(i) {
  const j = getJogadoras()[i];
  document.getElementById("editIndex").value = i;
  document.getElementById("nome").value = j.nome;
  document.getElementById("posicao").value = j.posicao;
  document.getElementById("clube").value = j.clube;
  document.getElementById("gols").value = j.gols;
  document.getElementById("assistencias").value = j.assistencias;
  document.getElementById("jogos").value = j.jogos;
  document.getElementById("foto").value = j.foto;
}

// Remover
function removerJogadora(i) {
  const jogadoras = getJogadoras();
  jogadoras.splice(i, 1);
  salvarJogadoras(jogadoras);
  alert("Jogadora removida com sucesso!");
  listarJogadoras();
}

// Favoritar
function toggleFavorita(i) {
  const jogadoras = getJogadoras();
  jogadoras[i].favorita = !jogadoras[i].favorita;
  salvarJogadoras(jogadoras);
  listarJogadoras();
}

// Inicializa listagem
listarJogadoras();
