import React, { useReducer } from 'react'

import ProyectoContext from './projectContext'
import ProyectoReducer from './projectReducer'
import { 
        FORMULARIO_PROYECTO,
        LISTADO_PROYECTO,
        AGREGAR_PROYECTO,
        PROYECTO_ERROR,
        MOSTRAR_ERROR,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO
    } from '../../types'

import clienteAxios from '../../config/axios'

const ProyectoState = props => {

    const initialState = {
        proyectos: [],
        formulario: false,
        errorFormulario: false,
        proyecto: null,
        mensaje: null
    }

    const [ state, dispatch ] = useReducer(ProyectoReducer, initialState);
    
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    const obtenerProyectos = async () => {
        try {
            
            const result = await clienteAxios.get('/api/proyectos');
            dispatch({
                type: LISTADO_PROYECTO,
                payload: result.data.proyectos
            })

        } catch (error) {
            const alerta = ({
                msg: 'Hubo error mientras se eliminaba el proyecto',
                categoria: 'alerta-error'
            })

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    const agregarProyecto = async proyecto => {

        try {
            
            const resultado = await clienteAxios.post('/api/proyectos', proyecto)
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = ({
                msg: 'Hubo error mientras se eliminaba el proyecto',
                categoria: 'alerta-error'
            })

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    const mostrarError = () => {
        dispatch({
            type: MOSTRAR_ERROR
        })
    }

    const mostrarProyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    const eliminarProyecto = async proyectoId => {
        try {
            
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {
            
            const alerta = ({
                msg: 'Hubo error mientras se eliminaba el proyecto',
                categoria: 'alerta-error'
            })

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })

        }
       
    }

    return ( 
        <ProyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorFormulario: state.errorFormulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                mostrarProyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </ProyectoContext.Provider>
    );
}

export default ProyectoState;