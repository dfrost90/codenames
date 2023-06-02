export const voteWordFunc = (state, payload) => {
  const { word, uid } = payload;

  const allWords = Object.keys(state.words).map((word) => ({
    ...state.words[word],
  }));

  allWords.forEach((item) => {
    if (item.value === word.value) {
      item.votes = [...new Set([...item.votes, uid])];
    }
  });

  return {
    ...state,
    words: {
      ...allWords,
    },
    timestamp: Date.now(),
  };
};
