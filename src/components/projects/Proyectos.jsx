import React, { useContext, useEffect } from 'react'
import SideBar from '../layout/Sidebar'
import Barra from '../layout/Barra'
import FormTarea from '../tasks/FormTareas'
import ListadoTareas from '../tasks/ListadoTareas'
import AuthContext from '../../context/authorization/authContext'

const Proyectos = () => {

    const authContext = useContext(AuthContext);
    const {usuarioAutenticado} = authContext

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);

    return ( 
        <div className="contenedor-app">
            <SideBar />
            <div className="seccion-principal">
                <Barra />
                
                <main>
                    <FormTarea />
                    <div className="contenedor-tareas">
                        <ListadoTareas />
                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Proyectos;