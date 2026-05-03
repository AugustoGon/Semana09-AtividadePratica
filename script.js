const data = {
  produtos: [
    {
      id: 1,
      nome: "Minecraft",
      preco: 149.90,
      categoria: "Sandbox",
      imagem: "img/minecraft.jpg",
      descricao: "Jogo de construção e sobrevivência em mundo aberto.",
      emEstoque: true
    },
    {
      id: 2,
      nome: "Grand Theft Auto V",
      preco: 99.90,
      categoria: "Ação",
      imagem: "img/gta5.jpg",
      descricao: "Jogo de ação em mundo aberto com missões e exploração.",
      emEstoque: true
    },
    {
      id: 3,
      nome: "The Witcher 3",
      preco: 79.90,
      categoria: "RPG",
      imagem: "img/witcher3.jpg",
      descricao: "RPG de fantasia com história envolvente e mundo aberto.",
      emEstoque: true
    },
    {
      id: 4,
      nome: "Fortnite",
      preco: 0,
      categoria: "Battle Royale",
      imagem: "img/fortnite.jpg",
      descricao: "Jogo multiplayer de sobrevivência e construção.",
      emEstoque: true
    },
    {
      id: 5,
      nome: "FIFA 24",
      preco: 299.90,
      categoria: "Esporte",
      imagem: "img/fifa24.jpg",
      descricao: "Simulador de futebol com times e ligas reais.",
      emEstoque: false
    },
    {
      id: 6,
      nome: "Call of Duty: Warzone",
      preco: 0,
      categoria: "Tiro",
      imagem: "img/warzone.jpg",
      descricao: "Jogo de tiro online estilo battle royale.",
      emEstoque: true
    },
    {
      id: 7,
      nome: "Red Dead Redemption 2",
      preco: 129.90,
      categoria: "Aventura",
      imagem: "img/rdr2.jpg",
      descricao: "Aventura em mundo aberto no velho oeste.",
      emEstoque: true
    },
    {
      id: 8,
      nome: "The Sims 4",
      preco: 49.90,
      categoria: "Simulação",
      imagem: "img/sims4.jpg",
      descricao: "Simulador de vida onde você controla personagens.",
      emEstoque: true
    }
  ]
};

// Seleção DOM
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");

// Formatar preço
function formatPrice(preco) {
  return "R$ " + preco.toFixed(2);
}

function createProductCard(produto) {

  const card = document.createElement("div");
  card.classList.add("cartao");

  card.setAttribute("data-id", produto.id);

  card.style.border = "1px solid black";
  card.style.padding = "10px";
  card.style.margin = "10px";

  const titulo = document.createElement("h2");
  titulo.textContent = produto.nome;

  const preco = document.createElement("p");
  preco.textContent = formatPrice(produto.preco);

  const imagem = document.createElement("img");
  imagem.src = produto.imagem;
  imagem.alt = produto.nome;
  imagem.style.maxWidth = "100%"; 
  imagem.style.borderRadius = "10px";


  const categoria = document.createElement("p");
  categoria.textContent = produto.categoria;

  const botaoDetalhes = document.createElement("button");
  botaoDetalhes.textContent = "Ver detalhes";

  const detalhes = document.createElement("div");

  botaoDetalhes.addEventListener("click", function (event) {

    event.stopPropagation();

    detalhes.textContent = "";

    const descricao = document.createElement("p");
    descricao.textContent = produto.descricao;

    const estoque = document.createElement("p");
    estoque.textContent = produto.emEstoque
      ? "Em estoque"
      : "Fora de estoque";

    detalhes.appendChild(descricao);
    detalhes.appendChild(estoque);

  });
  const botaoDestacar = document.createElement("button");
  botaoDestacar.textContent = "Destacar";

  botaoDestacar.addEventListener("click", function (event) {
    event.stopPropagation();

    if (card.style.backgroundColor === "yellow") {
      card.style.backgroundColor = "";
    } else {
      card.style.backgroundColor = "yellow";
    }
  });

  card.appendChild(imagem);
  card.appendChild(titulo);
  card.appendChild(preco);
  card.appendChild(categoria);
  card.appendChild(botaoDetalhes);
  card.appendChild(botaoDestacar);
  card.appendChild(detalhes);


  return card;

}


// Renderizar produtos
function renderProducts(produtos) {

  const lista = document.getElementById("product-list");

  lista.textContent = "";

  produtos.forEach(produto => {

    const card = createProductCard(produto);

    lista.appendChild(card);

  });

  const cards = document.querySelectorAll(".cartao");

  cards.forEach(card => {
    console.log(card.getAttribute("data-id"));
  });
}

// Renderizar categorias
function renderCategories() {

  categorySelect.textContent = "";

  const optionTodas = document.createElement("option");
  optionTodas.value = "Todas";
  optionTodas.textContent = "Todas";

  categorySelect.appendChild(optionTodas);

  data.produtos.forEach(produto => {

    const option = document.createElement("option");

    option.value = produto.categoria;
    option.textContent = produto.categoria;

    categorySelect.appendChild(option);

  });
}

// Mostrar detalhes
function showProductDetails(produto) {

  const detalhes = document.getElementById("product-details");

  detalhes.textContent = "";

  const nome = document.createElement("h2");
  nome.textContent = produto.nome;

  const preco = document.createElement("p");
  preco.textContent = "Preço: " + formatPrice(produto.preco);

  const categoria = document.createElement("p");
  categoria.textContent = "Categoria: " + produto.categoria;

  const descricao = document.createElement("p");
  descricao.textContent = produto.descricao;

  detalhes.appendChild(nome);
  detalhes.appendChild(preco);
  detalhes.appendChild(categoria);
  detalhes.appendChild(descricao);
}
// Filtrar produtos
function filterProducts() {

  const textoBusca = searchInput.value.toLowerCase();
  const categoriaSelecionada = categorySelect.value;

  const produtosFiltrados = data.produtos.filter(produto => {

    const nomeCombina =
      produto.nome.toLowerCase().includes(textoBusca);

    const categoriaCombina =
      categoriaSelecionada === "Todas" ||
      produto.categoria === categoriaSelecionada;

    return nomeCombina && categoriaCombina;

  });

  return produtosFiltrados;
}

// Eventos
btnRender.addEventListener("click", function () {
  renderProducts(filterProducts());
});


btnRender.addEventListener("click", function () {
  renderProducts(filterProducts());
});


// Inicialização
renderCategories();
renderProducts(data.produtos);