import React, { useReducer } from 'react'
import TareaContext from './taskContext'
import TareaReducer from './taskReducer'

import clienteAxios from '../../config/axios'

import { 
    TAREAS_PROYECTOS, 
    AGREGAR_TAREAS,
    ERROR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    EDITAR_TAREA
} from '../../types'

const TareaState = props => {

    const initialState = {
        tareasProyecto: [],
        errorTarea: false,
        tareaSeleccionada: null
    }

    const [ state, dispatch ] = useReducer(TareaReducer, initialState)

    const seleccionarTareas = async proyectoId => {
        try {
            
            const result = await clienteAxios.get('/api/tareas', { params: { proyectoId } });            
            dispatch({
                type: TAREAS_PROYECTOS,
                payload: result.data.tareas,
                errorTarea: false
            })

        } catch (error) {
            console.log(error)
        }
    }

    const agregarTareas = async tarea => {
        try {
            
            const result = await clienteAxios.post('/api/tareas', tarea)
            dispatch({
                type: AGREGAR_TAREAS,
                payload: result.data
            })

        } catch (error) {
            console.log(error)
        }
    }

    const mostrarError = () => {
        dispatch({
            type: ERROR_TAREA
        })
    }

    const eliminarTarea = async (tareaId, proyectoId) => {
        try {
            
            await clienteAxios.delete(`/api/tareas/${tareaId}`, { params: { proyectoId } })

            dispatch({
                type: ELIMINAR_TAREA,
                payload: tareaId
            })

        } catch (error) {
            console.log(error);
            
        }
    }

    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    const actualizarTarea = async tarea => {
        try {
            const result = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)            
            dispatch({
                type: EDITAR_TAREA,
                payload: result.data.tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <TareaContext.Provider
            value={{
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                seleccionarTareas,
                agregarTareas, 
                mostrarError,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea
            }}
        >

            {props.children}
        </TareaContext.Provider>
     );
}
 
export default TareaState;