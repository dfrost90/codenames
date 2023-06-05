import { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { styled } from 'styled-components';
import { useGameContext } from '../../context/game_context';
import { usePlayerContext } from '../../context/player_context';

const HintControls = () => {
  const { hint, setHint } = useGameContext();
  const { player } = usePlayerContext();
  const [showHint, setShowHint] = useState(false);
  const [hintValue, setHintValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setHint(hintValue);
    setShowHint(false);
  };

  if (!player.host && hint) {
    return (
      <Wrapper>
        <span>{hint}</span>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {!player.host && !hint && 'waiting for hint...'}

      {player.host && (
        <>
          {!hint ? (
            <>
              <button
                type="button"
                className="btn"
                onClick={() => setShowHint(true)}
              >
                set hint
              </button>

              {showHint && (
                <div className="hint-container">
                  <button type="button" onClick={() => setShowHint(false)}>
                    <BiArrowBack />
                  </button>
                  <form className="form">
                    <div className="form-row">
                      <input
                        type="text"
                        className="form-input"
                        placeholder="set hint"
                        value={hintValue}
                        onChange={(e) => setHintValue(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="btn"
                        onClick={handleSubmit}
                      >
                        ok
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </>
          ) : (
            <span>{hint}</span>
          )}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-left: 20px;

  .hint-container {
    background-color: var(--clr-body);
    display: flex;
    justify-content: space-between;
    height: 100%;
    left: 0;
    padding: 20px;
    position: absolute;
    top: 0;
    width: 100%;

    @media (min-width: 800px) {
      justify-content: center;
      padding: 0;
    }
  }

  .form {
    margin-left: 10px;
  }

  .form-row {
    white-space: nowrap;
  }

  .form-input {
    display: inline-block;
    margin-right: 10px;
    max-width: 160px;

    @media (min-width: 800px) {
      max-width: 80%;
    }
  }

  span {
    display: inline-block;
    line-height: 40px;
  }
`;

export default HintControls;
