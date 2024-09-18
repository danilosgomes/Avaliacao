import { useState, useEffect } from "react";
import ServiceAluno from "../services/ServiceAluno";

export function ListarAlunosPorCurso() {
  const [alunosDB, setAlunosDB] = useState([]);
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
  }, []);

  const alunosPorCurso = alunosDB.reduce((acc, aluno) => {
    if (!acc[aluno.curso]) {
      acc[aluno.curso] = [];
    }
    acc[aluno.curso].push(aluno);
    return acc;
  }, {});

  const alternarCores = () => {
    setAplicarCores(!aplicarCores);
  };

  const obterCorLinha = (ira) => {
    if (!aplicarCores) return "";

    if (Number(ira) < 7)
      return "border border-2 border-danger table-danger";

    return "border border-2 border-success table-success";
  };

  return (
    <div className="mx-auto p-4">
      <h2>Alunos Agrupados por Curso</h2>

      {Object.keys(alunosPorCurso).map((curso) => (
        <div key={curso} className="mb-4">
          <table className="table table-hover" colSpan="3">
            <thead>
              <tr>
                <th className="table-secondary">{curso}</th>
                <th className="table-secondary"></th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nome</th>
                <th scope="col">IRA</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {alunosPorCurso[curso].map((aluno) => (
                <tr key={aluno.id} className={obterCorLinha(aluno.ira)}>
                  <th scope="row">{aluno.id}</th>
                  <td>{aluno.nome}</td>
                  <td>{aluno.ira}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <button onClick={alternarCores} className="btn btn-secondary mb-3">
        {aplicarCores ? "Remover Cores" : "Aplicar Cores"}
      </button>
    </div>
  );
}
