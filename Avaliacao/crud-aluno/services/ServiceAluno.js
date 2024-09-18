const ModelAluno = require("../models/modelAluno");
const alunos = require("../data/db");

class ServiceAluno {
  static listar() {
    return alunos;
  }

  static adicionar(aluno) {
    const id = alunos.length + 1;
    aluno.id = id;
    alunos.push(aluno);
    return aluno;
  }

  static buscarPorId(id) {
    return alunos.find((aluno) => aluno.id == id);
  }

  static atualizar(aluno) {
    const index = alunos.findIndex((a) => a.id == aluno.id);
    alunos[index] = aluno;
    return aluno;
  }

  static deletar(id) {
    const index = alunos.findIndex((a) => a.id == id);
    alunos.splice(index, 1);
  }
}

module.exports = ServiceAluno;
