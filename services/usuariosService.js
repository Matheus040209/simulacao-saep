const pool = require("../database/db");

async function criarUsuario(nome, email) {
    if (!nome || nome.trim() === "") throw new Error("Nome é obrigatório");
    if (!email || email.trim() === "") throw new Error("Email é obrigatório");
    if (!email.includes("@")) throw new Error("Email inválido");

    const resultado = await pool.query(
        `INSERT INTO usuarios (nome, email)
         VALUES ($1, $2)
         RETURNING *`,
        [nome, email]
    );

    return resultado.rows[0];
}

async function criarTarefa(id_usuario, descricao, setor, prioridade, status = "a fazer") {
    if (!id_usuario) throw new Error("Usuário é obrigatório");
    if (!descricao || descricao.trim() === "") throw new Error("Descrição é obrigatória");
    if (!setor || setor.trim() === "") throw new Error("Setor é obrigatório");
    if (!prioridade || prioridade.trim() === "") throw new Error("Prioridade é obrigatória");

    const resultado = await pool.query(
        `INSERT INTO tarefa (id_usuario, descricao, setor, prioridade, status)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [id_usuario, descricao, setor, prioridade, status]
    );

    return resultado.rows[0];
}

async function listarTarefas() {
    const resultado = await pool.query(
        `SELECT 
        t.id_tarefa,
        t.id_usuario,
        u.nome AS nome_usuario,
        t.descricao,
        t.setor,
        t.prioridade,
        t.status
    FROM tarefa t
    JOIN usuarios u ON t.id_usuario = u.id_usuario
    ORDER BY t.id_tarefa;`
    );

    return resultado.rows;
}

async function listarUsuarios() {
    const resultado = await pool.query(
        "SELECT * FROM usuarios ORDER BY id_usuario"
    );
    return resultado.rows;
}

module.exports = {
    criarUsuario,
    criarTarefa,
    listarUsuarios,
    listarTarefas
};