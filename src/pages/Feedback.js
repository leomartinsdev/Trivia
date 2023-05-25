import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

const minAssertions = 3;

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {
            assertions >= minAssertions
              ? 'Well Done!'
              : 'Could be better...'
          }
        </p>
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  userName: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
