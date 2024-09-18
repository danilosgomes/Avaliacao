import { useState, useEffect } from "react";
import ServiceAluno from "../services/ServiceAluno";
import { Link } from "react-router-dom";
import "../css/Style.css"

export function ListarAlunos() {
  const [alunosDB, setAlunosDB] = useState([]);
  const [atualizar, setAtualizar] = useState(false);
  const [aplicarCores, setAplicarCores] = useState(false);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const serviceAluno = new ServiceAluno();
        const res = await serviceAluno.getAlunos();
        setAlunosDB(res.data);
      } catch (error) {
        console.error("Erro ao buscar os alunos:", error);
      }
    };

    fetchAlunos();
  }, [atualizar]);

  const handleDelete = async (id) => {
    const serviceAluno = new ServiceAluno();
    setAtualizar(false);
    if (window.confirm("Tem certeza que deseja deletar esse aluno?")) {
      try {
        const res = await serviceAluno.deleteAluno(id);
        console.log(res);
        alert("Aluno deletado com sucesso!");
        setAlunosDB(alunosDB.filter((aluno) => aluno.id !== id));
        setAtualizar(true);
      } catch (error) {
        console.error("Erro ao deletar o aluno:", error);
        alert("Erro ao deletar o aluno!");
      }
    }
  };

  const calcularMediaIRA = () => {
    if (alunosDB.length === 0) return 0;
    const somaIRA = alunosDB.reduce(
      (acc, aluno) => acc + parseFloat(aluno.ira),
      0
    );
    return (somaIRA / alunosDB.length).toFixed(2);
  };

  const altColor = () => {
    setAplicarCores(!aplicarCores);
  };

const obterCorLinha = (ira) => {
  if (!aplicarCores) return "";

  const media = calcularMediaIRA();
  console.log(`IRA: ${ira}, Média: ${media}`);

  if (Number(ira) < Number(media)) {
    return "border border-2 border-danger table-danger";
  }
  if (Number(ira) > Number(media)) {
    return "border border-2 border-success table-success";
  }

  return ""; // Retorna uma string vazia se o IRA for igual à média
};


  return (
    <div className="mx-auto p-4">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Curso</th>
            <th scope="col">IRA</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {alunosDB.map((aluno) => (
            <tr
              key={aluno.id}
              className={obterCorLinha(aluno.ira)}
            >
              <th scope="row">{aluno.id}</th>
              <td>{aluno.nome}</td>
              <td>{aluno.curso}</td>
              <td>{aluno.ira}</td>
              <td>
                <div>
                  <Link
                    to={`/editar-aluno/${aluno.id}`}
                    className="btn btn-primary mx-2"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(aluno.id)}
                    className="btn btn-danger ml-4"
                  >
                    Deletar
                  </button>
                </div>
              </td>
            </tr>
          ))}
          <tr>
            <td className="table-info" colSpan="3">
              Média IRA:
            </td>
            <td className="table-info">{calcularMediaIRA()}</td>
            <td className="table-info"></td>
          </tr>
        </tbody>
      </table>
      <button onClick={altColor} className="btn btn-secondary mb-3">
        {aplicarCores ? "Remover Cores" : "Aplicar Cores"}
      </button>
    </div>
  );
}
