import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Jogo from './pages/Jogo';

export default function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
      </header> */}
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/jogo" component={ Jogo } />
      </Switch>
    </div>
  );
}
