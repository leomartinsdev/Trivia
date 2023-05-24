import { combineReducers } from 'redux';
import playerInfo from './playerInfo';

const rootReducer = combineReducers({
  player: playerInfo,
});
export default rootReducer;
