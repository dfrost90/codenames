import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Controls, Grid, Teams, ShareGame } from './components';
import { styled } from 'styled-components';

function App() {
  return (
    <>
      <Wrapper>
        <Controls />
        <Teams />
        <ShareGame />
        <Grid />
      </Wrapper>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        pauseOnFocusLoss={false}
        transition={Flip}
      />
    </>
  );
}

const Wrapper = styled.main`
  padding-bottom: 100px;

  @media (min-width: 800px) {
    padding-bottom: 0;
  }

  .player {
    border: var(--borderWidth) solid;
    border-radius: var(--borderRadius);
    display: inline-block;
    font-size: 20px;
    margin-right: 5px;
    height: 40px;
    width: 40px;
    text-align: center;
    vertical-align: middle;
    padding: 0 4px;

    &::before {
      content: '';
      height: 100%;
      display: inline-block;
      vertical-align: middle;
    }

    svg {
      background-color: var(--clr-white);
      border-radius: var(--borderRadius);
      display: inline-block;
      padding: 2px;
      vertical-align: middle;
    }
  }
`;

export default App;
