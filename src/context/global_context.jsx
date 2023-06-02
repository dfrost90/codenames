import { PropTypes } from 'prop-types';
import { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/reducer';
import { uid } from '../utils/utils';
import { RESET_UID } from './actions';

const GlobalContext = createContext();

const initialState = {
  uid: uid(),
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const resetUid = () => dispatch({ type: RESET_UID });

  useEffect(() => {
    sessionStorage.setItem('uid', state.uid);
  }, [state.uid]);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        resetUid,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

GlobalProvider.propTypes = {
  children: PropTypes.node,
};
