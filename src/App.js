import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Jogo from './pages/Jogo';
import Feedback from './pages/Feedback';
import Configurações from './pages/Configurações';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/jogo" component={ Jogo } />
        <Route path="/config" component={ Configurações } />
        <Route path="/feedback" component={ Feedback } />
      </Switch>
    </div>
  );
}
