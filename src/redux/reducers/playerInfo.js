import { SAVE_USERNAME } from '../actions';

const INITIAL_STATE = {
  playerName: '',
  email: '',
};

const playerInfo = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USERNAME:
    return {
      ...state,
      playerName: action.playerName,
      email: action.email,
    };
  default:
    return state;
  }
};

export default playerInfo;
