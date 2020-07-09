import React, { Fragment, useContext } from 'react'
import Tareas from './Tareas'
import ProyectoContext from '../../context/projects/projectContext'
import TareaContext from '../../context/tasks/taskContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ListadoTareas = () => {

    const projectContext = useContext(ProyectoContext);
    const { proyecto, eliminarProyecto } = projectContext;

    const taskContext = useContext(TareaContext);
    const { tareasProyecto } = taskContext;

    if(!proyecto) {
        return <h2>Seleccione un proyecto</h2>
    }

    // Array destructuring para extraer el proyecto actual
    const [ proyectoActual ] = proyecto;

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                {
                    tareasProyecto.length === 0 ?
                    (
                        <li className="tarea">
                            <p>No hay tareas</p>
                        </li>
                    ) :
                    <TransitionGroup>
                        {
                            tareasProyecto.map(tarea => (
                                <CSSTransition
                                    key={tarea._id}
                                    timeout={300}
                                    classNames="tarea"
                                >
                                    <Tareas
                                        tarea={tarea}
                                    />
                                </CSSTransition>
                            ))
                        }          
                    </TransitionGroup>          
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={() => eliminarProyecto(proyectoActual._id)}
            >Eliminar Proyecto &times;</button>
        </Fragment>
    );
}
 
export default ListadoTareas;