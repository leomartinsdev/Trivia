import { SAVE_USERNAME, TOTAL_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USERNAME:
    return {
      ...state,
      name: action.playerName,
      gravatarEmail: action.email,
    };
  case TOTAL_SCORE:
    return {
      ...state,
      score: state.score + action.points, // acumula a pontuação
    };
  default:
    return state;
  }
};

export default player;
