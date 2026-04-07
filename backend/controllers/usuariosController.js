const usuariosService = require("../services/usuariosService");

async function criarUsuario(req, res) {
    try {
        const { nome, email } = req.body;
        const usuario = await usuariosService.criarUsuario(nome, email);
        res.status(201).json({ mensagem: "Usuário criado com sucesso", usuario });
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
}

async function criarTarefa(req, res) {
    try {
        const { id_usuario, descricao, setor, prioridade, status } = req.body;
        const tarefa = await usuariosService.criarTarefa(
            id_usuario,
            descricao,
            setor,
            prioridade,
            status
        );
        res.status(201).json({ mensagem: "Tarefa criada com sucesso", tarefa });
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
}

async function listarUsuarios(req, res) {
    try {
        const usuarios = await usuariosService.listarUsuarios();
        res.json(usuarios);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}

async function listarTarefas(req, res) {
    try {
        const tarefas = await usuariosService.listarTarefas();
        res.json(tarefas);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}

async function editarTarefas(req, res) {
    try {
        const { id } = req.params;
        const { descricao, setor, prioridade, status } = req.body;

        const tarefa = await usuariosService.editarTarefas(
            id,
            descricao,
            setor,
            prioridade,
            status
        );

        res.json(tarefa);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}

async function excluirTarefas(req, res) {
    try {
        const { id } = req.params;

        const tarefa = await usuariosService.excluirTarefas(id);

        res.json({
            mensagem: "Tarefa excluída com sucesso",
            tarefa
        });
    } catch (erro) {
        res.status(400).json({ erro: erro.message });
    }
}

module.exports = {
    criarUsuario,
    criarTarefa,
    listarUsuarios,
    listarTarefas,
    editarTarefas,
    excluirTarefas
};