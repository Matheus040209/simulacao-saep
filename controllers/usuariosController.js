const usuariosService = require("../services/usuariosService");

async function criarUsuario(req, res) {

    try {

        const { nome, email } = req.body;

        const usuario = await usuariosService.criarUsuario(nome, email);

        res.status(201).json({
            mensagem: "Usuário criado com sucesso",
            usuario
        });

    } catch (erro) {

        res.status(400).json({
            erro: erro.message
        });

    }

}

async function criarTarefa(req, res) {
    try {
        const { usuarioId, descricao, setor, prioridade, status } = req.body;

        const tarefa = await usuariosService.criarTarefa(
            usuarioId,
            descricao,
            setor,
            prioridade,
            status
        );

        res.status(201).json({
            mensagem: "Tarefa criada com sucesso",
            tarefa
        });

    } catch (erro) {
        res.status(400).json({
            erro: erro.message
        });
    }
}

async function listarUsuarios(req, res) {

    const usuarios = await usuariosService.listarUsuarios();


    res.json(usuarios);

}

async function listarTarefas(req, res) {
    const tarefas = await usuariosService.listarTarefas();


    res.json(tarefas);
}

module.exports = {
    criarUsuario,
    criarTarefa,
    listarUsuarios,
    listarTarefas
};