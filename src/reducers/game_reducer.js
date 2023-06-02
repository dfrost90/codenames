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
} from '../context/actions';
import { setUpGame } from '../utils/utils';
// import data from '../data.json';
import randomWords from 'random-words';
import { updateDB } from '../firebase';
import {
  joinGameFunc,
  exitGameFunc,
  endGameFunc,
  showTypeFunc,
  voteWordFunc,
} from './game_functions';
import emptyGame from '../utils/emptyGame';

const game_reducer = (state, action) => {
  const uid = sessionStorage.getItem('uid');

  switch (action.type) {
    case CREATE_GAME: {
      const stateUpdate = {
        ...state,
        roomId: uid,
        timestamp: Date.now(),
      };

      updateDB(uid, { ...stateUpdate });

      return {
        ...stateUpdate,
      };
    }

    case LOAD_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case START_GAME: {
      const stateUpdate = {
        ...state,
        ...setUpGame(randomWords({ exactly: 25, minLength: 3, maxLength: 8 })),
        status: 'playing',
        timestamp: Date.now(),
      };
      updateDB(state.roomId, { ...stateUpdate });

      return {
        ...stateUpdate,
      };
    }

    case JOIN_GAME: {
      const stateUpdate = joinGameFunc(state, action.payload, uid);

      updateDB(state.roomId, { ...stateUpdate });

      return {
        ...stateUpdate,
      };
    }

    case END_GAME: {
      const stateUpdate = endGameFunc(state);

      updateDB(state.roomId, { ...stateUpdate });

      return {
        ...emptyGame,
      };
    }

    case EXIT_GAME: {
      const stateUpdate = exitGameFunc(state, action.payload);

      updateDB(state.roomId, { ...stateUpdate });

      window.history.replaceState({}, document.title, '/');

      return {
        ...emptyGame,
      };
    }

    case RESET_WORD_VOTES: {
      state.words.map((word) => {
        word.votes = '';
        return { ...word };
      });

      const stateUpdate = {
        ...state,
      };

      updateDB(state.roomId, { ...stateUpdate });

      return {
        ...stateUpdate,
        timestamp: Date.now(),
      };
    }

    case NEXT_TEAM: {
      const stateUpdate = {
        ...state,
        hint: '',
        currentTeam: state.currentTeam === 'red' ? 'blue' : 'red',
        timestamp: Date.now(),
      };

      updateDB(state.roomId, { ...stateUpdate });

      return {
        ...stateUpdate,
      };
    }

    case PLAY_AGAIN: {
      const stateUpdate = {
        ...state,
        ...setUpGame(data),
        winner: '',
        timestamp: Date.now(),
      };

      updateDB(state.roomId, { ...stateUpdate });

      return {
        ...stateUpdate,
      };
    }

    case SHOW_WORD_TYPE: {
      const stateUpdate = showTypeFunc(state, action.payload);

      updateDB(state.roomId, { ...stateUpdate });

      return {
        ...stateUpdate,
      };
    }

    case VOTE_FOR_WORD: {
      const stateUpdate = voteWordFunc(state, action.payload);

      updateDB(state.roomId, { ...stateUpdate });

      return {
        ...stateUpdate,
      };
    }

    case SET_HINT: {
      const stateUpdate = {
        ...state,
        hint: action.payload,
      };

      updateDB(state.roomId, { ...stateUpdate });

      return {
        ...stateUpdate,
      };
    }

    case RESET_GAME: {
      sessionStorage.removeItem('game');
      sessionStorage.removeItem('player');

      window.history.replaceState({}, document.title, '/');

      return {
        ...emptyGame,
      };
    }

    default:
      break;
  }

  throw new Error(`No matching "${action.type}" = action type`);
};

export default game_reducer;
