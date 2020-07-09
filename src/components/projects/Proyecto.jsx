import React, { useContext } from 'react';
import ProyectoContext from '../../context/projects/projectContext'
import TareaContext from '../../context/tasks/taskContext'

const Proyecto = ({proyecto}) => {
    
    // Context del Proyecto
    const projectContext = useContext(ProyectoContext);
    const { mostrarProyectoActual } = projectContext;

    //Context de Tareas
    const taskContext = useContext(TareaContext);
    const { seleccionarTareas } = taskContext;

    const mostrarTareasPorProyectoId = id => {
        mostrarProyectoActual(id); // Selecciona un proyecto en base a un ID
        seleccionarTareas(id) // Selecciona las tareas pertenecientes a un proyecto en base a un Id
    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => mostrarTareasPorProyectoId(proyecto._id)}
            >
                {proyecto.nombre}
            </button>
        </li>
     );
}
 
export default Proyecto;