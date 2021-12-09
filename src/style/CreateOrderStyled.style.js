import styled from "styled-components";
import GlobalContainer from "../utils/GlobalContainer";

const CreateOrderStyled = styled(GlobalContainer)`
  .section {
    &__username {
      input {
        border: none;
        border-bottom: 1px solid #dee2e6;
      }
    }

    &__table--cocktails {
      table {
        tbody {
          th {
            border-bottom: 1px solid black;
            text-align: center;
          }
          td {
            a {
              color: black;
            }
            input {
              border: 1px solid black;
              width: 50px;
              text-align: center;
            }
            /* Disable arrows number on Chrome, Safari, Edge, Opera */
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            /* Disable arrows number on Firefox */
            input[type="number"] {
              -moz-appearance: textfield;
            }
          }
        }
      }
    }

    &__btn--command {
      margin-top: 50px;
      button {
        background-color: ${(props) => props.theme.colorBtn};
        border: 1px solid ${(props) => props.theme.colorBtn};
        padding: 10px;
        border-radius: 5px;
        color: ${(props) => props.theme.colorPrincipal};
      }
    }
  }
`;

export default CreateOrderStyled;
