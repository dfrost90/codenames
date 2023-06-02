import { styled } from 'styled-components';
import { useGameContext } from '../../context/game_context';
import { JoinGame } from '../buttons';
import { FaCrown } from 'react-icons/fa';
const JoinControls = () => {
  const { teams } = useGameContext();
  return (
    <Wrapper>
      {Object.keys(teams).map((team) => {
        let host = false;
        if (teams[team].players.length) {
          host = teams[team].players?.find((player) => player.host);
        }
        return (
          <div key={team} className={`join-team ${team}`}>
            <JoinGame team={team} host={false} />
            {!host ? (
              <JoinGame team={team} host={true} />
            ) : (
              <h3>
                <span
                  className="player host"
                  style={{ backgroundColor: host?.color }}
                >
                  <FaCrown />
                </span>
              </h3>
            )}
          </div>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;

  .join-team {
    display: flex;
    flex: 1 1 auto;
    justify-content: space-evenly;
    align-items: center;

    &.blue {
      color: var(--clr-team-1);
    }

    &.red {
      color: var(--clr-team-2);
    }
  }

  .btn-join {
    border: 2px solid var(--clr-white);
    color: var(--clr-white);
    font-weight: bold;
    text-transform: uppercase;

    &.blue {
      background-color: #06a6b7;

      &:hover {
        background-color: #0d626c;
      }
    }
    &.red {
      background-color: #b51e1e;

      &:hover {
        background-color: #7f1111;
      }
    }
  }

  .btn-host {
    border-color: #d0ff00;

    &.blue {
      background-color: #06a6b7;

      &:hover {
        background-color: #0d626c;
      }
    }
    &.red {
      background-color: #b51e1e;

      &:hover {
        background-color: #7f1111;
      }
    }
  }
`;

export default JoinControls;
