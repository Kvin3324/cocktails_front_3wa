import styled from 'styled-components';
import GlobalContainer from '../utils/GlobalContainer';

const CocktailsStyled = styled(GlobalContainer)`
.section__title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10%;

  &--btn {
    background-color: ${props => props.theme.colorBtn};
    color: ${props => props.theme.colorPrincipal};
    border: 1px solid ${props => props.theme.colorBtn};
    padding: 10px;
    border-radius: 5px;
  }
}

@media screen and (max-width: 766px) {
  .section__title {
    flex-direction: column;
    &--btn {
      width: 50%;
    }
  }
}
`;

export default CocktailsStyled