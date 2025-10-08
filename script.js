const form = document.getElementById("form-contato");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const telefoneInput = document.getElementById("telefone");
const botaoSalvar = document.getElementById("botao-salvar");
const listaContatos = document.getElementById("lista-contatos");

let contatos = [];
let idEmEdicao = null;



// FUNÇÕES DE LOCAL STORAGE
function carregarContatos() {
  const dados = localStorage.getItem("contatos");
  contatos = dados ? JSON.parse(dados) : [];
}

function salvarContatos() {
  localStorage.setItem("contatos", JSON.stringify(contatos));
}


// FUNÇÃO PARA RENDERIZAR
function renderizarContatos(filtro = "") {
  listaContatos.innerHTML = "";

  const contatosFiltrados = contatos.filter(
    (contato) =>
      contato.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      contato.email.toLowerCase().includes(filtro.toLowerCase())
  );

  contatosFiltrados.forEach((contato) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${contato.nome}</td>
      <td>${contato.email}</td>
      <td>${contato.telefone}</td>
      <td>
        <button class="editar" onclick="editarContato(${contato.id})">Editar</button>
        <button class="remover" onclick="removerContato(${contato.id})">Remover</button>
      </td>
    `;

    listaContatos.appendChild(tr);
  });
}


// FUNÇÃO PARA ADICIONAR/EDITAR
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();
  const telefone = telefoneInput.value.trim();

  if (!nome || !email || !telefone) {
    alert("Preencha todos os campos!");
    return;
  }

  if (idEmEdicao) {
    const index = contatos.findIndex((c) => c.id === idEmEdicao);
    contatos[index] = { id: idEmEdicao, nome, email, telefone };
    idEmEdicao = null;
    botaoSalvar.textContent = "Adicionar Contato";
  } else {
    const novoContato = {
      id: Date.now(),
      nome,
      email,
      telefone,
    };
    contatos.push(novoContato);
  }

  salvarContatos();
  renderizarContatos();
  form.reset();
});


// FUNÇÕES DE EDIÇÃO E REMOÇÃO
function editarContato(id) {
  const contato = contatos.find((c) => c.id === id);
  nomeInput.value = contato.nome;
  emailInput.value = contato.email;
  telefoneInput.value = contato.telefone;

  idEmEdicao = id;
  botaoSalvar.textContent = "Salvar Alterações";
}

function removerContato(id) {
  if (confirm("Deseja realmente remover este contato?")) {
    contatos = contatos.filter((c) => c.id !== id);
    salvarContatos();
    renderizarContatos();
  }
}


// FUNÇÃO DE BUSCA/FILTRO
campoBusca.addEventListener("input", (e) => {
  renderizarContatos(e.target.value);
});


carregarContatos();
renderizarContatos();
