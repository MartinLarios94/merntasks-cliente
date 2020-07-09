import { 
    FORMULARIO_PROYECTO, 
    LISTADO_PROYECTO, 
    AGREGAR_PROYECTO ,
    MOSTRAR_ERROR,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
} from '../../types'

export default (state, action) => {
    switch(action.type) {
        case FORMULARIO_PROYECTO: 
            return {
                ...state,
                formulario: true
            }
        case LISTADO_PROYECTO:
            return {
                ...state,
                proyectos: action.payload
            }
        case AGREGAR_PROYECTO:
            return {
                ...state,
                proyectos: [action.payload, ...state.proyectos],
                formulario: false,
                errorFormulario: false
            }
        case MOSTRAR_ERROR:
            return {
                ...state,
                errorFormulario: true
            }
        case PROYECTO_ACTUAL: 
            return {
                ...state,
                proyecto: state.proyectos.filter(proyecto => proyecto._id === action.payload) 
            }
        case ELIMINAR_PROYECTO: 
            return {
                ...state,
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                proyecto: null
            }
        case PROYECTO_ERROR: {
            return {
                ...state,
                mensaje: action.payload
            }
        }
        default:
            return state;
    }
}