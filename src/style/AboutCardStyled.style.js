import styled from 'styled-components';
import GlobalContainer from '../utils/GlobalContainer';

const AboutCardStyled = styled(GlobalContainer)`
  .card {
    overflow: hidden;
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
      width: 50%;
      object-fit: cover;
    }
  }
`;

export default AboutCardStyled;
