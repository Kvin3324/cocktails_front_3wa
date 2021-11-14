import styled from "styled-components";

const ModalCocktailStyled = styled.div`
  #myModal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal-content {
    background-color: #fefefe;
    margin: 0 auto;
    margin-top: 5%;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;;

    &__title {
      display: flex;
      justify-content: space-between;
    }

    &__ingredients {
      margin: 15px 0;
      h4 {
        font-size: 1.1em;
        font-family: ${props => props.theme.fontFamilyText};
        font-weight: bold;
      }
      ul {
        button {
          background-color: ${props => props.theme.colorBtn};
          color: ${props => props.theme.colorPrincipal};
          border: 1px solid ${props => props.theme.colorBtn};
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 10px;
        }
        li {
          list-style-type: none;

          input {
            width: 25%;
          }
        }
      }
    }

    &__recipe {
      h4 {
        font-size: 1.1em;
        font-family: ${props => props.theme.fontFamilyText};
        font-weight: bold;
      }
    }

    input {
      border: none;
      border-bottom: 1px solid ${props => props.theme.colorLola};
      width: 35%;
      margin: 10px 0;
    }

    textarea {
      border: 1px solid ${props => props.theme.colorLola};
      width: 50%;
      height: 15vh;
    }
  }

  .modal-footer {
    justify-content: space-around;
    button {
      font-size: 1.2em;
      width: 30%;
    }
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

export default ModalCocktailStyled;
