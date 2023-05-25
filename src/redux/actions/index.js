export const SAVE_USERNAME = 'SAVE_USERNAME';
export const SAVE_ASSERTIONS = 'SAVE_ASSERTIONS';

export const saveUserInfo = (playerName, email, points) => ({
  type: SAVE_USERNAME,
  playerName,
  email,
  points,
});

export const TOTAL_SCORE = 'TOTAL_SCORE';

export const saveScore = (points) => ({
  type: TOTAL_SCORE,
  points,
});

export const saveAssertions = () => ({
  type: SAVE_ASSERTIONS,
  payload: 1,
});
