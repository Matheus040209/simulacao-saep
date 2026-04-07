const express = require("express");
const app = express();
const usuariosController = require('./controllers/usuariosController');

app.use(express.static('public'));
app.use(express.json());

const PORT = 3000;

  app.post('/api/usuarios', usuariosController.criarUsuario);

  app.get('/api/usuarios', usuariosController.listarUsuarios);

  app.post('/api/tarefas', usuariosController.criarTarefa);

  app.get('/api/tarefas', usuariosController.listarTarefas);

  app.put('/api/tarefas/:id', usuariosController.editarTarefas);

  app.delete('/api/tarefas/:id', usuariosController.excluirTarefas);



  app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});

