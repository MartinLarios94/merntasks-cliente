import React, { useContext, useState, useEffect, createRef } from 'react'
import ProyectoContext from '../../context/projects/projectContext'
import TareaContext from '../../context/tasks/taskContext'

const FormTarea = () => {

    const projectContext = useContext(ProyectoContext);
    const { proyecto } = projectContext;

    const taskContext = useContext(TareaContext);
    const { tareaSeleccionada, agregarTareas, errorTarea, mostrarError, seleccionarTareas, actualizarTarea } = taskContext;

    const [ tarea, setTarea ] = useState({
        nombre: ''
    })

    const wrapper = createRef();

    useEffect(() => {

        if(tareaSeleccionada !== null) {
            setTarea(tareaSeleccionada)
        } else {
            setTarea({
                nombre: ''
            })
        }

    }, [tareaSeleccionada])
    // Arrar Destructuring para acceder al nombre de la tarea
    const { nombre } = tarea;

    if(!proyecto) {
        return null;
    }

    const onSubmitTarea = e => {
        e.preventDefault();

        if(nombre.trim() === '') {
            mostrarError();
            return
        }
        
        if(tareaSeleccionada === null) {            
            // Agregar una nueva tarea
            tarea.proyectoId = proyecto[0]._id
            agregarTareas(tarea);
        } else {
            // Actualiza una tarea existente
            actualizarTarea(tarea)
        }


        seleccionarTareas(proyecto[0].id)
        setTarea({
            nombre: ''
        })
    }

    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    return ( 
        <div ref={wrapper} className="formulario">
            <form 
                onSubmit={onSubmitTarea}
            >
                <div className="contenedor-input">
                    <input 
                        type="text" 
                        name="nombre" 
                        className="input-text"
                        value={nombre}
                        placeholder="Nueva Tarea..."
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit" 
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaSeleccionada !== null ? "Editar Tarea" : "Agregar Tarea"}
                    />
                </div>
            </form>
            { errorTarea ? <p className="mensaje error">El nombre de la tarea es un campo obligatorio</p> : null }
        </div>
     );
}
 
export default FormTarea;