import React, { useContext } from 'react'
import TareaContext from '../../context/tasks/taskContext'
import ProyectoContext from '../../context/projects/projectContext'

const Tareas = ({tarea}) => {

    const taskContext = useContext(TareaContext);
    const { eliminarTarea, seleccionarTareas, actualizarTarea, guardarTareaActual } = taskContext;

    const projectContext = useContext(ProyectoContext);
    const { proyecto } = projectContext;

    const [proyectoActual] = proyecto;

    // Fn para eliminar una tarea mediante un id

    const onClickEliminarTarea = id => {
        eliminarTarea(id, proyectoActual._id)
        seleccionarTareas(proyectoActual._id)
    }

    // FN para cambiar el estado de la tarea
    const handleEstadoTarea = tarea => {
        if(tarea.estado) {
            tarea.estado = false
        } else {
            tarea.estado = true
        }
        actualizarTarea(tarea);
    }

    // Fn para obtener la tarea a editar
    const handleTareaActual = tarea => {
        guardarTareaActual(tarea)
    }
    
    return (         
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>

            <div className="estado">
                {
                    tarea.estado 
                    ?
                    (
                        <button
                            type="button"
                            className="completo"
                            onClick={() => handleEstadoTarea(tarea)}
                        >Completo</button>
                    )
                    :
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => handleEstadoTarea(tarea)}
                        >Incompleto</button>
                    )
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => handleTareaActual(tarea)}
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => onClickEliminarTarea(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tareas;