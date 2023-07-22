import { useState } from 'react';
import { styled } from 'styled-components';
import { useGlobalContext } from '../context/global_context';

const WordsQty = () => {
  const { game, uid, setWordsQty } = useGlobalContext();
  const { currentTeam, wordsQty } = game;
  const isHost = game.teams[currentTeam].players.find(
    (player) => player.uid === uid
  )?.host;

  const [localVotes, setLocalVotes] = useState(1);

  if (isHost && wordsQty !== 0) {
    return (
      <Wrapper>
        <span>{localVotes}</span>
        <input
          type="range"
          min="0"
          max="9"
          value={localVotes}
          onChange={(e) => setLocalVotes(e.target.value)}
        />
        <button
          type="button"
          className="btn"
          onClick={() => {
            setWordsQty(localVotes);
          }}
        >
          ok
        </button>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <span>left:</span>
      <span>{wordsQty}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--flexGap);

  span {
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
  }
`;
export default WordsQty;
