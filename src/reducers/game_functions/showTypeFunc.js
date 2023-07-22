export const showTypeFunc = (state, payload) => {
  const value = payload.value;

  const allWords = Object.keys(state.words).map((word) => {
    if (state.words[word].value === value) {
      state.words[word].showType = true;

      if (state.words[word].type === 'black') {
        state.winner = state.currentTeam === 'blue' ? 'red' : 'blue';
      }
    }

    return {
      ...state.words[word],
    };
  });

  const redTeamWords = allWords.filter((word) => word.type === 'red');
  const blueTeamWords = allWords.filter((word) => word.type === 'blue');

  if (!redTeamWords.find((word) => !word.showType)) {
    state.winner = 'red';
  }

  if (!blueTeamWords.find((word) => !word.showType)) {
    state.winner = 'blue';
  }

  return {
    ...state,
    words: [...state.words],
    timestamp: Date.now(),
  };
};
