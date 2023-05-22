export const SAVE_USERNAME = 'SAVE_USERNAME';

export const saveUserInfo = (playerName, email) => ({
  type: SAVE_USERNAME,
  playerName,
  email,
});
