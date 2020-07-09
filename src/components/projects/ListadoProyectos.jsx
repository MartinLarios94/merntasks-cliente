import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import ProyectoContext from '../../context/projects/projectContext'
import AlertaContext from '../../context/alertas/alertaContext'
  
const ListadoProyectos = () => {

    // Extraer proyectos desde el context
    const context = useContext(ProyectoContext);
    const { mensaje, proyectos, obtenerProyectos } = context;

    // Extraer alerta del context de alertas
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext

    useEffect(() => {

        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

        obtenerProyectos();
        //eslint-disable-next-line
    }, [mensaje])

    // validar si arreglo es null
    if(proyectos.length === 0) return <p>No hay proyectos</p>;
    return ( 
        <ul className="listado-proyectos">
            { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ) : null }
            <TransitionGroup>
            {
                proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto._id}
                        timeout={300}
                        classNames="proyecto"
                    >
                        <Proyecto 
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))
            }
            </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;