import { styled } from 'styled-components';
import QRCode from 'react-qr-code';
import { useGameContext } from '../context/game_context';
import { CopyGameLink } from './buttons';
import { gameLink } from '../utils/utils';

const ShareGame = () => {
  const { status, roomId } = useGameContext();

  return (
    <Wrapper>
      {roomId && status !== 'playing' && (
        <>
          <div className="qr-container">
            <QRCode size={180} value={gameLink(roomId)} />
          </div>
          <CopyGameLink />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;

  .qr-container {
    margin-bottom: 20px;
  }
`;

export default ShareGame;
