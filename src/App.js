import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './components/auth/Login'
import NuevaCuenta from './components/auth/NuevaCuenta'  
import Proyectos from './components/projects/Proyectos'
import RutaPrivada from './components/ruta/RutaPrivada'

import ProyectoState from './context/projects/projectState'
import TareaState from './context/tasks/taskState'
import AlertaState from './context/alertas/alertaState'
import AuthState from './context/authorization/authState'
import TokenAuth from './config/token'

// Revisar si existe un token
const token = localStorage.getItem('token')
if(token) {
  TokenAuth(token)
}

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
