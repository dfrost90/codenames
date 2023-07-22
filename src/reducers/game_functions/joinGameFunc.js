import { checkURL } from '../../utils/utils';

export const joinGameFunc = (state, payload, uid) => {
  const { team, host, color } = payload;

  const checkTeam = (team) => {
    const playersArr = Object.keys(state.teams[team].players).map((player) => ({
      ...state.teams[team].players[player],
    }));

    return playersArr.map((player) => player.uid === uid).includes(true);
  };

  if (checkTeam('red') || checkTeam('blue')) {
    return {
      ...state,
    };
  }

  if (checkURL('roomId')) {
    state.roomId = checkURL('roomId');
  }

  return {
    ...state,
    teams: {
      ...state.teams,
      [team]: {
        ...state.teams[team],
        players: {
          ...state.teams[team].players,
          [Object.keys(state.teams[team].players).length]: {
            uid,
            host,
            color,
          },
        },
      },
    },
    timestamp: Date.now(),
  };
};
