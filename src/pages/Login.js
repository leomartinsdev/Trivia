import React, { Component } from 'react';

export class Login extends Component {
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

  render() {
    const { disabled, playerName, email } = this.state;
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
        >
          Play
        </button>
      </div>
    );
  }
}

export default Login;
