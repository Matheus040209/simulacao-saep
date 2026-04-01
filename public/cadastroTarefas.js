// cadastroTarefas.js

const form = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");
const usuarioSelect = document.getElementById("usuario");

// Função para carregar os usuários no select
async function carregarUsuarios() {
  try {
    const resposta = await fetch("/api/usuarios"); // Endpoint da API que lista usuários
    if (!resposta.ok) throw new Error("Erro ao buscar usuários");
    
    const usuarios = await resposta.json();

    // Limpa opções antigas, exceto a primeira
    usuarioSelect.innerHTML = '<option value="">Selecione usuário</option>';

    usuarios.forEach(u => {
      const option = document.createElement("option");
      option.value = u.id_usuario;  // envia id do usuário
      option.textContent = u.nome;  // mostra nome no select
      usuarioSelect.appendChild(option);
    });
  } catch (erro) {
    console.error("Erro ao carregar usuários:", erro);
    mensagem.textContent = "Não foi possível carregar usuários.";
    mensagem.style.color = "red";
  }
}

// Chama ao carregar a página
carregarUsuarios();

// Evento de submit do formulário
form.addEventListener("submit", async function(event) {
  event.preventDefault();

  // Pega os valores do formulário
  const tarefa = {
    id_usuario: usuarioSelect.value,
    descricao: document.getElementById("descricao").value.trim(),
    setor: document.getElementById("setor").value.trim(),
    prioridade: document.getElementById("prioridade").value
  };

  // Validação básica
  if (!tarefa.id_usuario) {
    mensagem.textContent = "Selecione um usuário";
    mensagem.style.color = "red";
    return;
  }
  if (!tarefa.descricao) {
    mensagem.textContent = "Preencha a descrição da tarefa";
    mensagem.style.color = "red";
    return;
  }
  if (!tarefa.setor) {
    mensagem.textContent = "Preencha o setor";
    mensagem.style.color = "red";
    return;
  }
  if (!tarefa.prioridade) {
    mensagem.textContent = "Selecione a prioridade";
    mensagem.style.color = "red";
    return;
  }

  try {
    const resposta = await fetch("/api/tarefas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tarefa)
    });

    const dados = await resposta.json();

    if (!resposta.ok) throw new Error(dados.erro || "Erro ao cadastrar tarefa");

    mensagem.textContent = "Tarefa cadastrada com sucesso!";
    mensagem.style.color = "green";

    form.reset();
    usuarioSelect.value = ""; // Reset do select
  } catch (erro) {
    mensagem.textContent = erro.message;
    mensagem.style.color = "red";
    console.error("Erro ao cadastrar tarefa:", erro);
  }
});