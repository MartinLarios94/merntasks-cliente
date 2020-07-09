import React, { useState, useContext, useEffect } from 'react'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/authorization/authContext'
import { Link } from 'react-router-dom'

const NuevaCuenta = (props) => {

    const alertContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertContext;

    const authContext = useContext(AuthContext);
    const { registrarUsuario, mensaje, autenticado } = authContext;

    // Validamos si la autenticacion fue exitosa o si hubo algùn error.

    useEffect(() => {
        if(autenticado) {
            props.history.push('/proyectos');
        }
        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);

    const [ user, setUser ] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar:''
    })

    const { nombre, email, password, confirmar } = user;

    const handlerIniciarSesion = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        if( nombre.trim() === '' || 
            email.trim() === '' ||
            password.trim() === '' ||
            confirmar.trim() === '' ) {
                mostrarAlerta('Todos los campos son obligatorios.', 'alerta-error')
                return;
            }

        if (password.trim().length < 6){
            mostrarAlerta('La contraseña debe tener al menos 6 caracteres.', 'alerta-error')
            return;
        }

        if ( password.trim() !== confirmar.trim() ) {
            mostrarAlerta('Las contraseñas no coinciden, intente nuevamente', 'alerta-error')
            return;
        }

        registrarUsuario({
            nombre,
            email,
            password
        })

        setUser({
            nombre: '',
            email: '',
            password: '',
            confirmar:''
        })

    }
    return ( 
        <div className="form-usuario">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Obtener nueva cuenta</h1> 

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre Completo</label>
                        <input 
                            type="text"
                            name="nombre"
                            id="nombre"
                            value={nombre}
                            placeholder="Ingrese su nombre completo"
                            onChange={handlerIniciarSesion}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            placeholder="Ingrese su correo electrónico"
                            onChange={handlerIniciarSesion}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            placeholder="Ingrese su contraseña"
                            onChange={handlerIniciarSesion}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input 
                            type="password"
                            name="confirmar"
                            id="confirmar"
                            value={confirmar}
                            placeholder="Ingrese nuevamente su contraseña. "
                            onChange={handlerIniciarSesion}
                        />
                    </div>

                    <div>
                        <input type="submit" className="btn btn-block btn-primario" value="Crear Cuenta"/>
                    </div>
                </form>

                <Link
                    to={'/'} 
                    className="enlace-cuenta"
                >
                    Volver a Iniciar Sesión
                </Link>

            </div>
        </div>
     );
}
 
export default NuevaCuenta;