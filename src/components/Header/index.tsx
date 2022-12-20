import * as S from './styles'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

import logo from '../../assets/logo.svg'

export function Header() {
  return (
    <S.HeaderContainer>
      <img src={logo} />
      
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        
        <NavLink to="/history" title="History">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </S.HeaderContainer>
  )
}