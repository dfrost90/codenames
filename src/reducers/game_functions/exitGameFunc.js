export const exitGameFunc = (state, payload) => {
  const { team, uid } = payload;

  localStorage.removeItem('game');
  localStorage.removeItem('player');

  return {
    ...state,
    teams: {
      ...state.teams,
      [team]: {
        players: {
          ...state.teams[team].players.filter((player) => player.uid !== uid),
        },
      },
    },
    timestamp: Date.now(),
  };
};
