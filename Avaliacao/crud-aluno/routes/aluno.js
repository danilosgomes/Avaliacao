var express = require("express");
var router = express.Router();

const ServiceAluno = require('../services/ServiceAluno')

router.get("/listar", (req, res, next) => { 
  res.json(ServiceAluno.listar());
});

router.post("/criar-aluno", (req, res, next) => {
  const aluno = req.body;
  res.json(ServiceAluno.adicionar(aluno));
});

router.get("/buscar/:id", (req, res, next) => {
  const id = req.params.id;
  res.json(ServiceAluno.buscarPorId(id));
});

router.put("/atualizar", (req, res, next) => {
  const aluno = req.body;
  res.json(ServiceAluno.atualizar(aluno));
});

router.delete("/deletar/:id", (req, res, next) => {
  const id = req.params.id;
  ServiceAluno.deletar(id);
  res.json({ message: "Aluno deletado." });
});

module.exports = router;
