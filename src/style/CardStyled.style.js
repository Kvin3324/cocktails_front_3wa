import styled from 'styled-components';
import GlobalContainer from '../utils/GlobalContainer';

const CardStyled = styled(GlobalContainer)`
  div {
    overflow: hidden;
    height: 150px;
    background: ${props => props.theme.colorLola};
    border: 1px solid ${props => props.theme.colorLola};
    border-radius: 10px;
    /* box-shadow: 0 0 15px rgba(0,0,0,0.2); */
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 150%;
    position: relative;

    .card-product_edit-icon {
      width: 15px!important;
      height: 15px!important;
      position: absolute;
      left: 90%;
      z-index: 2;
      top: 4%;
    }

    img {
      height: 100%;
      width: 120px;
      object-fit: cover;
    }

    h2 {
      font-size: 16px;
      font-weight: bold;
      margin: 0;
    }

    h3 {
      font-size: 10px;
      font-weight: bold;
    }

    p {
      font-size: 12px;
      line-height: 1.4;
      opacity: .7;
      margin-bottom: 0;
      margin-top: 8px;
    }

  .card-product-infos {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 18px 12px;
  }

  .close {
    position: absolute;
    left: 95%;
    z-index: 2;
    top: 0%;
  }
}

  a {
    text-decoration: none;
    color: black;
  }
`;

export default CardStyled;
