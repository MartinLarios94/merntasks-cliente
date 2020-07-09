import { 
    TAREAS_PROYECTOS,
    AGREGAR_TAREAS,
    ERROR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    EDITAR_TAREA
} from '../../types'

export default (state, action) => {
    switch(action.type) {
        case TAREAS_PROYECTOS: {
            return {
                ...state,
                tareasProyecto: action.payload
            }
        }
        case AGREGAR_TAREAS: {
            return {
                ...state,
                tareasProyecto: [...state.tareasProyecto, action.payload],
                errorTarea: false
            }
        }
        case ERROR_TAREA : {
            return {
                ...state,
                errorTarea: true
            }
        }
        case ELIMINAR_TAREA: {
            return {
                ...state,
                tareasProyecto: state.tareasProyecto.filter(tarea => tarea._id !== action.payload)
            }
        }
        case EDITAR_TAREA : {
            return {
                ...state,
                tareas: state.tareasProyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea),
                tareaSeleccionada: null
            }
        }
        case TAREA_ACTUAL: {
            return {
                ...state,
                tareaSeleccionada: action.payload
            }
        }
        default:
            return state
    }
}