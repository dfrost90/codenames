import { styled } from 'styled-components';
import PropTypes from 'prop-types';
import { useGameContext } from '../context/game_context';
import { usePlayerContext } from '../context/player_context';

const Word = ({ word }) => {
  const { showType, type, value, votes } = word;
  const {
    teams,
    winner,
    currentTeam,
    showWordType,
    voteForWord,
    nextTeam,
    resetWordVotes,
  } = useGameContext();
  const { player } = usePlayerContext();
  const { host, team, uid } = player;

  const [{ blue }, { red }] = Object.keys(teams).map((team) => {
    const players = Object.keys(teams[team].players).map((player) => ({
      ...teams[team].players[player],
    }));

    return {
      [team]: players,
    };
  });

  const handleClick = () => {
    if (showType || team !== currentTeam || winner) {
      return;
    }

    if (host) {
      showWordType(word);

      if (word.type !== currentTeam) {
        nextTeam();
        resetWordVotes();
      }
    } else {
      voteForWord({ word, uid });
    }
  };

  return (
    <Wrapper
      className={`grid-item ${host || showType ? type : ''} ${
        showType ? 'back' : ''
      }`}
      onClick={handleClick}
    >
      {value}

      {votes?.length > 0 && <span>+{votes.length}</span>}
    </Wrapper>
  );
};

const Wrapper = styled.article`
  border: var(--borderWidth) solid var(--clr-white);
  border-radius: var(--borderRadius);
  cursor: pointer;
  min-height: 40px;
  overflow: hidden;
  padding: 10px 20px;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  user-select: none;
  scale: 1;
  transition: var(--transitionAll);

  &:hover {
    box-shadow: var(--boxShadow);
    scale: 1.05;
  }

  &.back::after {
    content: '';
    height: 100%;
    left: 0;
    opacity: 0.9;
    position: absolute;
    top: 0;
    width: 100%;
  }

  &.blue {
    background-color: var(--clr-team-1);
    border-color: var(--clr-team-1-light);

    &.back::after {
      background-color: var(--clr-team-1);
    }
  }

  &.red {
    background-color: var(--clr-team-2);
    border-color: var(--clr-team-2-light);

    &.back::after {
      background-color: var(--clr-team-2);
    }
  }

  &.neutral {
    background-color: var(--clr-card-yellow-1);
    border-color: var(--clr-card-yellow-2);

    &.back::after {
      background-color: var(--clr-card-yellow-1);
    }
  }

  &.black {
    background-color: var(--clr-card-black-1);
    border-color: var(--clr-card-black-2);

    &.back::after {
      background-color: var(--clr-card-black-1);
    }
  }

  span {
    color: var(--clr-accent-1);
    font-weight: bold;
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 4px;
  }
`;

Word.propTypes = {
  word: PropTypes.object,
};

export default Word;
