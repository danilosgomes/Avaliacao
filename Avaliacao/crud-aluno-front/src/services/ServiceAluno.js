import axios from 'axios';

const url = "http://localhost:3002/aluno";

class ServiceAluno{
    
        getAlunos(){
            return axios.get(url + '/listar');
        }
    
        getAlunoById(alunoId){
            return axios.get(url + '/buscar/' + alunoId);
        }
    
        createAluno(aluno){
            return axios.post(url + '/criar-aluno', aluno);
        }
    
        updateAluno(aluno){
            return axios.put(url + '/atualizar', aluno);
        }
    
        deleteAluno(alunoId){
            return axios.delete(url + '/deletar/' + alunoId);
        }
    }


export default ServiceAluno