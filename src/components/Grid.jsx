import { styled } from 'styled-components';
import PropTypes from 'prop-types';

import { GiSpy } from 'react-icons/gi';
import Word from './Word';
import { useGameContext } from '../context/game_context';
import { usePlayerContext } from '../context/player_context';

const Grid = () => {
  const { words, status } = useGameContext();
  const { player } = usePlayerContext();

  const allWords = Object.keys(words).map((word) => ({
    ...words[word],
  }));

  if (status !== 'playing' || !player.team) {
    return (
      <EmptyGrid>
        <GiSpy /> codenames
      </EmptyGrid>
    );
  }

  return (
    <Wrapper className="grid">
      {allWords.map((word, index) => (
        <Word key={index} word={word} />
      ))}
      <article className="last">
        <GiSpy /> codenames
      </article>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  justify-content: center;
  display: grid;
  gap: var(--flexGap);
  grid-template-columns: 1fr 1fr;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (min-width: 992px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`;

const EmptyGrid = styled.section`
  padding: 20px;
  text-align: center;
`;

Grid.propTypes = {
  words: PropTypes.array,
};

export default Grid;
