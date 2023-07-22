import { PropTypes } from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';

const PlayerContext = createContext();

const getStoragePlayer = () => {
  let player = {};
  if (sessionStorage.getItem('player')) {
    player = JSON.parse(sessionStorage.getItem('player'));
  }
  return player;
};

export const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState(getStoragePlayer());

  useEffect(() => {
    sessionStorage.setItem('player', JSON.stringify(player));
  }, [player]);

  return (
    <PlayerContext.Provider value={{ player, setPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  return useContext(PlayerContext);
};

PlayerProvider.propTypes = {
  children: PropTypes.node,
};
