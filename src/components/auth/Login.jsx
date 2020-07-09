import React, { useState, useContext, useEffect } from 'react'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/authorization/authContext'
import { Link } from 'react-router-dom'

const Login = props => {

    const alertContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertContext;

    const authContext = useContext(AuthContext);
    const { autenticado, mensaje, iniciarSesion } = authContext;

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
        email: '',
        password: ''
    })

    const { email, password } = user;

    const handlerIniciarSesion = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(email.trim() ==='' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios.', 'alerta-error')
            return;
        }

        iniciarSesion({email, password});
    }
    return ( 
        <div className="form-usuario">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesion</h1> 

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            placeholder="Ingrese su correo electrónico"
                            className="input-email"
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
                            className="input-password"
                            onChange={handlerIniciarSesion}
                        />
                    </div>

                    <div>
                        <input type="submit" className="btn btn-block btn-primario" value="Iniciar Sesión"/>
                    </div>
                </form>

                <Link
                    to={'/nueva-cuenta'} 
                    className="enlace-cuenta"
                >
                    Obtener Cuenta
                </Link>

            </div>
        </div>
     );
}
 
export default Login;