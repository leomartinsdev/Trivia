import React, { Component } from 'react';
import propTypes from 'prop-types';

class Login extends Component {
  state = {
    disabled: true,
    email: '',
    playerName: '',
  };

  validation = () => {
    const { email, playerName } = this.state;
    const validEmail = email.length > 0;
    const validName = playerName.length > 0;

    this.setState({
      disabled: !(validEmail && validName),
    });
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.validation);
  };

  onClickBtn = async () => {
    const { history } = this.props;
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    const { token } = data;
    localStorage.setItem('token', token);
    history.push('/jogo');
  };

  render() {
    const { disabled, playerName, email } = this.state;
    const { history } = this.props;
    return (
      <div>
        Login
        <input
          name="playerName"
          value={ playerName }
          type="text"
          onChange={ this.onInputChange }
          data-testid="input-player-name"
        />
        <input
          name="email"
          value={ email }
          type="email"
          onChange={ this.onInputChange }
          data-testid="input-gravatar-email"
        />
        <button
          type="button"
          disabled={ disabled }
          data-testid="btn-play"
          onClick={ this.onClickBtn }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/config') }
        >
          Configurações
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default Login;
