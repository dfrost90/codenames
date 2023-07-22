import { createContext, useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { onValue, ref } from 'firebase/database';
import { db } from '../firebase';
import game_reducer from '../reducers/game_reducer';
import {
  CREATE_GAME,
  END_GAME,
  EXIT_GAME,
  JOIN_GAME,
  LOAD_DATA,
  NEXT_TEAM,
  PLAY_AGAIN,
  RESET_GAME,
  RESET_WORD_VOTES,
  SET_HINT,
  SHOW_WORD_TYPE,
  START_GAME,
  VOTE_FOR_WORD,
} from './actions';
import { useGlobalContext } from './global_context';
import { checkURL } from '../utils/utils';

const initialState = {
  status: 'pending',
  teams: {
    blue: {
      players: '',
      score: 0,
    },
    red: {
      players: '',
      score: 0,
    },
  },
  currentTeam: '',
  hint: '',
  words: '',
  winner: '',
  roomId:
    checkURL('roomId') ||
    JSON.parse(sessionStorage.getItem('game'))?.roomId ||
    '',
  timestamp: '',
};

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const { uid } = useGlobalContext();
  const [state, dispatch] = useReducer(game_reducer, initialState);

  const createGame = () => dispatch({ type: CREATE_GAME, payload: uid });
  const startGame = () => dispatch({ type: START_GAME, payload: uid });
  const joinGame = (team) => dispatch({ type: JOIN_GAME, payload: team });
  const endGame = () => dispatch({ type: END_GAME });
  const resetGame = () => dispatch({ type: RESET_GAME });
  const exitGame = (data) => dispatch({ type: EXIT_GAME, payload: data });
  const nextTeam = () => dispatch({ type: NEXT_TEAM });
  const playAgain = () => dispatch({ type: PLAY_AGAIN });
  const resetWordVotes = () => dispatch({ type: RESET_WORD_VOTES });
  const loadData = (data) => dispatch({ type: LOAD_DATA, payload: data });
  const showWordType = (word) =>
    dispatch({ type: SHOW_WORD_TYPE, payload: word });
  const voteForWord = (data) =>
    dispatch({ type: VOTE_FOR_WORD, payload: data });
  const setHint = (data) => dispatch({ type: SET_HINT, payload: data });

  useEffect(() => {
    const roomId = checkURL('roomId') || state.roomId;
    if (roomId) {
      const query = ref(db, roomId);
      const unsubscribe = onValue(query, async (snapshot) => {
        const data = await snapshot.val();

        if (snapshot.exists()) {
          if (data.status === 'finished') {
            unsubscribe();
            resetGame();
          } else {
            loadData(data);
          }
        }
      });
    }
  }, [state.roomId]);

  useEffect(() => {
    sessionStorage.setItem('game', JSON.stringify(state));
  }, [state]);

  return (
    <GameContext.Provider
      value={{
        ...state,
        createGame,
        startGame,
        joinGame,
        endGame,
        exitGame,
        nextTeam,
        playAgain,
        resetWordVotes,
        showWordType,
        voteForWord,
        setHint,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(GameContext);
};

GameProvider.propTypes = {
  children: PropTypes.node,
};
