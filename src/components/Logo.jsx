import { styled } from 'styled-components';
import logo from '../assets/logo.jpg';

const Logo = ({ title }) => {
  return (
    <Wrapper>
      <img className="logo" src={logo} alt="codenames" />
      <span>{title}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  line-height: 1;
  text-align: center;

  img {
    border-radius: var(--borderRadius);
    border: 2px solid var(--clr-white);
    display: inline-block;
    max-width: 200px;
    vertical-align: middle;
  }

  span {
    display: none;
    font-weight: bold;
    letter-spacing: 2px;
    margin-left: 10px;

    @media (min-width: 800px) {
      display: inline;
    }
  }
`;
export default Logo;
