import styled from 'styled-components';
import GlobalContainer from '../utils/GlobalContainer';

const CardStyled = styled(GlobalContainer)`
  div {
    height: 150px;
    background: ${props => props.theme.colorLola};
    border: 1px solid ${props => props.theme.colorLola};
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;

    .card-product_edit-icon {
      width: 15px!important;
      height: 15px!important;
      position: absolute;
      left: 88%;
      z-index: 2;
      top: 5%;
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
      margin-top: 20px;
      margin-bottom: 0;
    }

    p {
      font-size: 12px;
      line-height: 1.4;
      opacity: .7;
      margin: 0;
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

  @media screen and (min-width: 768px) and (max-width: 1062px) {
  .card-product {
    width: 41vw;
  }

    @media screen and (min-width: 1150) {
    .card-product {
      width: 100%;
    }
  }
}
`;

export default CardStyled;
