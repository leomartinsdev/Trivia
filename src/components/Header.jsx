import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    console.log(typeof score);
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
          alt="Gravatar"
        />
        <span data-testid="header-player-name">
          Username:
          {' '}
          {name}
        </span>
        <span>
          <p>
            Placar:
            {' '}
            <p data-testid="header-score">{ score }</p>

          </p>
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = ({
  playerName: propTypes.string,
}).isRequired;

export default connect(mapStateToProps)(Header);
