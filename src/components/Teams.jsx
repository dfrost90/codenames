import { styled } from 'styled-components';
import { FaCrown } from 'react-icons/fa';
import { useGameContext } from '../context/game_context';
import { useEffect, useState } from 'react';

const Teams = () => {
  const { status, teams, currentTeam, winner, roomId } = useGameContext();
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (winner) {
      setShowOverlay(true);
    }
  }, [winner]);

  const allTeams = Object.keys(teams).map((team) => {
    return { ...teams[team], name: team };
  });

  if (!roomId) {
    return (
      <Wrapper>
        <p className="info">Please, click the button to start playing</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {allTeams.map((team, index) => {
        const { players, name } = team;

        const playersArr = Object.keys(players).map((player) => ({
          ...players[player],
        }));

        return (
          <div
            className={`team ${name} ${
              currentTeam === name && status === 'playing' ? 'active' : ''
            }`}
            key={index}
          >
            <div className="placeholder">{name}</div>
            <div className="team-players">
              {playersArr?.map((p, index) => {
                return (
                  <span
                    key={index}
                    className="player"
                    style={{ backgroundColor: p.color }}
                  >
                    {p.host && <FaCrown />}
                  </span>
                );
              })}
            </div>
            {winner === name && <div className="winner">winner!</div>}
          </div>
        );
      })}
      {winner && showOverlay && (
        <div className="winner-overlay" onClick={() => setShowOverlay(false)}>
          {winner} wins!
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-width: 1px 0 1px;
  border-style: solid;
  border-color: var(--clr-border);
  display: flex;
  gap: var(--flexGap);
  justify-content: space-between;
  margin: 20px 0;
  padding: 20px 0;
  position: relative;

  .placeholder {
    user-select: none;
    color: var(--clr-white);
    font-weight: bold;
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0.5;
    transform: translate(-50%, -50%);
    text-transform: uppercase;
  }

  .team {
    align-items: center;
    border-width: var(--borderWidth);
    border-style: solid;
    border-radius: var(--borderRadius);
    display: flex;
    flex: 1 0 100px;
    justify-content: space-between;
    min-height: 64px;
    overflow: hidden;
    position: relative;
    transition: var(--transitionAll);

    &.blue {
      background-color: var(--clr-team-1);
      color: var(--clr-team-1);
      justify-content: start;

      .winner {
        background-color: var(--clr-team-1);
        color: var(--clr-white);
      }
    }

    &.red {
      background-color: var(--clr-team-2);
      color: var(--clr-team-2);
      justify-content: end;

      .winner {
        background-color: var(--clr-team-2);
        color: var(--clr-white);
      }
    }

    &:last-child {
      text-align: right;
    }

    &.active {
      box-shadow: var(--boxShadow);
    }

    &.blue.active {
      border-color: var(--clr-card-blue-1);
    }

    &.red.active {
      border-color: var(--clr-card-red-1);
    }
  }

  .team-players {
    padding: 10px;
    position: relative;
    line-height: 1;
    z-index: 1;
  }

  .score {
    background-color: var(--bodyColor);
    padding: 10px 20px;
  }

  .winner {
    font-size: 20px;
    font-weight: bold;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    text-transform: uppercase;
    width: 100%;
    z-index: 1;

    &::after {
      content: '';
      display: inline-block;
      height: 100%;
      vertical-align: middle;
    }
  }

  .winner-overlay {
    background-color: var(--clr-overlay);
    color: var(--clr-accent-4);
    height: 100%;
    font-size: 36px;
    font-weight: bold;
    left: 0;
    position: fixed;
    text-align: center;
    text-transform: uppercase;
    top: 0;
    width: 100%;
    z-index: 1;

    &::after {
      content: '';
      display: inline-block;
      height: 100%;
      vertical-align: middle;
    }
  }

  .info {
    flex: 1;
    text-align: center;
  }
`;

export default Teams;
