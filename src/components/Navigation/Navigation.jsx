import { NavLink } from "react-router-dom";
import clsx from 'clsx';
import css from './Navigation.module.css';

const getLinkStyle = ({isActive}) => {
  return clsx(css.link, isActive && css.active)
}

export default function Header() {
  return (
    <header className={css.header}>
        <nav className={css.nav}>
          <ul className={css.list}>
            <li>
              <NavLink to='/' className={getLinkStyle}>Home</NavLink>
            </li>
            <li>
              <NavLink to='/movies' className={getLinkStyle}>Movies</NavLink>
            </li>
          </ul>
        </nav>
    </header>
  )
}
