import styled from 'styled-components';

const HeaderStyled = styled.header`
  width: 100%;
  height: 10vh;
  background-color: ${props => props.theme.colorLola};
  margin-bottom: 12%;

.header__items {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: inherit;
  margin-right: 4%;

  button {
    background-color: ${props => props.theme.colorBtn};
    border: 1px solid ${props => props.theme.colorBtn};
    padding: 10px;
    border-radius: 5px;
  }
}

@media screen and (min-width: 1100px) {
  margin-bottom: 4%;
}
`;

export default HeaderStyled;