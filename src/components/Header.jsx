import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { playerName, email } = this.props;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
          alt="Gravatar"
        />
        <span data-testid="header-player-name">
          Username:
          {' '}
          {playerName}
        </span>
        <span data-testid="header-score">
          Placar:
          {' '}
          { 0 }
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerName: state.playerInfo.playerName,
  email: state.playerInfo.email,
});

Header.propTypes = ({
  playerName: propTypes.string,
}).isRequired;

export default connect(mapStateToProps)(Header);
