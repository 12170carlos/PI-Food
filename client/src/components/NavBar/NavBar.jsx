import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './NavBar.module.css';

const NavBar = () => {
  return(
    <div>
        <nav className={style.NavContainer}>
            <ul>
                <NavLink to="/recipe" className={style.link} activeclassname={style.active}>
                    {" "}
                    <li>Home</li>
                </NavLink>
                <NavLink to="/myOwnRecipes" className={style.Link} activeclassname={style.active}>
                    <li>New Recipes</li>
                </NavLink>
                <NavLink to="/ownRecipes" className={style.Link} activeclassname={style.active}>
                    <li>My Own Recipes</li>
                </NavLink>

            </ul>
        </nav>
    </div>
  ) 
}

export default NavBar;
