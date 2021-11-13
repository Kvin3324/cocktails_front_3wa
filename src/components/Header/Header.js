import React from 'react'
import HeaderStyled from '../../style/HeaderStyled.style';

function Header(props) {
  return (
    <React.Fragment>
      <HeaderStyled as='header'>
        <div className='header__items'>
          <button type='button' className='btn-primary' onClick={() => props.logout()}>Déconnexion</button>
        </div>
      </HeaderStyled>
    </React.Fragment>
  )
}

export default Header;