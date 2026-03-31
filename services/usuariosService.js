const pool = require("../database/db");

async function criarUsuario(nome, email) {

    if (!nome || nome.trim() === "") {
        throw new Error("Nome é obrigatório");
    }

    const resultado = await pool.query(
        `
        INSERT INTO usuarios (nome, email)
        VALUES ($1, $2)
        RETURNING *
        `,
        [nome, email]
    );

    return resultado.rows[0];

}

async function criarTarefa(usuarioId, descricao, setor, prioridade, status) {
    const resultado = await pool.query(
        `
        INSERT INTO tarefa (id, descricao, setor, prioridade, status)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
        [usuarioId, descricao, setor, prioridade, status]  
    );

    return resultado.rows[0];
}

async function listarTarefas() {
    const resultado = await pool.query(
        "SELECT * FROM tarefa ORDER BY id"
    );

    return resultado.rows;
}

async function listarUsuarios() {

    const resultado = await pool.query(
        "SELECT * FROM usuarios ORDER BY id"
    );

    return resultado.rows;
}

module.exports = {
    criarUsuario,
    criarTarefa,
    listarUsuarios,
    listarTarefas
};