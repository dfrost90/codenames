import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'normalize.css';
import './index.css';
import { GlobalProvider } from './context/global_context.jsx';
import { GameProvider } from './context/game_context.jsx';
import { PlayerProvider } from './context/player_context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider>
      <GameProvider>
        <PlayerProvider>
          <App />
        </PlayerProvider>
      </GameProvider>
    </GlobalProvider>
  </React.StrictMode>
);
