import styled from 'styled-components';
import GlobalContainer from '../utils/GlobalContainer';

const AboutCardStyled = styled(GlobalContainer)`
  .card {
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    font-family: ${props => props.theme.fontFamilyText};
    position: relative;

    h3, h5 {
      font-weight: bold;
    }

    img {
      height: 100%;
      width: inherit;
      object-fit: cover;
    }
  }

  @media screen and (min-width: 1150px) {
    .card {
      img {
        width: 50%;
      }
    }
  }
`;

export default AboutCardStyled;
