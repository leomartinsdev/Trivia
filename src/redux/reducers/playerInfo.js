import { SAVE_USERNAME } from '../actions';

const INITIAL_STATE = {
  player: {
    name:'',
    gravatarEmail:'',
  }
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USERNAME:
    return {
      ...state,
      player:{
        name: action.playerName,
        gravatarEmail: action.email},
    };
  default:
    return state;
  }
};

export default player;
