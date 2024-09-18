import ServiceAluno from "../services/ServiceAluno";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


export function EditarAluno() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [curso, setCurso] = useState('');
    const [ira, setIra] = useState('');

    useEffect(() => {
        const fetchAluno = async () => {
            try {
                const serviceAluno = new ServiceAluno();
                const res = await serviceAluno.getAlunoById(id);
                setNome(res.data.nome);
                setCurso(res.data.curso);
                setIra(res.data.ira);
            } catch (error) {
                console.error("Erro ao buscar o aluno:", error);
            }
        };

        fetchAluno();
    }, [id]);

    function handleSubmit(e) {
        e.preventDefault();
        const serviceAluno = new ServiceAluno();
        serviceAluno.updateAluno({ id, nome, curso, ira })
            .then(res => {
                console.log(res.data);
                alert('Aluno atualizado com sucesso!');
                navigate('/listar-alunos');
            })
            .catch(err => {
                console.error(err);
                alert('Erro ao atualizar aluno!');
            }
        );
    }

    return (
       <div>
            <h1 style={{width: 540, marginLeft: 16, marginBottom: 4}}>Criar Aluno</h1>
            <form className="form-content" onSubmit={handleSubmit}>
                <div style={{width: 540, marginLeft: 16, marginBottom: 4}}>
                    <label className="form-label" htmlFor="inputNome">Nome:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={nome} 
                        onChange={(e) => setNome(e.target.value)} 
                        id="inputNome"
                    />
                </div>
                <div style={{width: 540, marginLeft: 16, marginBottom: 4}}>
                    <label className="form-label" htmlFor="inputCurso">Curso:</label>
                    <input 
                        type="text" 
                        className='form-control' 
                        value={curso} 
                        onChange={(e) => setCurso(e.target.value)} 
                        id="inputCurso"
                    />
                </div>
                <div style={{width: 540, marginLeft: 16, marginBottom: 4}}>
                    <label className="form-label" htmlFor="inputIRA">IRA:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={ira} 
                        onChange={(e) => setIra(e.target.value)} 
                        id="inputIRA"
                    />
                </div>
                <button  style={{marginTop: 16, marginLeft: 16}} className="btn btn-primary" type="submit">Atualizar</button>
            </form>
        </div>
    );
}
