import React, { Fragment, useState, useContext } from 'react'
import ProyectoContext from '../../context/projects/projectContext'

const NuevoProyecto = () => {

    const projectContext = useContext(ProyectoContext);
    const { formulario, mostrarFormulario, agregarProyecto, errorFormulario, mostrarError } = projectContext;

    const [ proyecto, setProyecto ] = useState({
        nombre: ''
    });

    const { nombre } = proyecto;

    const onChangeProyecto = e => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    };

    const onSubmitProyecto = e => {
        e.preventDefault();

        if(nombre.trim() === '') {
            mostrarError();
            return;
        }

        agregarProyecto(proyecto)

        setProyecto({
            nombre: ''
        })
    }

    const onClickFormulario = () => {
        mostrarFormulario();
        
    }
    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={onClickFormulario}
            >
                Nuevo Proyecto
            </button>

            {
                formulario
                ?
                (
                    <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSubmitProyecto}
                    >
                        <input 
                            type="text" 
                            name="nombre" 
                            className="input-text"
                            placeholder="Nombre del Proyecto"
                            value={nombre}
                            onChange={onChangeProyecto}
                        />
                        
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block"
                            value="Agregar Proyecto"
                        />
                    </form>
                )
                : null
            }

            {
                errorFormulario ? <p className="mensaje error">El Nombre del Proyecto es obligatorio</p> : null
            }

        </Fragment>
     );
}
 
export default NuevoProyecto;