const apiUrl = "http://localhost:3000/api/tarefas";

// Modal e inputs
const modalEditar = new bootstrap.Modal(document.getElementById("modalEditarTarefa"));
const inputDescricao = document.getElementById("inputDescricao");
const inputSetor = document.getElementById("inputSetor");
const inputPrioridade = document.getElementById("inputPrioridade");
const inputStatus = document.getElementById("inputStatus");
const inputIdTarefa = document.getElementById("idTarefaEditar");
const btnSalvarEdicao = document.getElementById("btnSalvarEdicao");

// Função para criar card de tarefa
function criarCardTarefa(tarefa) {
  const card = document.createElement("div");
  card.className = "card shadow-sm mb-3";
  card.innerHTML = `
    <div class="card-body">
      <ul class="list-group mb-3">
        <li class="list-group-item">Descrição: ${tarefa.descricao}</li>
        <li class="list-group-item">Setor: ${tarefa.setor}</li>
        <li class="list-group-item">Prioridade: ${tarefa.prioridade}</li>
        <li class="list-group-item">Usuário: ${tarefa.nome_usuario}</li>
        <li class="list-group-item">Status: ${tarefa.status}</li>
      </ul>
      <div class="d-flex justify-content-between mb-3">
        <button class="btnEditar btn btn-primary btn-sm">Editar</button>
        <button class="btnExcluir btn btn-danger btn-sm">Excluir</button>
      </div>
    </div>
  `;

  const btnEditar = card.querySelector(".btnEditar");
  const btnExcluir = card.querySelector(".btnExcluir");

  // Abrir modal para edição
  btnEditar.addEventListener("click", () => {
    inputDescricao.value = tarefa.descricao;
    inputSetor.value = tarefa.setor;
    inputPrioridade.value = tarefa.prioridade.toLowerCase();
    inputStatus.value = tarefa.status.toLowerCase();
    inputIdTarefa.value = tarefa.id_tarefa;
    modalEditar.show();
  });

  // Excluir tarefa
  btnExcluir.addEventListener("click", async () => {
    if (confirm("Deseja realmente excluir esta tarefa?")) {
      await fetch(`${apiUrl}/${tarefa.id_tarefa}`, { method: "DELETE" });
      carregarTarefas();
    }
  });

  return card;
}

// Função para carregar todas as tarefas
async function carregarTarefas() {
  try {
    const res = await fetch(apiUrl);
    const tarefas = await res.json();

    // limpar colunas
    document.getElementById("tarefas-afazer").innerHTML = "";
    document.getElementById("tarefas-fazendo").innerHTML = "";
    document.getElementById("tarefas-pronto").innerHTML = "";

    tarefas.forEach(tarefa => {
      let container;
      switch (tarefa.status.toLowerCase()) {
        case "a fazer": container = document.getElementById("tarefas-afazer"); break;
        case "fazendo": container = document.getElementById("tarefas-fazendo"); break;
        case "pronto": container = document.getElementById("tarefas-pronto"); break;
        default: container = document.getElementById("tarefas-afazer");
      }
      container.appendChild(criarCardTarefa(tarefa));
    });
  } catch (erro) {
    console.error("Erro ao carregar tarefas:", erro);
  }
}

// Salvar edição via modal
btnSalvarEdicao.addEventListener("click", async () => {
  const id = inputIdTarefa.value;
  try {
    await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        descricao: inputDescricao.value,
        setor: inputSetor.value,
        prioridade: inputPrioridade.value,
        status: inputStatus.value
      })
    });
    modalEditar.hide();
    carregarTarefas();
  } catch (erro) {
    console.error("Erro ao salvar tarefa:", erro);
  }
});

// Inicializar
carregarTarefas();