import React, { useReducer } from 'react';
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import clienteAxios from '../../config/axios'
import TokenAuth from '../../config/token'

import { 
    REGISTRO_ERROR, 
    REGISTRO_EXITOSO, 
    OBTENER_USUARIO, 
    LOGIN_ERROR, 
    LOGIN_EXITOSO, 
    CERRAR_SESION 
} from '../../types'

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // registro de Usuarios Nuevos
    const registrarUsuario = async datos => {
        try {
            
            const respuesta = await clienteAxios.post('api/usuarios', datos);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            })

            // Obtener el usuario autenticado
            usuarioAutenticado();
        } catch (error) {

            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    // Retorna el usuario creado
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            // TODO: Funcion para enviar el token por headers
            TokenAuth(token);
        }

        try {
            const respuesa = await clienteAxios.get('api/auth'); //mandamos a consultar el api para trar el usuario

            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesa.data.usuario
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    // Inicio de Sesión
    const iniciarSesion = async datos => {
        try {

            const respuesta = await clienteAxios.post('/api/auth', datos);
                        
            dispatch({
                type:LOGIN_EXITOSO,
                payload: respuesta.data
            })
            // Obtener el usuario autenticado
            usuarioAutenticado();
        } catch (error) {
            console.log(error.response.data.msg);
            
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    // Cerrar Sesion
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return ( 
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario, 
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthState;