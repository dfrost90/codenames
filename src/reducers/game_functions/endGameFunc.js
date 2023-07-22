export const endGameFunc = (state) => {
  sessionStorage.removeItem('game');
  sessionStorage.removeItem('player');

  return {
    ...state,
    status: 'finished',
    timestamp: Date.now(),
  };
};
