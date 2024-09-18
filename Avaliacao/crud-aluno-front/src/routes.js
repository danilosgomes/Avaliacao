import { createBrowserRouter } from 'react-router-dom';

import { Home }from './pg/Home';
import { CriarAluno } from './pg/CriarAluno';
import { EditarAluno }from './pg/EditarAluno';
import { ListarAlunos } from './pg/ListarAlunos';
import { DeletarAluno } from './pg/DeletarAluno';
import { ListarAlunosPorCurso } from './pg/ListarAlunosPorCurso';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        children: [
            {
                path: 'criar-aluno',
                element: <CriarAluno />
            },
            {
                path: 'editar-aluno/:id',
                element: <EditarAluno />
            },
            {
                path: 'listar-alunos',
                element: <ListarAlunos />
            },
            {
                path: '/listar-alunos-por-curso',
                element: <ListarAlunosPorCurso />
            }
        ]
    }
]);